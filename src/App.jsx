import React, { useState, useCallback, useRef, useEffect } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  MarkerType,
  BackgroundVariant,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

import { TEMPLATES, TEMPLATE_LIST } from './templates.js'
import { TriggerNode, ProcessNode, AiNode, OutputNode } from './nodes/CustomNodes.jsx'
import TopBar from './components/TopBar.jsx'
import NodePalette from './components/NodePalette.jsx'
import ExecutionLog from './components/ExecutionLog.jsx'

const NODE_TYPES = {
  triggerNode: TriggerNode,
  processNode: ProcessNode,
  aiNode: AiNode,
  outputNode: OutputNode,
}

const DEFAULT_EDGE_OPTIONS = {
  markerEnd: { type: MarkerType.ArrowClosed, color: '#C4B9AE', width: 16, height: 16 },
  style: { stroke: '#C4B9AE', strokeWidth: 2 },
  labelStyle: { fontSize: 10, fill: '#9B938D', fontFamily: "'DM Sans', sans-serif" },
  labelBgStyle: { fill: '#F7F3EE', fillOpacity: 0.9 },
  labelBgPadding: [4, 3],
  labelBgBorderRadius: 4,
}

function buildNodes(template) {
  return template.nodes.map((n) => ({
    ...n,
    data: { ...n.data, status: 'idle' },
  }))
}

function buildEdges(template) {
  return template.edges.map((e) => ({
    ...e,
    ...DEFAULT_EDGE_OPTIONS,
    ...(e.style ? { style: { ...DEFAULT_EDGE_OPTIONS.style, ...e.style } } : {}),
    ...(e.animated ? { animated: true } : {}),
  }))
}

function nowTs() {
  return new Date().toLocaleTimeString('en-AU', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
}

let nodeCounter = 100

export default function App() {
  const [activeTemplateId, setActiveTemplateId] = useState('leadEnrichment')
  const [nodes, setNodes, onNodesChange] = useNodesState(() => buildNodes(TEMPLATES['leadEnrichment']))
  const [edges, setEdges, onEdgesChange] = useEdgesState(() => buildEdges(TEMPLATES['leadEnrichment']))
  const [isRunning, setIsRunning] = useState(false)
  const [runComplete, setRunComplete] = useState(false)
  const [logEntries, setLogEntries] = useState([])
  const [logOpen, setLogOpen] = useState(true)
  const reactFlowWrapper = useRef(null)
  const [reactFlowInstance, setReactFlowInstance] = useState(null)
  const runAbortRef = useRef(false)

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge({ ...params, ...DEFAULT_EDGE_OPTIONS }, eds)
      ),
    [setEdges]
  )

  const handleTemplateChange = useCallback(
    (templateId) => {
      if (isRunning) return
      runAbortRef.current = true
      const template = TEMPLATES[templateId]
      if (!template) return
      setActiveTemplateId(templateId)
      setNodes(buildNodes(template))
      setEdges(buildEdges(template))
      setRunComplete(false)
      setLogEntries([])
    },
    [isRunning, setNodes, setEdges]
  )

  const addLog = useCallback((message, status = 'info') => {
    setLogEntries((prev) => [...prev, { ts: nowTs(), message, status }])
  }, [])

  const setNodeStatus = useCallback(
    (nodeId, status) => {
      setNodes((nds) =>
        nds.map((n) =>
          n.id === nodeId ? { ...n, data: { ...n.data, status } } : n
        )
      )
    },
    [setNodes]
  )

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  const handleRun = useCallback(async () => {
    if (isRunning) return
    const template = TEMPLATES[activeTemplateId]
    if (!template) return

    // Reset all nodes to idle first
    setNodes((nds) => nds.map((n) => ({ ...n, data: { ...n.data, status: 'idle' } })))
    setLogEntries([])
    setRunComplete(false)
    setIsRunning(true)
    runAbortRef.current = false
    setLogOpen(true)

    await sleep(200)

    addLog(`Pipeline started: ${template.name}`, 'start')

    const executionOrder = template.executionOrder
    const nodeMap = {}
    // Build a label lookup by node id
    setNodes((nds) => {
      nds.forEach((n) => { nodeMap[n.id] = n.data.label })
      return nds
    })

    // We need node labels — grab from template directly
    const labelMap = {}
    template.nodes.forEach((n) => { labelMap[n.id] = n.data.label })

    for (let stepIdx = 0; stepIdx < executionOrder.length; stepIdx++) {
      if (runAbortRef.current) break

      const stepNodes = executionOrder[stepIdx]

      // Mark all in this step as running
      stepNodes.forEach((id) => {
        setNodeStatus(id, 'running')
        addLog(`Running: ${labelMap[id]}`, 'running')
      })

      // Wait for the step duration (parallel nodes share the wait)
      const duration = 700 + Math.random() * 400
      await sleep(duration)

      if (runAbortRef.current) break

      // Mark all complete
      stepNodes.forEach((id) => {
        setNodeStatus(id, 'complete')
        addLog(`Complete: ${labelMap[id]}`, 'complete')
      })

      // Small gap between steps
      if (stepIdx < executionOrder.length - 1) {
        await sleep(200)
      }
    }

    if (!runAbortRef.current) {
      addLog(`Pipeline finished successfully`, 'complete')
      setRunComplete(true)
    }

    setIsRunning(false)
  }, [isRunning, activeTemplateId, setNodes, setNodeStatus, addLog])

  // Drag-from-palette onto canvas
  const onDragOver = useCallback((event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    (event) => {
      event.preventDefault()
      const type = event.dataTransfer.getData('application/reactflow')
      if (!type || !reactFlowInstance) return

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      })

      const typeLabels = {
        triggerNode: { label: 'New Trigger', sublabel: 'Trigger', icon: '🔔' },
        processNode: { label: 'New Process', sublabel: 'Process', icon: '⚙️' },
        aiNode: { label: 'AI Step', sublabel: 'AI Step', icon: '🤖' },
        outputNode: { label: 'New Output', sublabel: 'Output', icon: '📤' },
      }

      nodeCounter++
      const newNode = {
        id: `custom-${nodeCounter}`,
        type,
        position,
        data: {
          ...(typeLabels[type] || { label: 'New Node', sublabel: type, icon: '🔷' }),
          status: 'idle',
          description: 'Click to configure',
        },
      }
      setNodes((nds) => nds.concat(newNode))
    },
    [reactFlowInstance, setNodes]
  )

  const onDragStart = useCallback((event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        background: '#F7F3EE',
      }}
    >
      <TopBar
        activeTemplate={activeTemplateId}
        onTemplateChange={handleTemplateChange}
        onRun={handleRun}
        isRunning={isRunning}
        runComplete={runComplete}
      />

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <NodePalette onDragStart={onDragStart} />

        <div
          ref={reactFlowWrapper}
          style={{ flex: 1, position: 'relative' }}
          onDragOver={onDragOver}
          onDrop={onDrop}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            nodeTypes={NODE_TYPES}
            defaultEdgeOptions={DEFAULT_EDGE_OPTIONS}
            fitView
            fitViewOptions={{ padding: 0.2 }}
            deleteKeyCode="Delete"
            proOptions={{ hideAttribution: false }}
            style={{ background: '#F7F3EE' }}
          >
            <Background
              variant={BackgroundVariant.Dots}
              gap={20}
              size={1}
              color="#DDD5CC"
            />
            <Controls
              style={{ bottom: 20, right: 20, left: 'auto' }}
              showInteractive={true}
            />
            <MiniMap
              style={{ bottom: 20, right: 100 }}
              nodeColor={(n) => {
                const colorMap = {
                  triggerNode: '#22C55E',
                  processNode: '#F59E0B',
                  aiNode: '#A855F7',
                  outputNode: '#3B82F6',
                }
                return colorMap[n.type] || '#C4B9AE'
              }}
              maskColor="rgba(247,243,238,0.7)"
            />
          </ReactFlow>

          {/* Template info badge */}
          <div
            style={{
              position: 'absolute',
              top: 16,
              left: 16,
              background: 'rgba(255,255,255,0.92)',
              border: '1px solid #E5DDD4',
              borderRadius: 8,
              padding: '8px 12px',
              backdropFilter: 'blur(8px)',
              pointerEvents: 'none',
              zIndex: 5,
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: '#0C0A08',
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {TEMPLATES[activeTemplateId]?.name}
            </div>
            <div
              style={{
                fontSize: 10,
                color: '#9B938D',
                fontFamily: "'DM Sans', sans-serif",
                marginTop: 2,
              }}
            >
              {TEMPLATES[activeTemplateId]?.description}
            </div>
          </div>
        </div>
      </div>

      <ExecutionLog
        entries={logEntries}
        isOpen={logOpen}
        onToggle={() => setLogOpen((v) => !v)}
      />
    </div>
  )
}

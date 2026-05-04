import React, { memo } from 'react'
import { Handle, Position } from '@xyflow/react'

const STATUS_COLORS = {
  idle: '#C4B9AE',
  running: '#D4956A',
  complete: '#22C55E',
  failed: '#EF4444',
}

const STATUS_LABELS = {
  idle: 'Pending',
  running: 'Running',
  complete: 'Complete',
  failed: 'Failed',
}

function StatusDot({ status }) {
  const color = STATUS_COLORS[status] || STATUS_COLORS.idle
  const isRunning = status === 'running'
  return (
    <span
      style={{
        display: 'inline-block',
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: color,
        flexShrink: 0,
        animation: isRunning ? 'pulse-ring 1.2s ease-out infinite' : 'none',
        boxShadow: isRunning ? `0 0 0 0 ${color}80` : 'none',
      }}
    />
  )
}

function BaseNode({ data, borderColor, labelBg, isRounded, selected }) {
  const { icon, label, sublabel, status = 'idle', description } = data
  const statusColor = STATUS_COLORS[status]

  return (
    <div
      style={{
        background: '#FFFFFF',
        border: `2px solid ${selected ? '#D4956A' : borderColor}`,
        borderRadius: isRounded ? 16 : 8,
        padding: '12px 16px',
        minWidth: 160,
        maxWidth: 190,
        fontFamily: "'DM Sans', sans-serif",
        boxShadow: selected
          ? '0 0 0 3px rgba(212,149,106,0.25), 0 4px 16px rgba(0,0,0,0.1)'
          : status === 'running'
          ? `0 0 0 3px ${borderColor}40, 0 4px 16px rgba(0,0,0,0.08)`
          : '0 2px 8px rgba(0,0,0,0.06)',
        transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
        cursor: 'grab',
        userSelect: 'none',
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        style={{ left: -6 }}
      />

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            background: `${borderColor}18`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 18,
            flexShrink: 0,
          }}
        >
          {icon}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: '#0C0A08',
              lineHeight: 1.3,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {label}
          </div>
          {description && (
            <div
              style={{
                fontSize: 10,
                color: '#9B938D',
                lineHeight: 1.4,
                marginTop: 2,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {description}
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          marginTop: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span
          style={{
            fontSize: 9,
            fontWeight: 600,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            color: borderColor,
            background: `${borderColor}14`,
            padding: '2px 6px',
            borderRadius: 4,
          }}
        >
          {sublabel}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <StatusDot status={status} />
          <span style={{ fontSize: 9, color: statusColor, fontWeight: 500 }}>
            {STATUS_LABELS[status]}
          </span>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        style={{ right: -6 }}
      />
    </div>
  )
}

export const TriggerNode = memo(({ data, selected }) => (
  <BaseNode
    data={data}
    borderColor="#22C55E"
    labelBg="#DCFCE7"
    isRounded={true}
    selected={selected}
  />
))

export const ProcessNode = memo(({ data, selected }) => (
  <BaseNode
    data={data}
    borderColor="#F59E0B"
    labelBg="#FEF3C7"
    isRounded={false}
    selected={selected}
  />
))

export const AiNode = memo(({ data, selected }) => (
  <BaseNode
    data={data}
    borderColor="#A855F7"
    labelBg="#F3E8FF"
    isRounded={true}
    selected={selected}
  />
))

export const OutputNode = memo(({ data, selected }) => (
  <BaseNode
    data={data}
    borderColor="#3B82F6"
    labelBg="#DBEAFE"
    isRounded={false}
    selected={selected}
  />
))

TriggerNode.displayName = 'TriggerNode'
ProcessNode.displayName = 'ProcessNode'
AiNode.displayName = 'AiNode'
OutputNode.displayName = 'OutputNode'

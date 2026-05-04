import React from 'react'

const NODE_TYPES = [
  {
    type: 'triggerNode',
    label: 'Trigger',
    icon: '🔔',
    borderColor: '#22C55E',
    description: 'Webhooks, schedules, monitors',
    isRounded: true,
  },
  {
    type: 'processNode',
    label: 'Process',
    icon: '⚙️',
    borderColor: '#F59E0B',
    description: 'Transform, enrich, score',
    isRounded: false,
  },
  {
    type: 'aiNode',
    label: 'AI Step',
    icon: '🤖',
    borderColor: '#A855F7',
    description: 'LLM calls, classification',
    isRounded: true,
  },
  {
    type: 'outputNode',
    label: 'Output',
    icon: '📤',
    borderColor: '#3B82F6',
    description: 'Send, store, distribute',
    isRounded: false,
  },
]

function PaletteItem({ nodeType, onDragStart }) {
  const { label, icon, borderColor, description, isRounded } = nodeType
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, nodeType.type)}
      style={{
        background: '#FFFFFF',
        border: `2px solid ${borderColor}`,
        borderRadius: isRounded ? 10 : 6,
        padding: '10px 12px',
        cursor: 'grab',
        transition: 'box-shadow 0.15s ease, transform 0.1s ease',
        userSelect: 'none',
        marginBottom: 8,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 4px 12px ${borderColor}30`
        e.currentTarget.style.transform = 'translateY(-1px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: 6,
            background: `${borderColor}18`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        <div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: '#0C0A08',
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {label}
          </div>
          <div
            style={{
              fontSize: 10,
              color: '#9B938D',
              fontFamily: "'DM Sans', sans-serif",
              lineHeight: 1.4,
            }}
          >
            {description}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function NodePalette({ onDragStart }) {
  return (
    <div
      style={{
        width: 200,
        background: '#FDFAF7',
        borderRight: '1px solid #E5DDD4',
        padding: '16px 12px',
        flexShrink: 0,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          fontSize: 10,
          fontWeight: 700,
          color: '#9B938D',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: 12,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        Node Types
      </div>
      <div
        style={{
          fontSize: 10,
          color: '#C4B9AE',
          marginBottom: 12,
          fontFamily: "'DM Sans', sans-serif",
          lineHeight: 1.5,
        }}
      >
        Drag nodes onto the canvas to build your workflow
      </div>
      {NODE_TYPES.map((nt) => (
        <PaletteItem key={nt.type} nodeType={nt} onDragStart={onDragStart} />
      ))}

      <div
        style={{
          marginTop: 'auto',
          paddingTop: 16,
          borderTop: '1px solid #E5DDD4',
        }}
      >
        <div
          style={{
            fontSize: 10,
            color: '#C4B9AE',
            fontFamily: "'DM Sans', sans-serif",
            lineHeight: 1.6,
          }}
        >
          <strong style={{ color: '#9B938D' }}>Tips</strong>
          <br />
          • Drag nodes to reposition
          <br />
          • Connect handles to wire
          <br />
          • Select + Delete to remove
        </div>
      </div>
    </div>
  )
}

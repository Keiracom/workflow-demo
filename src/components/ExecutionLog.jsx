import React, { useRef, useEffect, useState } from 'react'

const STATUS_ICONS = {
  start: '▶',
  running: '⏳',
  complete: '✅',
  failed: '❌',
  info: 'ℹ️',
}

const STATUS_COLORS = {
  start: '#D4956A',
  running: '#F59E0B',
  complete: '#22C55E',
  failed: '#EF4444',
  info: '#9B938D',
}

export default function ExecutionLog({ entries, isOpen, onToggle }) {
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [entries])

  return (
    <div
      style={{
        background: '#FDFAF7',
        borderTop: '1px solid #E5DDD4',
        flexShrink: 0,
        transition: 'height 0.25s ease',
        height: isOpen ? 180 : 36,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div
        onClick={onToggle}
        style={{
          height: 36,
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          cursor: 'pointer',
          gap: 8,
          flexShrink: 0,
          borderBottom: isOpen ? '1px solid #E5DDD4' : 'none',
          userSelect: 'none',
        }}
      >
        <span style={{ fontSize: 10, color: '#9B938D', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: "'DM Sans', sans-serif" }}>
          Execution Log
        </span>
        {entries.length > 0 && (
          <span
            style={{
              fontSize: 9,
              background: '#D4956A',
              color: '#0C0A08',
              borderRadius: 4,
              padding: '1px 5px',
              fontWeight: 700,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {entries.length}
          </span>
        )}
        <span
          style={{
            marginLeft: 'auto',
            fontSize: 10,
            color: '#C4B9AE',
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {isOpen ? '▾ Collapse' : '▸ Expand'}
        </span>
      </div>

      {/* Log entries */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '8px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        {entries.length === 0 ? (
          <div
            style={{
              fontSize: 11,
              color: '#C4B9AE',
              fontFamily: "'DM Sans', sans-serif",
              padding: '4px 0',
            }}
          >
            No executions yet. Click "Run Pipeline" to simulate.
          </div>
        ) : (
          entries.map((entry, idx) => (
            <div
              key={idx}
              className="log-entry"
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 8,
                fontSize: 11,
                fontFamily: "'DM Sans', sans-serif",
                lineHeight: 1.5,
              }}
            >
              <span style={{ color: '#C4B9AE', flexShrink: 0, fontSize: 10 }}>
                {entry.ts}
              </span>
              <span style={{ color: STATUS_COLORS[entry.status] || '#9B938D', flexShrink: 0 }}>
                {STATUS_ICONS[entry.status] || '•'}
              </span>
              <span style={{ color: '#3D3733' }}>
                {entry.message}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

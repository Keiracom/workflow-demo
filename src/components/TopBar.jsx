import React from 'react'
import { TEMPLATE_LIST } from '../templates.js'

export default function TopBar({ activeTemplate, onTemplateChange, onRun, isRunning, runComplete }) {
  return (
    <div
      style={{
        height: 56,
        background: '#0C0A08',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        gap: 16,
        flexShrink: 0,
        borderBottom: '1px solid #1a1714',
        zIndex: 10,
      }}
    >
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginRight: 8 }}>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 6,
            background: 'linear-gradient(135deg, #D4956A 0%, #c4784d 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 14,
          }}
        >
          ⚡
        </div>
        <span
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: '#F7F3EE',
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: '-0.01em',
          }}
        >
          Keiracom
        </span>
        <span
          style={{
            fontSize: 12,
            color: '#6B6460',
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
          }}
        >
          Workflow Builder
        </span>
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Template selector */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span
          style={{
            fontSize: 12,
            color: '#9B938D',
            fontFamily: "'DM Sans', sans-serif",
            whiteSpace: 'nowrap',
          }}
        >
          Template
        </span>
        <select
          value={activeTemplate}
          onChange={(e) => onTemplateChange(e.target.value)}
          disabled={isRunning}
          style={{
            background: '#1a1714',
            color: '#F7F3EE',
            border: '1px solid #2d2925',
            borderRadius: 6,
            padding: '6px 10px',
            fontSize: 13,
            fontFamily: "'DM Sans', sans-serif",
            cursor: 'pointer',
            outline: 'none',
            minWidth: 220,
            appearance: 'none',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239B938D' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 10px center',
            paddingRight: 30,
          }}
        >
          {TEMPLATE_LIST.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </div>

      {/* Run button */}
      <button
        onClick={onRun}
        disabled={isRunning}
        style={{
          background: isRunning
            ? '#2d2925'
            : runComplete
            ? '#1a3a22'
            : 'linear-gradient(135deg, #D4956A 0%, #c4784d 100%)',
          color: isRunning ? '#6B6460' : runComplete ? '#22C55E' : '#0C0A08',
          border: 'none',
          borderRadius: 6,
          padding: '8px 18px',
          fontSize: 13,
          fontWeight: 600,
          fontFamily: "'DM Sans', sans-serif",
          cursor: isRunning ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          transition: 'all 0.2s ease',
          minWidth: 130,
          justifyContent: 'center',
          whiteSpace: 'nowrap',
        }}
      >
        {isRunning ? (
          <>
            <span style={{ fontSize: 14 }}>⏳</span>
            Running...
          </>
        ) : runComplete ? (
          <>
            <span style={{ fontSize: 14 }}>✅</span>
            Run Again
          </>
        ) : (
          <>
            <span style={{ fontSize: 14 }}>▶</span>
            Run Pipeline
          </>
        )}
      </button>
    </div>
  )
}

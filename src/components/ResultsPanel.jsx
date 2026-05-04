import React, { useState } from 'react'
import { MOCK_RESULTS } from '../data/mockResults.js'

// ── helpers ──────────────────────────────────────────────────────────────────

function cisColor(score) {
  if (score >= 80) return '#16A34A'
  if (score >= 60) return '#D97706'
  return '#9B938D'
}

const MONO = "'JetBrains Mono', 'Fira Mono', monospace"
const SANS = "'DM Sans', sans-serif"

// ── sub-renderers ─────────────────────────────────────────────────────────────

function LeadEnrichmentResults({ data }) {
  return (
    <>
      {/* Summary bar */}
      <div style={{ display: 'flex', gap: 24, marginBottom: 14, flexWrap: 'wrap' }}>
        {[
          { label: 'Discovered', value: data.summary.discovered },
          { label: 'Enriched', value: data.summary.enriched },
          { label: 'High-score (CIS ≥ 70)', value: data.summary.highScore },
        ].map(({ label, value }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
            <span style={{ fontFamily: MONO, fontSize: 18, fontWeight: 700, color: '#D4956A' }}>{value}</span>
            <span style={{ fontFamily: SANS, fontSize: 11, color: '#9B938D' }}>{label}</span>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: MONO, fontSize: 12 }}>
          <thead>
            <tr>
              {['#', 'Business', 'Suburb', 'ABN', 'Email', 'CIS'].map((h) => (
                <th
                  key={h}
                  style={{
                    background: '#FDF0E6',
                    color: '#8B5A30',
                    padding: '6px 10px',
                    textAlign: 'left',
                    fontWeight: 700,
                    fontSize: 11,
                    whiteSpace: 'nowrap',
                    borderBottom: '1px solid #E5DDD4',
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.leads.map((lead) => (
              <tr key={lead.id} style={{ borderBottom: '1px solid #F0EAE4' }}>
                <td style={{ padding: '6px 10px', color: '#C4B9AE' }}>{lead.id}</td>
                <td style={{ padding: '6px 10px', color: '#0C0A08', fontWeight: 600 }}>{lead.business}</td>
                <td style={{ padding: '6px 10px', color: '#3D3733' }}>{lead.suburb}</td>
                <td style={{ padding: '6px 10px', color: '#9B938D' }}>{lead.abn}</td>
                <td style={{ padding: '6px 10px', color: '#3D3733' }}>{lead.email}</td>
                <td style={{ padding: '6px 10px', fontWeight: 700, color: cisColor(lead.cis) }}>{lead.cis}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

function ContentPublishingResults({ data }) {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      {data.posts.map((post) => (
        <div
          key={post.platform}
          style={{
            flex: '1 1 220px',
            border: '1px solid #E5DDD4',
            borderRadius: 8,
            padding: '12px 14px',
            background: '#FDFAF7',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            <span style={{ fontSize: 16 }}>{post.icon}</span>
            <span style={{ fontFamily: SANS, fontWeight: 700, fontSize: 12, color: '#0C0A08' }}>{post.platform}</span>
          </div>
          <p style={{ fontFamily: MONO, fontSize: 11, color: '#3D3733', lineHeight: 1.55, margin: '0 0 10px 0' }}>
            {post.body}
          </p>
          <div
            style={{
              display: 'inline-block',
              background: '#FDF0E6',
              borderRadius: 4,
              padding: '2px 8px',
              fontFamily: MONO,
              fontSize: 10,
              color: '#8B5A30',
              fontWeight: 600,
            }}
          >
            Scheduled: {post.scheduled}
          </div>
        </div>
      ))}
    </div>
  )
}

function CustomerOnboardingResults({ data }) {
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
        {data.steps.map((step, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: MONO, fontSize: 12 }}>
            <span>✅</span>
            <span style={{ color: '#0C0A08' }}>{step.label}</span>
            {step.detail && (
              <span style={{ color: '#9B938D', fontSize: 11 }}>({step.detail})</span>
            )}
          </div>
        ))}
      </div>
      <div
        style={{
          background: '#F0FDF4',
          border: '1px solid #86EFAC',
          borderRadius: 6,
          padding: '8px 12px',
          fontFamily: SANS,
          fontSize: 12,
          color: '#166534',
          fontWeight: 600,
        }}
      >
        Next step: {data.nextStep}
      </div>
    </>
  )
}

function DataSyncResults({ data }) {
  const [dlqOpen, setDlqOpen] = useState(false)

  return (
    <>
      {/* Stats grid */}
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 14 }}>
        {data.stats.map(({ label, value }) => (
          <div
            key={label}
            style={{
              flex: '1 1 120px',
              background: '#FDFAF7',
              border: '1px solid #E5DDD4',
              borderRadius: 6,
              padding: '8px 12px',
            }}
          >
            <div style={{ fontFamily: MONO, fontSize: 16, fontWeight: 700, color: '#D4956A' }}>{value}</div>
            <div style={{ fontFamily: SANS, fontSize: 10, color: '#9B938D', marginTop: 2 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* DLQ expandable */}
      <div
        style={{
          border: '1px solid #FCA5A5',
          borderRadius: 6,
          overflow: 'hidden',
        }}
      >
        <button
          onClick={() => setDlqOpen((v) => !v)}
          style={{
            width: '100%',
            background: '#FEF2F2',
            border: 'none',
            padding: '7px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            cursor: 'pointer',
            fontFamily: SANS,
            fontSize: 12,
            color: '#B91C1C',
            fontWeight: 600,
            textAlign: 'left',
          }}
        >
          <span>{dlqOpen ? '▾' : '▸'}</span>
          Failed records ({data.dlq.count})
        </button>
        {dlqOpen && (
          <div
            style={{
              padding: '8px 12px',
              fontFamily: MONO,
              fontSize: 11,
              color: '#9B938D',
              background: '#FFFBFB',
            }}
          >
            {data.dlq.count} records routed to DLQ — {data.dlq.reason}
          </div>
        )}
      </div>
    </>
  )
}

// ── main panel ────────────────────────────────────────────────────────────────

export default function ResultsPanel({ templateId, visible, onClose }) {
  const data = MOCK_RESULTS[templateId]

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#FFFFFF',
        borderTop: '2px solid #D4956A',
        maxHeight: '50vh',
        overflowY: 'auto',
        zIndex: 20,
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.3s ease',
        pointerEvents: visible ? 'auto' : 'none',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '10px 16px',
          borderBottom: '1px solid #E5DDD4',
          flexShrink: 0,
          background: '#FFFFFF',
          position: 'sticky',
          top: 0,
          zIndex: 1,
        }}
      >
        <span
          style={{
            fontFamily: SANS,
            fontSize: 11,
            fontWeight: 700,
            color: '#0C0A08',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          Pipeline Results
        </span>
        <button
          onClick={onClose}
          style={{
            marginLeft: 'auto',
            background: 'none',
            border: '1px solid #E5DDD4',
            borderRadius: 4,
            padding: '2px 8px',
            cursor: 'pointer',
            fontFamily: SANS,
            fontSize: 11,
            color: '#9B938D',
          }}
        >
          ✕ Close
        </button>
      </div>

      {/* Body */}
      <div style={{ padding: '14px 16px', flex: 1 }}>
        {data && templateId === 'leadEnrichment' && <LeadEnrichmentResults data={data} />}
        {data && templateId === 'contentPublishing' && <ContentPublishingResults data={data} />}
        {data && templateId === 'customerOnboarding' && <CustomerOnboardingResults data={data} />}
        {data && templateId === 'dataSyncPipeline' && <DataSyncResults data={data} />}
        {!data && (
          <p style={{ fontFamily: SANS, fontSize: 12, color: '#9B938D' }}>No results available for this template.</p>
        )}
      </div>
    </div>
  )
}

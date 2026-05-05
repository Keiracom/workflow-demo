export const MOCK_RESULTS = {
  leadEnrichment: {
    type: 'leadEnrichment',
    summary: { discovered: 12, enriched: 8, highScore: 5 },
    leads: [
      { id: 1, business: 'Demo Dental Clinic', suburb: 'Surry Hills', abn: '11 111 111 111', email: 'reception@demo-dental.example.com.au', cis: 87 },
      { id: 2, business: 'Sample Plumbing Pty Ltd', suburb: 'Bondi', abn: '22 222 222 222', email: 'mark@sample-plumbing.example.com.au', cis: 72 },
      { id: 3, business: 'Test Electrical Co', suburb: 'Newtown', abn: '33 333 333 333', email: 'info@test-electrical.example.com.au', cis: 65 },
      { id: 4, business: 'Example Physio Centre', suburb: 'Manly', abn: '44 444 444 444', email: 'admin@example-physio.example.com.au', cis: 91 },
      { id: 5, business: 'Placeholder Accounting', suburb: 'Paddington', abn: '55 555 555 555', email: 'sarah@placeholder-accounting.example.com.au', cis: 78 },
    ],
  },

  contentPublishing: {
    type: 'contentPublishing',
    posts: [
      {
        platform: 'Twitter / X',
        icon: '🐦',
        body: '🚀 Just shipped: hybrid RAG search that actually cites its sources. Dense vector + BM25 keyword fusion = no more hallucinated answers.',
        scheduled: 'Mon 9:00 AM',
      },
      {
        platform: 'LinkedIn',
        icon: '💼',
        body: 'We built an AI copilot that writes SQL from natural language questions over financial data. Not a demo — runs in production daily.',
        scheduled: 'Mon 11:00 AM',
      },
      {
        platform: 'Email',
        icon: '📬',
        body: 'Subject: "What we shipped this week"',
        scheduled: 'Mon 2:00 PM',
      },
    ],
  },

  customerOnboarding: {
    type: 'customerOnboarding',
    steps: [
      { label: 'Signup webhook received', detail: null },
      { label: 'Email verified', detail: '2.1s' },
      { label: 'Account created', detail: 'client_id: demo_001' },
      { label: 'Welcome email sent', detail: null },
      { label: 'CSM assigned: David S.', detail: null },
      { label: 'Demo scheduled: Tue 10:00 AM AEST', detail: null },
    ],
    nextStep: 'Onboarding complete — client ready for first campaign setup',
  },

  dataSyncPipeline: {
    type: 'dataSyncPipeline',
    stats: [
      { label: 'Records polled', value: '847' },
      { label: 'Transformed', value: '847' },
      { label: 'Validated', value: '832' },
      { label: 'Loaded to DB', value: '832' },
      { label: 'Duration', value: '4.2s' },
      { label: 'Slack notification', value: 'Sent ✅' },
    ],
    dlq: { count: 15, reason: 'missing required field: abn' },
  },
}

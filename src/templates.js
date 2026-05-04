// Pre-built workflow templates

export const TEMPLATES = {
  leadEnrichment: {
    id: 'leadEnrichment',
    name: 'Lead Enrichment Pipeline',
    description: 'Discover and enrich Australian SMB leads',
    nodes: [
      {
        id: 'n1', type: 'triggerNode', position: { x: 60, y: 200 },
        data: { icon: '🗺️', label: 'GMB Discovery', sublabel: 'Trigger', status: 'idle', description: 'Google Maps Business scraper' }
      },
      {
        id: 'n2', type: 'processNode', position: { x: 280, y: 200 },
        data: { icon: '🏛️', label: 'ABN Lookup', sublabel: 'Process', status: 'idle', description: 'Australian Business Register' }
      },
      {
        id: 'n3', type: 'aiNode', position: { x: 500, y: 200 },
        data: { icon: '🔗', label: 'LinkedIn Scrape', sublabel: 'AI Step', status: 'idle', description: 'Profile enrichment & scoring' }
      },
      {
        id: 'n4', type: 'processNode', position: { x: 720, y: 200 },
        data: { icon: '📧', label: 'Email Finder', sublabel: 'Process', status: 'idle', description: 'Multi-tier waterfall lookup' }
      },
      {
        id: 'n5', type: 'outputNode', position: { x: 940, y: 200 },
        data: { icon: '🎯', label: 'Score & Route', sublabel: 'Output', status: 'idle', description: 'CIS scoring + CRM routing' }
      },
    ],
    edges: [
      { id: 'e1-2', source: 'n1', target: 'n2', label: 'domains' },
      { id: 'e2-3', source: 'n2', target: 'n3', label: 'ABNs' },
      { id: 'e3-4', source: 'n3', target: 'n4', label: 'profiles' },
      { id: 'e4-5', source: 'n4', target: 'n5', label: 'verified emails' },
    ],
    executionOrder: [['n1'], ['n2'], ['n3'], ['n4'], ['n5']],
  },

  contentPublishing: {
    id: 'contentPublishing',
    name: 'Content Publishing Workflow',
    description: 'Monitor, generate, and distribute content',
    nodes: [
      {
        id: 'n1', type: 'triggerNode', position: { x: 60, y: 230 },
        data: { icon: '📡', label: 'RSS Monitor', sublabel: 'Trigger', status: 'idle', description: 'Watches 50+ industry feeds' }
      },
      {
        id: 'n2', type: 'aiNode', position: { x: 280, y: 230 },
        data: { icon: '✍️', label: 'AI Summariser', sublabel: 'AI Step', status: 'idle', description: 'GPT-4 content synthesis' }
      },
      {
        id: 'n3', type: 'aiNode', position: { x: 500, y: 230 },
        data: { icon: '🖼️', label: 'Image Generator', sublabel: 'AI Step', status: 'idle', description: 'DALL-E 3 social assets' }
      },
      {
        id: 'n4', type: 'processNode', position: { x: 720, y: 230 },
        data: { icon: '📅', label: 'Schedule Post', sublabel: 'Process', status: 'idle', description: 'Optimal timing engine' }
      },
      {
        id: 'n5', type: 'outputNode', position: { x: 940, y: 130 },
        data: { icon: '🐦', label: 'Twitter / X', sublabel: 'Output', status: 'idle', description: 'Post to @Keiracom' }
      },
      {
        id: 'n6', type: 'outputNode', position: { x: 940, y: 230 },
        data: { icon: '💼', label: 'LinkedIn', sublabel: 'Output', status: 'idle', description: 'Company page post' }
      },
      {
        id: 'n7', type: 'outputNode', position: { x: 940, y: 330 },
        data: { icon: '📬', label: 'Email Blast', sublabel: 'Output', status: 'idle', description: 'Subscriber newsletter' }
      },
    ],
    edges: [
      { id: 'e1-2', source: 'n1', target: 'n2', label: 'articles' },
      { id: 'e2-3', source: 'n2', target: 'n3', label: 'summaries' },
      { id: 'e3-4', source: 'n3', target: 'n4', label: 'assets ready' },
      { id: 'e4-5', source: 'n4', target: 'n5', label: 'scheduled' },
      { id: 'e4-6', source: 'n4', target: 'n6', label: 'scheduled' },
      { id: 'e4-7', source: 'n4', target: 'n7', label: 'scheduled' },
    ],
    executionOrder: [['n1'], ['n2'], ['n3'], ['n4'], ['n5', 'n6', 'n7']],
  },

  customerOnboarding: {
    id: 'customerOnboarding',
    name: 'Customer Onboarding',
    description: 'Automated onboarding from signup to first call',
    nodes: [
      {
        id: 'n1', type: 'triggerNode', position: { x: 40, y: 200 },
        data: { icon: '🔔', label: 'Signup Webhook', sublabel: 'Trigger', status: 'idle', description: 'Stripe / form submission' }
      },
      {
        id: 'n2', type: 'processNode', position: { x: 230, y: 200 },
        data: { icon: '✅', label: 'Verify Email', sublabel: 'Process', status: 'idle', description: 'Magic link + domain check' }
      },
      {
        id: 'n3', type: 'processNode', position: { x: 420, y: 200 },
        data: { icon: '⚙️', label: 'Create Account', sublabel: 'Process', status: 'idle', description: 'Provision workspace + roles' }
      },
      {
        id: 'n4', type: 'outputNode', position: { x: 610, y: 200 },
        data: { icon: '👋', label: 'Send Welcome', sublabel: 'Output', status: 'idle', description: 'Personalised onboarding email' }
      },
      {
        id: 'n5', type: 'processNode', position: { x: 800, y: 200 },
        data: { icon: '👤', label: 'Assign CSM', sublabel: 'Process', status: 'idle', description: 'Round-robin assignment' }
      },
      {
        id: 'n6', type: 'outputNode', position: { x: 990, y: 200 },
        data: { icon: '📞', label: 'Schedule Demo', sublabel: 'Output', status: 'idle', description: 'Calendly + Google Calendar sync' }
      },
    ],
    edges: [
      { id: 'e1-2', source: 'n1', target: 'n2', label: 'new signup' },
      { id: 'e2-3', source: 'n2', target: 'n3', label: 'verified' },
      { id: 'e3-4', source: 'n3', target: 'n4', label: 'account ready' },
      { id: 'e4-5', source: 'n4', target: 'n5', label: 'welcomed' },
      { id: 'e5-6', source: 'n5', target: 'n6', label: 'assigned' },
    ],
    executionOrder: [['n1'], ['n2'], ['n3'], ['n4'], ['n5'], ['n6']],
  },

  dataSyncPipeline: {
    id: 'dataSyncPipeline',
    name: 'Data Sync Pipeline',
    description: 'Poll, transform, validate and load external data',
    nodes: [
      {
        id: 'n1', type: 'triggerNode', position: { x: 60, y: 220 },
        data: { icon: '🔄', label: 'API Poller', sublabel: 'Trigger', status: 'idle', description: 'Scheduled every 15 minutes' }
      },
      {
        id: 'n2', type: 'processNode', position: { x: 260, y: 220 },
        data: { icon: '🔧', label: 'Transform', sublabel: 'Process', status: 'idle', description: 'Schema normalisation' }
      },
      {
        id: 'n3', type: 'processNode', position: { x: 460, y: 220 },
        data: { icon: '🛡️', label: 'Validate', sublabel: 'Process', status: 'idle', description: 'Pydantic schema + rules' }
      },
      {
        id: 'n4', type: 'outputNode', position: { x: 660, y: 150 },
        data: { icon: '🗄️', label: 'Load to DB', sublabel: 'Output', status: 'idle', description: 'Supabase upsert batch' }
      },
      {
        id: 'n5', type: 'outputNode', position: { x: 860, y: 150 },
        data: { icon: '💬', label: 'Notify Slack', sublabel: 'Output', status: 'idle', description: 'Summary to #data-ops' }
      },
      {
        id: 'n6', type: 'outputNode', position: { x: 560, y: 330 },
        data: { icon: '💀', label: 'Dead Letter Queue', sublabel: 'Output', status: 'idle', description: 'Failed records for review' }
      },
    ],
    edges: [
      { id: 'e1-2', source: 'n1', target: 'n2', label: 'raw data' },
      { id: 'e2-3', source: 'n2', target: 'n3', label: 'normalised' },
      { id: 'e3-4', source: 'n3', target: 'n4', label: 'valid rows', animated: true },
      { id: 'e4-5', source: 'n4', target: 'n5', label: 'loaded' },
      { id: 'e3-6', source: 'n3', target: 'n6', label: 'invalid rows', style: { stroke: '#EF4444' } },
    ],
    executionOrder: [['n1'], ['n2'], ['n3'], ['n4', 'n6'], ['n5']],
  },
}

export const TEMPLATE_LIST = Object.values(TEMPLATES)

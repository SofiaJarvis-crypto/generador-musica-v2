# 🔧 AUTOMATION SETUP - Implementación Técnica
**Para: Haiku | Actualizado: 2026-03-19**

Guía step-by-step para implementar el sistema automático.

---

## PARTE 1: GOOGLE ANALYTICS 4 SETUP

### Step 1a: Verificar GA4 Property

```bash
# Ir a: https://analytics.google.com
# Left sidebar → Admin → Property Settings
# Copiar: Property ID (ej: 123456789)
# Guardar en .env:
GA4_PROPERTY_ID=123456789
```

### Step 1b: Implementar eventos en código

**Archivo: `src/app/page.tsx` (Homepage / Formulario)**

```typescript
// Add at top
import { useEffect } from 'react';

export default function Home() {
  // Track form submit
  const handleGenerateClick = () => {
    if (typeof window !== 'undefined') {
      gtag('event', 'generate_click', {
        genre: selectedGenre,
        mood: selectedMood,
        brand_category: brandCategory, // si existe
        session_id: sessionId
      });
    }
    // ... rest of logic
  };

  return (
    // Form JSX
  );
}
```

**Archivo: `src/app/escuchar/[id]/page.tsx` (Paywall)**

```typescript
export default function EscucharPage({ params }) {
  const { id } = params;

  useEffect(() => {
    // Track paywall view
    gtag('event', 'paywall_view', {
      generation_id: id,
      has_two_versions: songA && songB ? true : false
    });
  }, [id]);

  const handlePaymentClick = (selectedSong) => {
    gtag('event', 'payment_click', {
      generation_id: id,
      song_selected: selectedSong, // 'song_a' o 'song_b'
      value: 8900,
      currency: 'ARS'
    });
    // ... payment logic
  };

  return (
    // Player + Payment button
  );
}
```

**Archivo: `src/app/api/webhooks/mercadopago/route.ts`**

```typescript
export async function POST(request: Request) {
  const body = await request.json();
  
  // When payment is approved
  if (body.type === 'payment' && body.data.status === 'approved') {
    // Track purchase event (server-side)
    // You can use gtag via tracking pixel or fetch to GA4 API
    
    gtag('event', 'purchase', {
      transaction_id: body.data.id,
      value: 8900,
      currency: 'ARS',
      items: [{ item_name: 'MP3_Download' }]
    });
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}
```

### Step 1c: Create custom segments for A/B testing

```
GA4 → Admin → Custom definitions → Create segment
Name: "Paywall Variant A"
Condition: event_name = "paywall_view" AND custom_param_variant = "a"

Name: "Paywall Variant B"
Condition: event_name = "paywall_view" AND custom_param_variant = "b"
```

---

## PARTE 2: GOOGLE SHEETS DASHBOARD

### Step 2a: Create Google Sheet

1. Go to: https://sheets.google.com
2. Create new sheet: "Generador Música - Metrics"
3. Share with Jarvis (read-only for him)

### Step 2b: Create dashboard structure

**Sheet 1: Daily Metrics**
```
Date | Sessions | Bounce Rate | Conversions | Revenue ARS | Ad Spend ARS | ROAS
-----|----------|-------------|-------------|------------|------------|----
2026-03-19 | 147 | 32% | 3 | 26,700 | 1,500 | 1.78x
2026-03-20 | 152 | 35% | 2 | 17,800 | 1,500 | 1.19x
...
```

**Sheet 2: Weekly Summary**
```
Week | Total Sessions | Total Conversions | Total Revenue | Ad Spend | ROAS | Conv Rate
-----|---|---|---|---|---|---
Mar 19-25 | 1,029 | 18 | $160,200 | $10,500 | 1.53x | 1.75%
```

**Sheet 3: By Channel**
```
Channel | Sessions | Conversions | Conv Rate | Cost | CAC
--------|----------|-----------|-----------|------|-----
Organic | 300 | 8 | 2.7% | 0 | Free
Meta | 450 | 6 | 1.3% | 5k | 833
Google | 200 | 4 | 2.0% | 3k | 750
```

### Step 2c: Auto-populate with GA4 Connector

```
1. Go to Sheet → Data → Data connectors
2. Search "Google Analytics 4"
3. Connect your GA4 property
4. Select dimensions: date, source/medium, eventName
5. Select metrics: sessions, conversions, transactionRevenue
6. Refresh: daily (automatic)
```

---

## PARTE 3: META ADS AUTOMATION

### Step 3a: Get API credentials

```bash
# 1. Go to: https://developers.facebook.com
# 2. Create app (if not exists)
# 3. Go to Settings → Basic
# Copiar: App ID, App Secret

# 4. Go to Tools → Access Token Generator
# Generate: User Access Token (never expires)
# Guardar en .env:
META_APP_ID=123456789
META_APP_SECRET=xxxxxx
META_ACCESS_TOKEN=EAAxxxx...
META_AD_ACCOUNT_ID=act_123456789
```

### Step 3b: Create script to pause low-ROAS ads

**File: `scripts/pause_low_roas_ads.js`**

```javascript
const axios = require('axios');
require('dotenv').config();

const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
const AD_ACCOUNT_ID = process.env.META_AD_ACCOUNT_ID;
const ROAS_THRESHOLD = 1.5;

async function pauseLowROASAds() {
  try {
    // Get all campaigns with insights
    const response = await axios.get(
      `https://graph.instagram.com/v18.0/${AD_ACCOUNT_ID}/campaigns`,
      {
        params: {
          fields: 'id,name,status,insights.date_preset(last_7d){spend,purchase_roas}',
          access_token: ACCESS_TOKEN,
        },
      }
    );

    const campaigns = response.data.data;

    for (const campaign of campaigns) {
      if (!campaign.insights || !campaign.insights.data[0]) continue;

      const insight = campaign.insights.data[0];
      const roas = parseFloat(insight.purchase_roas || 0);

      if (roas < ROAS_THRESHOLD && campaign.status === 'ACTIVE') {
        // Pause the campaign
        await axios.post(
          `https://graph.instagram.com/v18.0/${campaign.id}`,
          { status: 'PAUSED' },
          { params: { access_token: ACCESS_TOKEN } }
        );

        console.log(`✅ Paused: ${campaign.name} (ROAS: ${roas.toFixed(2)}x)`);
      }
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

pauseLowROASAds();
```

**Run daily at 08:00 AM:**
```bash
# Add to crontab (or use GitHub Actions, Vercel cron)
0 8 * * * cd /path/to/app && node scripts/pause_low_roas_ads.js
```

### Step 3c: Create new ads programmatically

**File: `scripts/create_weekly_ads.js`**

```javascript
// Template: Run every Monday at 09:00 AM
// Creates 3 new ad creatives for the week

const axios = require('axios');

const CREATIVES = [
  {
    week: 1,
    headline: 'La canción perfecta para tu marca',
    description: 'En 2 minutos, con IA. Sin músicos.',
    cta: 'Probar gratis',
  },
  {
    week: 2,
    headline: 'Jingles profesionales en minutos',
    description: 'Menos que 1 hora de estudio. Más barato.',
    cta: 'Crear ahora',
  },
  {
    week: 3,
    headline: 'Más de 500 marcas ya tienen su jingle',
    description: 'Tú también podrías. Sin estudio de grabación.',
    cta: 'Ver cómo',
  },
];

async function createAdsForWeek() {
  const weekNumber = Math.ceil(new Date().getDate() / 7);
  const creative = CREATIVES[weekNumber - 1];

  // Call Meta API to create ad_creative
  // Then create ad and add to campaign
  // Then set budget and schedule
  
  console.log(`✅ Created ads for week ${weekNumber}`);
}

createAdsForWeek();
```

---

## PARTE 4: GOOGLE ADS AUTOMATION

### Step 4a: Setup Google Ads API

```bash
# 1. Go to: https://ads.google.com/aw/campaigns
# 2. Tools → API Center
# 3. Create project, enable Google Ads API
# 4. Create OAuth 2.0 credentials
# 5. Download JSON credentials
# Guardar en .env:
GOOGLE_ADS_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_ADS_CLIENT_SECRET=xxx
GOOGLE_ADS_REFRESH_TOKEN=xxx
GOOGLE_ADS_CUSTOMER_ID=123-456-7890
```

### Step 4b: Auto-adjust bids script

**File: `scripts/adjust_google_ads_bids.js`**

```javascript
const { GoogleAdsApi } = require('google-ads-api');

const client = new GoogleAdsApi({
  client_id: process.env.GOOGLE_ADS_CLIENT_ID,
  client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET,
  developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN,
});

async function adjustBids() {
  const report = await client.report({
    entity: 'ad_group',
    attributes: ['ad_group.name', 'ad_group.cpc_bid_micros'],
    metrics: ['metrics.conversions', 'metrics.cost_micros'],
    constraints: {
      'campaign.name': ['Generador Música'],
    },
  });

  for (const row of report) {
    const conversions = row.metrics.conversions;
    const cost = row.metrics.cost_micros / 1000000; // convert to ARS
    const conversionRate = conversions > 0 ? conversions : 0;

    // If low conversion, lower bid
    if (conversionRate < 2) {
      const newBid = Math.ceil(row.ad_group.cpc_bid_micros * 0.8); // reduce 20%
      
      await client.mutate({
        mutate_operations: [
          {
            ad_group_operation: {
              update: {
                resource_name: row.ad_group.resource_name,
                cpc_bid_micros: newBid,
              },
              update_mask: { paths: ['cpc_bid_micros'] },
            },
          },
        ],
      });

      console.log(`📉 Reduced bid for ${row.ad_group.name}`);
    }
  }
}

adjustBids();
```

---

## PARTE 5: A/B TESTING SETUP

### Option A: Vercel Analytics (Recommended - Easiest)

```typescript
// src/components/AbTestWrapper.tsx
import { useEffect } from 'react';

interface ABTestProps {
  testName: string;
  variantA: JSX.Element;
  variantB: JSX.Element;
  testWeight?: number; // 50 = 50/50 split
}

export function ABTest({ testName, variantA, variantB, testWeight = 50 }: ABTestProps) {
  const [variant, setVariant] = React.useState<'a' | 'b'>('a');

  useEffect(() => {
    // Determine variant based on user ID (consistent)
    const userId = sessionStorage.getItem('sessionId');
    const isVariantB = parseInt(userId, 36) % 100 < testWeight;
    setVariant(isVariantB ? 'b' : 'a');

    // Track which variant
    gtag('event', `ab_test_${testName}`, {
      variant: isVariantB ? 'b' : 'a',
    });
  }, [testName, testWeight]);

  return variant === 'a' ? variantA : variantB;
}
```

**Usage:**
```typescript
// In /escuchar/[id]/page.tsx

<ABTest
  testName="paywall_headline"
  testWeight={50}
  variantA={<h2>¿Te gustó? Descargala entera</h2>}
  variantB={<h2>Desbloqueá la canción completa ahora</h2>}
/>
```

### Option B: Google Optimize (If using GTM)

```
1. Go to: https://optimize.google.com
2. Create experiment
3. Choose: A/B test
4. Select page URL: /escuchar
5. Create variations (CSS or DOM edits)
6. Set metrics: event = "paywall_conversion"
7. Traffic allocation: 50/50
8. Start experiment
```

---

## PARTE 6: SLACK NOTIFICATIONS

### Step 6a: Create Slack app

```bash
1. Go to: https://api.slack.com/apps
2. Create new app → From scratch
3. Name: "Generador Música Bot"
4. Workspace: Select your workspace
5. OAuth & Permissions → Add scope: chat:write
6. Reinstall app → Copy Bot Token
Guardar en .env:
SLACK_BOT_TOKEN=xoxb-xxx...
SLACK_CHANNEL_ID=C123456
```

### Step 6b: Send daily metrics alert

**File: `scripts/send_slack_metrics.js`**

```javascript
const { WebClient } = require('@slack/web-api');
const { GoogleAnalyticsReporting } = require('googleapis').analyticsreporting('v4');

const slack = new WebClient(process.env.SLACK_BOT_TOKEN);

async function sendMetricsAlert() {
  // Fetch yesterday's metrics from GA4
  const yesterday = new Date(Date.now() - 86400000)
    .toISOString()
    .split('T')[0];

  // (Use GA4 API to fetch metrics)
  
  const message = {
    channel: process.env.SLACK_CHANNEL_ID,
    text: `📊 Daily Metrics - ${yesterday}`,
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: `📊 Daily Metrics - ${yesterday}`,
        },
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Sessions:*\n147`,
          },
          {
            type: 'mrkdwn',
            text: `*Conversions:*\n3`,
          },
          {
            type: 'mrkdwn',
            text: `*Revenue:*\n$26,700 ARS`,
          },
          {
            type: 'mrkdwn',
            text: `*Conversion Rate:*\n2.0%`,
          },
        ],
      },
    ],
  };

  await slack.chat.postMessage(message);
  console.log('✅ Sent metrics to Slack');
}

// Run daily at 09:00 AM
sendMetricsAlert();
```

---

## PARTE 7: DEPLOY AUTOMATION

### Setup GitHub Actions (Cron jobs)

**File: `.github/workflows/daily-metrics.yml`**

```yaml
name: Daily Metrics Report

on:
  schedule:
    - cron: '0 9 * * *' # 09:00 AM Buenos Aires time

jobs:
  send-metrics:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: node scripts/send_slack_metrics.js
        env:
          SLACK_BOT_TOKEN: ${{ secrets.SLACK_BOT_TOKEN }}
          GA4_PROPERTY_ID: ${{ secrets.GA4_PROPERTY_ID }}
```

**File: `.github/workflows/pause-low-roas.yml`**

```yaml
name: Pause Low ROAS Ads

on:
  schedule:
    - cron: '0 8 * * *' # 08:00 AM daily

jobs:
  pause-ads:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: node scripts/pause_low_roas_ads.js
        env:
          META_ACCESS_TOKEN: ${{ secrets.META_ACCESS_TOKEN }}
          META_AD_ACCOUNT_ID: ${{ secrets.META_AD_ACCOUNT_ID }}
```

---

## CHECKLIST DE IMPLEMENTACIÓN

- [ ] GA4 events implementados en todas las páginas
- [ ] Google Sheets dashboard automático
- [ ] Meta ads script corriendo diariamente
- [ ] Google Ads bidding automation
- [ ] Slack alerts configuradas
- [ ] A/B testing framework en lugar
- [ ] GitHub Actions cron jobs setup
- [ ] Test de todo end-to-end (dummy purchase)
- [ ] Haiku entrenado en sistema
- [ ] Monitoreo continuo del lunes-viernes

---

## TESTING

**Test 1: GA4 Events**
```bash
# Make a test purchase
# Go to GA4 real-time
# Verify: "purchase" event appears within 5 seconds
```

**Test 2: Ads Script**
```bash
# Manually run: node scripts/pause_low_roas_ads.js
# Check: Meta Ads Manager - campaign status changed?
```

**Test 3: Slack Alert**
```bash
# Manually run: node scripts/send_slack_metrics.js
# Check: Message appears in Slack #generador-musica
```

**Test 4: A/B Split**
```bash
# Open app in 2 browsers
# See different variants based on session
# Check GA4: both variants tracked
```

---

## NEXT STEPS

Once setup is complete:
1. Run for 1 week baseline (collect data)
2. Share results with Jarvis every Friday
3. Propose optimizations for next week
4. Deploy changes Monday morning
5. Measure impact Friday

GO! 🚀

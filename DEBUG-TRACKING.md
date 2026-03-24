# 🔍 Script de Debug para Tracking

**Objetivo:** Diagnosticar por qué el evento `purchase` no se está registrando en GA4.

---

## 📋 Instrucciones para Señor Miki

### 1. Hacer una compra de prueba

1. Ir a https://generador-musica-v2.vercel.app
2. Generar una canción
3. Completar el pago (MercadoPago)
4. **ANTES de cerrar la pestaña de descarga:**
   - Abrir DevTools (F12 o Cmd+Option+I en Mac)
   - Seguir los pasos de abajo

---

## 🧪 Test 1: Verificar si gtag está cargado

**En la pestaña Console de DevTools, pegar:**

```javascript
// Verificar gtag global
if (typeof gtag === 'function') {
  console.log('✅ gtag está disponible')
  console.log('dataLayer:', window.dataLayer)
} else {
  console.error('❌ gtag NO está disponible')
}

// Verificar GA Measurement ID
console.log('GA_MEASUREMENT_ID esperado: G-RGN3X2NSZR')
```

**Resultado esperado:**
```
✅ gtag está disponible
dataLayer: Array(X) [...]
GA_MEASUREMENT_ID esperado: G-RGN3X2NSZR
```

**Si sale ❌:** gtag.js no se cargó → Problema de red o blocker

---

## 🧪 Test 2: Verificar localStorage

```javascript
// Ver qué hay en localStorage
const keys = Object.keys(localStorage)
const trackingKeys = keys.filter(k => k.includes('tracked'))

console.log('🔑 Claves de tracking en localStorage:')
trackingKeys.forEach(key => {
  console.log(`  ${key}: ${localStorage.getItem(key)}`)
})

// Verificar specific purchase key
const generationId = window.location.pathname.split('/').pop() || 'unknown'
const purchaseKey = `tracked_purchase_${generationId}`
console.log(`\n🛒 Purchase key esperada: ${purchaseKey}`)
console.log(`   Valor: ${localStorage.getItem(purchaseKey) || 'NO EXISTE'}`)
```

**Resultado esperado:**
```
🔑 Claves de tracking en localStorage:
  tracked_purchase_abc123: true
  tracked_cart_abc123: true
  tracked_checkout_abc123: true

🛒 Purchase key esperada: tracked_purchase_abc123
   Valor: true
```

**Si "NO EXISTE":** El evento nunca se disparó

---

## 🧪 Test 3: Disparar purchase manualmente (TEST)

**IMPORTANTE:** Solo hacer esto **UNA VEZ** para test.

```javascript
// Simular el evento purchase
const testData = {
  transactionId: 'TEST_' + Date.now(),
  generationId: 'test_generation',
  brandName: 'Test Brand',
  value: 8900,
}

console.log('🧪 Disparando purchase de prueba...')
console.log('Data:', testData)

if (typeof gtag === 'function') {
  gtag('event', 'purchase', {
    transaction_id: testData.transactionId,
    currency: 'ARS',
    value: testData.value,
    items: [{
      item_id: testData.generationId,
      item_name: testData.brandName,
      item_category: 'music',
      price: testData.value,
      quantity: 1,
    }]
  })
  console.log('✅ Evento purchase enviado a gtag')
} else {
  console.error('❌ gtag no disponible, evento NO enviado')
}
```

**Resultado esperado:**
```
🧪 Disparando purchase de prueba...
Data: {transactionId: "TEST_1711382400000", ...}
✅ Evento purchase enviado a gtag
```

**Después de ejecutar:**
1. Ir a Google Analytics → Real-Time → Events
2. Buscar evento "purchase" en los últimos 30 segundos
3. Debe aparecer con `transaction_id: TEST_XXXXX`

---

## 🧪 Test 4: Verificar Network Requests

**En DevTools → Network tab:**

1. Filtrar por `gtag` o `google-analytics`
2. Buscar requests a `www.google-analytics.com/g/collect`
3. Click en uno de los requests
4. En la pestaña "Payload" o "Request", buscar:
   - `en=purchase` (evento purchase)
   - `tr=8900` (transaction value)
   - `tid=TEST_XXXXX` (transaction id)

**Si NO aparece:** gtag no está enviando datos a GA4

**Captura de pantalla esperada:**
```
Request URL: https://www.google-analytics.com/g/collect?...
Payload:
  en=purchase
  tid=TEST_123456789
  tr=8900
  cu=ARS
  ...
```

---

## 🧪 Test 5: Revisar Errores en Console

**Buscar errores relacionados con:**
- `gtag`
- `analytics`
- `purchase`
- `localStorage`

```javascript
// Ver todos los errores capturados
console.log('❌ Errores recientes:')
console.log(window.onerror)
```

**Errores comunes:**
- `gtag is not defined` → Script no cargó
- `QuotaExceededError` → localStorage lleno
- `Network request failed` → Bloqueado por firewall/ad-blocker

---

## 📸 Qué enviarme

**Por favor, enviar screenshots de:**

1. ✅ Console con resultado de Test 1 (gtag disponible)
2. ✅ Console con resultado de Test 2 (localStorage)
3. ✅ Network tab con filtro "gtag" (después de Test 3)
4. ✅ Console con cualquier error en rojo

**Además:**
- URL completa de la página de descarga (`/descarga?token=XXX`)
- ¿Cuánto tiempo después del pago llegaste a `/descarga`?
- ¿Recargaste la página?

---

## 🔧 Fix Rápido si gtag no está disponible

Si el Test 1 falla (gtag no disponible), ejecutar:

```javascript
// Cargar gtag manualmente
const script = document.createElement('script')
script.src = 'https://www.googletagmanager.com/gtag/js?id=G-RGN3X2NSZR'
script.async = true
document.head.appendChild(script)

script.onload = () => {
  window.dataLayer = window.dataLayer || []
  function gtag(){dataLayer.push(arguments)}
  window.gtag = gtag
  gtag('js', new Date())
  gtag('config', 'G-RGN3X2NSZR')
  console.log('✅ gtag cargado manualmente')
}
```

---

## 🚨 Problemas Comunes y Soluciones

### Problema: "gtag is not defined"
**Causa:** Script bloqueado o no cargó  
**Solución:** Verificar ad-blockers, usar modo incógnito, o ejecutar Fix Rápido

### Problema: "purchase ya registrado" pero no aparece en GA4
**Causa:** Datos enviados pero GA4 los filtró (duplicados, bot traffic, etc.)  
**Solución:** Verificar en GA4 → Admin → Data Settings → Data Filters

### Problema: "localStorage no existe"
**Causa:** Modo incógnito o cookies bloqueadas  
**Solución:** Usar ventana normal, habilitar cookies

### Problema: Event aparece en Real-Time pero no en Reports
**Causa:** GA4 procesa reportes con 24-48h de delay  
**Solución:** Esperar 1 día, verificar en Real-Time Events primero

---

## 📊 Checklist Final

Después de correr todos los tests:

- [ ] gtag disponible (Test 1)
- [ ] localStorage funcionando (Test 2)
- [ ] Evento purchase enviado manualmente (Test 3)
- [ ] Request visible en Network tab (Test 4)
- [ ] No hay errores en Console (Test 5)
- [ ] Evento aparece en GA4 Real-Time

**Si todos ✅:** El problema es que el evento no se está disparando automáticamente → Revisar código de `/descarga`  
**Si alguno ❌:** Problema de infraestructura → Priorizar ese fix

---

_Jarvis | CTO HandOver_

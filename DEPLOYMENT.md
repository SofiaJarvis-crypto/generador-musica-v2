# Deployment Checklist - Email Feature

## Cambios implementados
✅ Instalado `resend` npm package  
✅ Actualizado webhook MP para enviar email automático con link de descarga  
✅ Email usa `download_token` de la tabla `payments` (ya existe en schema.sql)  

## Variables de entorno requeridas

Agregar en **Vercel > Settings > Environment Variables**:

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxx
NEXT_PUBLIC_BASE_URL=https://generador-musica-v2.vercel.app
```

### Cómo obtener RESEND_API_KEY

1. Crear cuenta en [resend.com](https://resend.com) (gratis 3k emails/mes)
2. Dashboard > API Keys > Create API Key
3. Copiar el key (empieza con `re_`)
4. Pegar en Vercel

### NEXT_PUBLIC_BASE_URL

Usar el dominio de producción donde está deployado:
- Vercel: `https://generador-musica-v2.vercel.app`
- Custom domain: `https://tudominio.com`

**Importante:** Sin slash final.

## Dominio de email (opcional)

El código usa `onboarding@resend.dev` (funciona sin setup).

Para usar dominio propio (`noreply@handover.ar`):
1. Ir a Resend > Domains > Add Domain
2. Agregar `handover.ar`
3. Configurar registros DNS (SPF, DKIM, etc.)
4. Editar webhook y cambiar:
   ```ts
   from: 'Generador de Música <noreply@handover.ar>',
   ```

## Deploy

```bash
git add .
git commit -m "feat: envío automático de email con link de descarga post-pago"
git push origin main
```

Vercel auto-deploya. Verificar en logs que `RESEND_API_KEY` esté configurada.

## Testing

1. Hacer pago de prueba en MP
2. Verificar webhook logs en Vercel
3. Confirmar email recibido en inbox del pagador
4. Validar que link de descarga funcione

## Backfill (opcional)

Si hay pagos aprobados antes de este deploy, ejecutar script para enviar emails retroactivos:

```sql
-- En Supabase SQL Editor
SELECT id, payer_email, download_token 
FROM payments 
WHERE mp_status = 'approved' 
  AND payer_email IS NOT NULL 
  AND download_token IS NOT NULL;
```

Luego mandar emails manualmente vía script Node.js o Resend dashboard.

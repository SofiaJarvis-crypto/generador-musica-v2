-- Tabla de cupones de descuento / acceso gratis
CREATE TABLE IF NOT EXISTS coupons (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code         TEXT UNIQUE NOT NULL,
  -- 'percent': descuento porcentual, 'fixed': descuento fijo en ARS, 'free': gratis
  discount_type  TEXT NOT NULL CHECK (discount_type IN ('percent', 'fixed', 'free')),
  discount_value NUMERIC DEFAULT 0,  -- e.g. 50 para 50% o 2000 para $2000 ARS (ignorado si 'free')
  max_uses       INT,                 -- NULL = sin límite
  uses_count     INT DEFAULT 0,
  is_active      BOOLEAN DEFAULT true,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- Columna en payments para registrar el cupón usado
ALTER TABLE payments
  ADD COLUMN IF NOT EXISTS coupon_code TEXT,
  ADD COLUMN IF NOT EXISTS discount_amount_ars NUMERIC DEFAULT 0;

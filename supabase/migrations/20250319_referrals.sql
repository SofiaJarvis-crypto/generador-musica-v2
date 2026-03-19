-- Referral system schema
-- Run this in Supabase SQL Editor

-- 1. Referral codes table
CREATE TABLE IF NOT EXISTS referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  generation_id UUID NOT NULL,
  email TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  total_clicks INTEGER DEFAULT 0,
  total_conversions INTEGER DEFAULT 0,
  total_earned_ars INTEGER DEFAULT 0,
  
  -- Indexes
  CONSTRAINT fk_generation FOREIGN KEY (generation_id) REFERENCES generations(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_referrals_code ON referrals(code);
CREATE INDEX IF NOT EXISTS idx_referrals_generation ON referrals(generation_id);

-- 2. Referral clicks tracking
CREATE TABLE IF NOT EXISTS referral_clicks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referral_code TEXT NOT NULL,
  clicked_at TIMESTAMPTZ DEFAULT now(),
  ip_address TEXT,
  user_agent TEXT,
  converted BOOLEAN DEFAULT false,
  payment_id UUID,
  
  CONSTRAINT fk_referral FOREIGN KEY (referral_code) REFERENCES referrals(code) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_clicks_code ON referral_clicks(referral_code);
CREATE INDEX IF NOT EXISTS idx_clicks_converted ON referral_clicks(converted);

-- 3. Add referrer tracking to generations
ALTER TABLE generations 
ADD COLUMN IF NOT EXISTS referrer_code TEXT,
ADD COLUMN IF NOT EXISTS referred_by UUID;

-- 4. RPC function to increment click counter
CREATE OR REPLACE FUNCTION increment_referral_clicks(ref_code TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE referrals 
  SET total_clicks = total_clicks + 1
  WHERE code = ref_code;
END;
$$ LANGUAGE plpgsql;

-- 6. Function to update referral stats
CREATE OR REPLACE FUNCTION update_referral_stats()
RETURNS TRIGGER AS $$
BEGIN
  -- Update total conversions and earnings when payment is confirmed
  IF NEW.payment_status = 'approved' AND NEW.referrer_code IS NOT NULL THEN
    UPDATE referrals 
    SET 
      total_conversions = total_conversions + 1,
      total_earned_ars = total_earned_ars + 1000 -- $1,000 ARS per conversion
    WHERE code = NEW.referrer_code;
    
    -- Mark click as converted
    UPDATE referral_clicks
    SET 
      converted = true,
      payment_id = NEW.id
    WHERE referral_code = NEW.referrer_code 
      AND clicked_at >= NEW.created_at - INTERVAL '7 days'
      AND converted = false
    LIMIT 1;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 7. Trigger on payment updates
DROP TRIGGER IF EXISTS trigger_update_referral_stats ON generations;
CREATE TRIGGER trigger_update_referral_stats
  AFTER UPDATE OF payment_status
  ON generations
  FOR EACH ROW
  EXECUTE FUNCTION update_referral_stats();

-- 8. View for referral dashboard
CREATE OR REPLACE VIEW referral_dashboard AS
SELECT 
  r.code,
  r.generation_id,
  r.email,
  r.created_at,
  r.total_clicks,
  r.total_conversions,
  r.total_earned_ars,
  ROUND(
    CASE 
      WHEN r.total_clicks > 0 
      THEN (r.total_conversions::float / r.total_clicks::float) * 100 
      ELSE 0 
    END, 
    2
  ) as conversion_rate,
  COUNT(DISTINCT rc.id) as unique_clicks,
  COUNT(DISTINCT CASE WHEN rc.converted THEN rc.id END) as confirmed_conversions
FROM referrals r
LEFT JOIN referral_clicks rc ON rc.referral_code = r.code
GROUP BY r.code, r.generation_id, r.email, r.created_at, r.total_clicks, r.total_conversions, r.total_earned_ars;

COMMENT ON TABLE referrals IS 'Stores referral codes generated when users create jingles';
COMMENT ON TABLE referral_clicks IS 'Tracks when referral links are clicked and converted';
COMMENT ON VIEW referral_dashboard IS 'Analytics view for referral performance';

# 🔒 Security Cleanup - ENV Exposure Fix

**Date:** 2026-03-19  
**Issue:** `.env.production` with real credentials was tracked in git

---

## ✅ What I Did (Safe & Complete)

### 1. Removed from Working Directory
- Deleted `.env.production` from disk
- Added to `.gitignore` to prevent future commits
- Committed the removal to git

### 2. Credentials Exposed (Need Rotation)
The following keys were in the committed file and should be rotated:

#### Supabase
- **Service Role Key:** `eyJhbGci...J8-20` (CRITICAL - full admin access)
  - Go to: https://supabase.com/dashboard/project/tlyycgdwbxobutgarpqm/settings/api
  - Revoke & regenerate service_role key
  - Update in Vercel env vars

#### Suno API
- **API Key:** `99dc9b9e...2b1f2cd0b`
  - Contact Suno support to rotate, or regenerate in your dashboard
  - Update in Vercel env vars

#### MercadoPago
- **Access Token:** `APP_USR-1546...280319010`
  - Go to: https://www.mercadopago.com.ar/developers/panel/app
  - Revoke current token & create new one
  - Update in Vercel env vars

#### Resend
- **API Key:** `re_SqWq...dHFTD8`
  - Go to: https://resend.com/api-keys
  - Delete old key & create new one
  - Update in Vercel env vars

---

## 🧹 Purging Git History (OPTIONAL but Recommended)

The file is removed from the latest commit, but **still exists in git history**.

If the repo is public or shared, you should purge the history:

```bash
# Option 1: BFG Repo-Cleaner (easiest)
brew install bfg
cd /Users/emjei/.openclaw/workspace/generador-musica-v2
bfg --delete-files .env.production
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Option 2: git filter-repo (more powerful)
brew install git-filter-repo
git filter-repo --path .env.production --invert-paths

# After purging:
git push origin --force --all
git push origin --force --tags
```

⚠️ **Warning:** Force push will rewrite history. Coordinate with team if repo is shared.

---

## 📋 Next Steps (Priority Order)

1. **Rotate all 4 keys** (Supabase, Suno, MP, Resend) - **DO THIS FIRST**
2. Update Vercel environment variables with new keys
3. Test production deployment
4. (Optional) Purge git history if repo is/was public
5. Enable Vercel/GitHub secret scanning alerts

---

## ✅ Current Status

- [x] File removed from working directory
- [x] Added to .gitignore
- [x] Committed removal to git
- [ ] Keys rotated (YOU NEED TO DO THIS)
- [ ] Vercel env vars updated
- [ ] Git history purged (optional)

---

**Safe to proceed:** Yes. The file is now protected from future commits.  
**Urgent action needed:** Rotate the 4 exposed credentials ASAP.

# Deploy ke Netlify - Step by Step Guide

## Prerequisite
1. Repository sudah di GitHub
2. Sudah punya akun Netlify (daftar di netlify.com)
3. GitHub account terhubung dengan Netlify

---

## STEP 1: Pastikan `.env.local` Tidak Di-Push ke GitHub

Supabase keys harus dirahasiakan! Pastikan `.env.local` di-ignore:

**File: `.gitignore`** (tambahkan jika belum ada)
```
.env.local
.env.*.local
```

**Untuk Supabase Environment Variables:**
- Jangan simpan di `.env.local` yang di-push
- Set langsung di Netlify dashboard

---

## STEP 2: Push Project ke GitHub

```bash
cd d:\code-for-life\playground\elegant-wedding-invite

# Pastikan git sudah initialized
git status

# Jika belum:
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/elegant-wedding-invite.git
git push -u origin main
```

---

## STEP 3: Login ke Netlify & Connect Repository

1. **Buka https://netlify.com dan login**

2. **Klik "Add new site"** → "Import an existing project"

3. **Pilih "GitHub"** dan authorize Netlify

4. **Pilih repository:** `elegant-wedding-invite`

5. **Configure build settings:**
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Node version:** 18 (or latest)

   *(Netlify biasanya auto-detect ini, tapi pastikan benar)*

---

## STEP 4: Set Environment Variables di Netlify

1. **Di Netlify Dashboard:**
   - Pilih site
   - Pergi ke **Settings** → **Build & deploy** → **Environment**

2. **Klik "Edit variables"** dan tambahkan:
   ```
   VITE_SUPABASE_URL = https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

   *Get dari Supabase Dashboard → Settings → API*

3. **Klik Save**

---

## STEP 5: Trigger Deploy

Setelah set env variables:

1. **Pergi ke "Deploys"** tab
2. **Klik tombol "Trigger deploy"** → **Deploy site**

Atau cukup push code ke GitHub, Netlify otomatis build & deploy.

---

## STEP 6: Monitor Build Progress

1. **Buka Netlify Dashboard → Deploys**
2. **Lihat status deploy:**
   - 🟡 **Building** - sedang build
   - 🟢 **Published** - sukses!
   - 🔴 **Failed** - ada error

3. **Jika error, klik deploy untuk lihat logs**

---

## COMMON ISSUES & SOLUTIONS

### ❌ Build Failed - "Cannot find module"
**Solusi:**
```bash
# Pastikan semua dependencies terinstall
npm install

# Build lokal untuk test
npm run build

# Jika error, fix kemudian push ke GitHub
git add .
git commit -m "Fix build error"
git push
```

### ❌ Blank Page / 404
**Sebab:**
- Environment variables tidak set
- Build output di folder yang salah
- React Router base path issue

**Solusi:**
1. Cek Netlify env variables sudah set
2. Pastikan publish directory = `dist`
3. Jika pakai routing, buat `netlify.toml`

### ❌ Supabase Connection Error
**Sebab:** Environment variables tidak ditemukan

**Solusi:**
1. Verifikasi VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY sudah di-set
2. Trigger deploy ulang setelah set env variables
3. Clear browser cache

### ❌ "Cannot GET /"
**Sebab:** SPA routing issue

**Solusi:** Buat file `public/_redirects`:
```
/*    /index.html   200
```

---

## STEP 7: Custom Domain (Optional)

1. **Netlify Dashboard → Settings → Domain management**
2. **Klik "Add domain"**
3. **Follow instruksi** untuk setup domain kustom

---

## DEPLOY ULANG

Setiap kali push ke GitHub:
```bash
git add .
git commit -m "Deskripsi perubahan"
git push origin main
```

Netlify otomatis build & deploy!

---

## Quick Checklist

- [ ] `.env.local` ada di `.gitignore`
- [ ] Semua file sudah di-push ke GitHub
- [ ] Repository di-link ke Netlify
- [ ] Build command: `npm run build`
- [ ] Publish directory: `dist`
- [ ] Environment variables sudah set di Netlify
- [ ] Deploy sukses (status 🟢)

---

## Test Deployment

Setelah deploy sukses:
1. Buka link dari Netlify (misal: `https://elegant-wedding-invite.netlify.app`)
2. Test semua features:
   - ✅ Hero section + countdown
   - ✅ Couple section
   - ✅ RSVP form
   - ✅ Wishes list (dari Supabase)
3. Test submit wish baru
4. Refresh halaman → wish tetap ada ✓

Done! 🎉

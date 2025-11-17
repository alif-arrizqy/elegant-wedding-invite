# Admin Panel Setup Guide

## 1. Setup Supabase Database

### SQL Schema untuk Guests Table

```sql
CREATE TABLE guests (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index untuk search
CREATE INDEX idx_guests_slug ON guests(slug);
CREATE INDEX idx_guests_name ON guests(name);
```

### Jalankan di Supabase SQL Editor:
1. Login ke Supabase Dashboard
2. Pilih project Anda
3. Pergi ke **SQL Editor**
4. Buat **New Query** dan paste SQL di atas
5. Klik **Run**

---

## 2. Setup Routing (React Router)

Edit `src/App.tsx`:

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AdminPage } from '@/pages/AdminPage';
import { HeroSection } from '@/components/HeroSection';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<YourMainPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

## 3. Akses Admin Panel

```
http://localhost:8080/admin
atau
https://haikaldania-weddings-invitation.netlify.app/admin
```

---

## 4. Fitur Admin Panel

### ✅ Add Guest
- Input nama tamu
- Auto-generate slug dari nama
- Display slug preview

### ✅ Generate Link
- Auto-generate link undangan: `?guest={slug}`
- Copy link dengan 1 klik
- Sharable ke tamu

### ✅ Generate Pesan WhatsApp
- Template pesan otomatis
- Include link undangan
- Preview pesan
- Tombol "Kirim WhatsApp" (direct ke app)
- Tombol "Salin Pesan" (copy ke clipboard)

### ✅ Manage Guests
- Lihat semua tamu
- Edit tamu
- Hapus tamu
- Export CSV

### ✅ Export CSV
- Export semua data tamu
- Format: Nama, Slug, Link Undangan
- Download file untuk backup/import

---

## 5. Contoh Penggunaan

### Tambah Tamu
1. Pergi ke `/admin`
2. Input nama: "John Noel"
3. Klik "Tambah Tamu"
4. Slug auto-generate: "john-noel"
5. Link: `https://haikaldania-weddings-invitation.netlify.app/?guest=john-noel`

### Kirim WhatsApp
1. Klik "Kirim WhatsApp"
2. WhatsApp app terbuka dengan pesan pre-filled
3. Tamu tinggal klik send

### Salin Pesan
1. Klik "Salin Pesan"
2. Pesan tersalin ke clipboard
3. Paste ke mana saja (WhatsApp, Email, SMS, dll)

### Export Data
1. Klik "Export CSV"
2. File CSV download
3. Bisa import ke spreadsheet/database lain

---

## 6. Security (Optional)

Untuk production, tambahkan authentication:

```sql
-- Setup RLS (Row Level Security)
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only authenticated users can access guests"
  ON guests
  FOR ALL
  USING (auth.uid() IS NOT NULL);
```

---

## 7. Customization

### Edit Template Pesan
File: `src/services/messageService.ts`

Edit fungsi `generateInvitationMessage()` untuk customize template.

### Edit Admin UI
File: `src/pages/AdminPage.tsx`

Tambah/edit form fields, tampilan, dll sesuai kebutuhan.

---

## 8. Troubleshooting

| Issue | Solusi |
|-------|--------|
| Guests tidak muncul | Cek Supabase connection di `.env.local` |
| WhatsApp tidak buka | Install WhatsApp di device / cek nomor format |
| Link tidak jalan | Pastikan domain Netlify sudah benar di messageService |
| Export CSV tidak work | Check browser console untuk error |

---

**Done!** Admin panel sudah siap digunakan 🎉

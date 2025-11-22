import { useState, useMemo, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { Copy, Download, MessageCircle, Plus, Trash2, Edit2, Search, ChevronLeft, ChevronRight, Upload } from 'lucide-react';
import { useGuests } from '@/hooks/useGuests';
import {generateInvitationUrl, generateSlug} from '@/services/guestService';
import {generateInvitationMessage, generateWhatsAppLinkWithPhone,copyToClipboard,
} from '@/services/messageService';
import * as XLSX from 'xlsx';

export const AdminPage = () => {
  const { guests, isLoading, error, createGuest, removeGuest, refetch } = useGuests();
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isImporting, setIsImporting] = useState(false);
  const itemsPerPage = 10;
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter guests based on search query
  const filteredGuests = useMemo(() => {
    if (!searchQuery.trim()) {
      return guests;
    }
    const query = searchQuery.toLowerCase();
    return guests.filter((guest) =>
      guest.name.toLowerCase().includes(query)
    );
  }, [guests, searchQuery]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredGuests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedGuests = filteredGuests.slice(startIndex, endIndex);

  // Reset to page 1 when search query changes
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('Nama tamu harus diisi');
      return;
    }

    setIsSubmitting(true);

    try {
      await createGuest(name.trim() || undefined);
      toast.success('Tamu berhasil ditambahkan');
      setName('');
    } catch (err) {
      toast.error('Gagal menambahkan tamu');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Yakin ingin menghapus tamu ini?')) return;

    const success = await removeGuest(id);
    if (success) {
      toast.success('Tamu berhasil dihapus');
    } else {
      toast.error('Gagal menghapus tamu');
    }
  };

  const handleCopyUrl = async (slug: string) => {
    const url = generateInvitationUrl(slug);
    const success = await copyToClipboard(url);
    if (success) {
      toast.success('Link undangan disalin');
    } else {
      toast.error('Gagal menyalin link');
    }
  };

  const handleCopyMessage = async (name: string, slug: string) => {
    const url = generateInvitationUrl(slug);
    const { text } = generateInvitationMessage(name, url);
    const success = await copyToClipboard(text);
    if (success) {
      toast.success('Pesan disalin');
    } else {
      toast.error('Gagal menyalin pesan');
    }
  };

  const handleSendWhatsApp = (name: string, slug: string) => {
    const url = generateInvitationUrl(slug);
    const { text } = generateInvitationMessage(name, url);
    const whatsappLink = generateWhatsAppLinkWithPhone(text);
    window.open(whatsappLink, '_blank');
  };

  const handleExportCSV = () => {
    const headers = ['Nama', 'Nomor WhatsApp', 'Slug', 'Link Undangan'];
    const rows = guests.map((guest) => [
      guest.name,
      guest.slug,
      generateInvitationUrl(guest.slug),
    ]);

    const csv = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `undangan-${new Date().getTime()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('File CSV berhasil diunduh');
  };

  const handleImportExcel = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      toast.error('File harus berformat Excel (.xlsx atau .xls)');
      return;
    }

    setIsImporting(true);

    try {
      const fileReader = new FileReader();
      
      fileReader.onload = async (event) => {
        try {
          const data = event.target?.result;
          if (!data) {
            throw new Error('Gagal membaca file');
          }

          // Parse Excel file
          const workbook = XLSX.read(data, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          
          // Convert to JSON
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as unknown[][];

          if (jsonData.length === 0) {
            toast.error('File Excel kosong');
            setIsImporting(false);
            return;
          }

          // Find the 'nama' column index (case-insensitive)
          const headerRow = jsonData[0];
          const namaIndex = headerRow.findIndex(
            (cell: unknown) => cell && String(cell).toLowerCase().trim() === 'nama'
          );

          if (namaIndex === -1) {
            toast.error('Kolom "nama" tidak ditemukan di file Excel');
            setIsImporting(false);
            return;
          }

          // Extract names from the 'nama' column (skip header row)
          const names: string[] = [];
          for (let i = 1; i < jsonData.length; i++) {
            const row = jsonData[i];
            if (row && row[namaIndex]) {
              const name = String(row[namaIndex]).trim();
              if (name) {
                names.push(name);
              }
            }
          }

          if (names.length === 0) {
            toast.error('Tidak ada nama yang ditemukan di kolom "nama"');
            setIsImporting(false);
            return;
          }

          // Create guests for each name
          let successCount = 0;
          let errorCount = 0;

          for (const name of names) {
            try {
              await createGuest(name);
              successCount++;
            } catch (err) {
              errorCount++;
              console.error(`Gagal menambahkan ${name}:`, err);
            }
          }

          // Show result
          if (successCount > 0) {
            toast.success(`Berhasil mengimport ${successCount} tamu${errorCount > 0 ? ` (${errorCount} gagal)` : ''}`);
          } else {
            toast.error('Gagal mengimport semua tamu');
          }

          // Reset file input
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        } catch (err) {
          console.error('Error processing Excel file:', err);
          toast.error('Gagal memproses file Excel');
        } finally {
          setIsImporting(false);
        }
      };

      fileReader.onerror = () => {
        toast.error('Gagal membaca file');
        setIsImporting(false);
      };

      fileReader.readAsBinaryString(file);
    } catch (err) {
      console.error('Error importing Excel:', err);
      toast.error('Gagal mengimport file Excel');
      setIsImporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-2">
            Admin Panel Undangan
          </h1>
          <p className="text-muted-foreground">Kelola tamu undangan dan generate link undangan</p>
        </div>

        {/* Add Guest Form */}
        <Card className="p-8 shadow-elegant border-border/50 mb-8">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-6">Tambah Tamu Baru</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground">
                  Nama Tamu *
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Contoh: John Noel"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-border"
                  required
                />
                {name && (
                  <p className="text-sm text-muted-foreground">
                    Slug: <span className="font-mono font-semibold">{generateSlug(name)}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-4 flex-wrap">
              <Button
                type="submit"
                className="w-fit bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={isSubmitting}
              >
                <Plus className="w-4 h-4 mr-2" />
                {isSubmitting ? 'Menambahkan...' : 'Tambah Tamu'}
              </Button>

              {/* Import Excel Button */}
              <div className="relative">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleImportExcel}
                  className="hidden"
                  id="excel-import"
                  disabled={isImporting}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isImporting}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {isImporting ? 'Mengimport...' : 'Import Excel'}
                </Button>
              </div>
            </div>
          </form>
        </Card>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Export Button */}
        <div className="mb-6">
          <Button
            onClick={handleExportCSV}
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10"
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>

        {/* Guests List */}
        <div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <h2 className="text-2xl font-serif font-bold text-foreground">
              Daftar Tamu ({filteredGuests.length}{searchQuery && ` dari ${guests.length}`})
            </h2>
            
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Cari nama tamu..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10 border-border"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Memuat data tamu...</p>
            </div>
          ) : guests.length === 0 ? (
            <Card className="p-12 text-center border-border/50">
              <p className="text-muted-foreground">Belum ada tamu yang ditambahkan</p>
            </Card>
          ) : filteredGuests.length === 0 ? (
            <Card className="p-12 text-center border-border/50">
              <p className="text-muted-foreground">Tidak ada tamu yang sesuai dengan pencarian "{searchQuery}"</p>
            </Card>
          ) : (
            <>
            <div className="space-y-4">
              {paginatedGuests.map((guest) => {
                const invitationUrl = generateInvitationUrl(guest.slug);
                const { text: messageText } = generateInvitationMessage(guest.name, invitationUrl);

                return (
                  <Card key={guest.id} className="p-6 border-border/50 hover:shadow-elegant transition-all">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-serif font-bold text-foreground">
                            {guest.name}
                          </h3>
                        </div>
                        <Button
                          onClick={() => handleDelete(guest.id)}
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Slug & Link */}
                      <div className="bg-muted p-4 rounded-lg space-y-3">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Slug:</p>
                          <div className="flex items-center gap-2">
                            <code className="flex-1 text-sm font-mono text-foreground bg-background p-2 rounded">
                              {guest.slug}
                            </code>
                          </div>
                        </div>

                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Link Undangan:</p>
                          <div className="flex items-center gap-2">
                            <code className="flex-1 text-sm font-mono text-foreground bg-background p-2 rounded break-all">
                              {invitationUrl}
                            </code>
                            <Button
                              onClick={() => handleCopyUrl(guest.slug)}
                              size="sm"
                              variant="outline"
                              className="border-primary text-primary hover:bg-primary/10"
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 flex-wrap">
                        <Button
                          onClick={() => handleCopyMessage(guest.name, guest.slug)}
                          size="sm"
                          variant="outline"
                          className="border-blue-500 text-blue-600 hover:bg-blue-50"
                        >
                          <Copy className="w-4 h-4 mr-1" />
                          Salin Pesan
                        </Button>

                          <Button
                            onClick={() => handleSendWhatsApp(guest.name, guest.slug)}
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <MessageCircle className="w-4 h-4 mr-1" />
                            Kirim WhatsApp
                          </Button>
                      </div>

                      {/* Message Preview */}
                      <details className="group">
                        <summary className="cursor-pointer text-sm text-primary hover:underline">
                          👁️ Preview Pesan
                        </summary>
                        <div className="mt-3 p-3 bg-background rounded border border-border/50 text-sm text-foreground whitespace-pre-wrap font-sans leading-relaxed max-h-80 overflow-y-auto">
                          {messageText}
                        </div>
                      </details>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6 px-2">
                <div className="text-sm text-muted-foreground">
                  Menampilkan {startIndex + 1} - {Math.min(endIndex, filteredGuests.length)} dari {filteredGuests.length} tamu
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    variant="outline"
                    size="sm"
                    className="border-border"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Sebelumnya
                  </Button>
                  
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium text-foreground px-2">
                      Halaman {currentPage} dari {totalPages}
                    </span>
                  </div>
                  
                  <Button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    variant="outline"
                    size="sm"
                    className="border-border"
                  >
                    Selanjutnya
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

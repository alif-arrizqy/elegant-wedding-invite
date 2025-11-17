import { HeroSectionData, EventSectionData, CoupleSectionData } from '@/constant/WeddingData';

export interface InvitationMessage {
  text: string;
  whatsappLink: string;
}

/**
 * Encode message menggunakan encodeURIComponent (paling stabil untuk WhatsApp)
 */
const encodeWhatsAppMessage = (text: string): string => {
  return encodeURIComponent(text);
};

/**
 * Generate template pesan undangan
 */
export const generateInvitationMessage = (guestName: string, invitationUrl: string): InvitationMessage => {
  const message = `Assalamualaikum Wr. Wb.
Kepada Yth.
Bapak/Ibu/Saudara/i
*${guestName}*
di tempat

Bismillahirrahmanirrahim.
Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami.

📅 ${EventSectionData.akad.date}
🕒 ${EventSectionData.akad.time}
📍 ${EventSectionData.akad.location}

Silakan kunjungi link undangan digital kami:
${invitationUrl}

Kehadiran Bapak/Ibu/Saudara/i sangat berarti bagi kami.

Atas perhatiannya kami ucapkan terima kasih.
Wassalamualaikum Wr. Wb.

Kami yang berbahagia,
*${CoupleSectionData.groom.name} & ${CoupleSectionData.bride.name}*`;

  const whatsappLink = `https://api.whatsapp.com/send?text=${encodeWhatsAppMessage(message)}`;

  return {
    text: message,
    whatsappLink,
  };
};

/**
 * Generate WhatsApp link dengan format API (lebih stabil)
 */
export const generateWhatsAppLinkWithPhone = (message: string): string => {
  return `https://api.whatsapp.com/send?text=${encodeWhatsAppMessage(message)}`;
};

/**
 * Copy text ke clipboard
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
};

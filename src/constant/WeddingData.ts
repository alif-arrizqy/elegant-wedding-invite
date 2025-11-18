import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import groomImage from "@/assets/groom.jpg";
import brideImage from "@/assets/bride.jpg";

// Hero section data
export const HeroSectionData = {
    groomName: "Haikal",
    brideName: "Dania",
    weddingDate: "01 Januari 2026",
    countDownWeddingDate: new Date("2026-01-01T09:00:00"),
};

// Mempelai section data
export const CoupleSectionData = {
    groom: {
        name: "Muhamad Haikal Husein",
        detail: "Putra kedua dari Bapak Budi & Ibu Siti",
        instagram: "https://www.instagram.com/hy_call/",
        img: {
            src: groomImage,
            alt: "Haikal - Mempelai Pria"
        }
    },
    bride: {
        name: "Dania",
        detail: "Putri pertama dari Bapak Ahmad & Ibu Lina",
        instagram: "https://www.instagram.com/daniaa228/",
        img: {
            src: brideImage,
            alt: "Dania - Mempelai Wanita"
        }
    }
};

// Acara section data
export const EventSectionData = {
    akad: {
        date: "Senin, 01 Januari 2026",
        time: "09.00 - 10.00 WIB",
        location: "Masjid Agung Kota Wisata",
        mapUrl: "https://maps.app.goo.gl/MEZ8ZSgHpXEchAUK8",
    },
    resepsi: {
        date: "Senin, 01 Januari 2026",
        time: "11.00 - 14.00 WIB",
        location: "Gedung Serbaguna Kota Wisata",
        mapUrl: "https://maps.app.goo.gl/af29vwpFhaynW7BX8",
    },
};

// Gallery section data
export const GallerySectionData = [
    { src: gallery1, alt: "Romantic couple holding hands" },
    { src: gallery2, alt: "Wedding couple laughing together" },
    { src: gallery3, alt: "Bride's bouquet" },
    { src: gallery4, alt: "First dance" },
    { src: gallery5, alt: "Wedding rings" },
    { src: gallery6, alt: "Walking hand in hand" },
];

// RSVP section data
export const WishSectionData = [
    {
        id: 1,
        name: "Sarah & Michael",
        message:
            "Selamat menempuh hidup baru! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. ❤️",
        timestamp: new Date(Date.now() - 86400000),
    },
    {
        id: 2,
        name: "Jessica",
        message:
            "Congratulations! Wishing you both a lifetime of love and happiness together! 💕",
        timestamp: new Date(Date.now() - 172800000),
    }
];


// Gift section data
export const GiftSectionData = {
    bank1: {
        bankName: "Bank Central Asia (BCA)",
        accountNumber: "1234567890",
        accountHolder: "John Doe",
    },
    bank2: {
        bankName: "Bank Mandiri",
        accountNumber: "0987654321",
        accountHolder: "Jane Doe",
    },
    shippingAddress: {
        recipientName: "Haikal",
        address: "Jl. Merpati No. 45, Jakarta Selatan, 12345",
    }
};

// Footer section data
export const FooterSectionData = {
    coupleNames: "Haikal & Dania",
    quote: "Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu merasa tenteram kepadanya. Dia menjadikan di antaramu rasa cinta dan kasih sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.",
    quoteSource: "QS. Ar-Rum: 21",
};


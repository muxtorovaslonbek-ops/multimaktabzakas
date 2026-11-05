export interface Book {
  id: string; // URL uchun: /kutubxona/kitob-1
  title: string; // Kitob nomi
  author: string; // Muallif
  description: string; // Qisqa ta'rif
  category: string; // Toifa (masalan: Badiiy, Darslik)
  pages?: number; // Sahifalar soni (ixtiyoriy)
  cover: string; // Muqova rasmi: public/kitoblar/muqova/ ichida
  file: string; // PDF fayl: public/kitoblar/ ichida
  accent: string; // Muqova yo'q bo'lsa fon rangi
}

// ⬇️ FAQAT SHU RO'YXATNI O'ZGARTIRASIZ: nom, muallif, ta'rif va fayl nomlari
export const books: Book[] = [
  {
    id: "kitob-1",
    title: "1-kitob nomi",
    author: "Muallif ismi",
    description: "Kitob haqida 1-2 gaplik qisqa ma’lumot.",
    category: "Badiiy adabiyot",
    pages: 120,
    cover: "/kitoblar/muqova/kitob-1.jpg",
    file: "/kitoblar/kitob-1.pdf",
    accent: "from-indigo-500 to-purple-600",
  },
  {
    id: "kitob-2",
    title: "2-kitob nomi",
    author: "Muallif ismi",
    description: "Kitob haqida 1-2 gaplik qisqa ma’lumot.",
    category: "Darslik",
    pages: 90,
    cover: "/kitoblar/muqova/kitob-2.jpg",
    file: "/kitoblar/kitob-2.pdf",
    accent: "from-sky-500 to-cyan-600",
  },
  {
    id: "kitob-3",
    title: "3-kitob nomi",
    author: "Muallif ismi",
    description: "Kitob haqida 1-2 gaplik qisqa ma’lumot.",
    category: "Ilmiy-ommabop",
    pages: 150,
    cover: "/kitoblar/muqova/kitob-3.jpg",
    file: "/kitoblar/kitob-3.pdf",
    accent: "from-emerald-500 to-teal-600",
  },
  {
    id: "kitob-4",
    title: "4-kitob nomi",
    author: "Muallif ismi",
    description: "Kitob haqida 1-2 gaplik qisqa ma’lumot.",
    category: "Bolalar uchun",
    pages: 60,
    cover: "/kitoblar/muqova/kitob-4.jpg",
    file: "/kitoblar/kitob-4.pdf",
    accent: "from-orange-500 to-rose-600",
  },
];

export const getBook = (id: string) => books.find((b) => b.id === id);

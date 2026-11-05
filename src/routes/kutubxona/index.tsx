import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, BookOpen, Library, ChevronRight } from "lucide-react";
import logo from "@/assets/logo.png";
import { books, type Book } from "@/data/books";

export const Route = createFileRoute("/kutubxona/")({
  head: () => ({
    meta: [
      { title: "Kutubxona — Navoiy shahar 8-maktab" },
      {
        name: "description",
        content: "Navoiy 8-maktab elektron kutubxonasi: kitoblarni onlayn o‘qing.",
      },
    ],
  }),
  component: KutubxonaPage,
});

function Cover({ book }: { book: Book }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        className={`flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br ${book.accent} p-4 text-center text-white`}
      >
        <BookOpen className="h-10 w-10 opacity-90" />
        <span className="text-sm font-bold leading-snug">{book.title}</span>
      </div>
    );
  }
  return (
    <img
      src={book.cover}
      alt={`${book.title} muqovasi`}
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
    />
  );
}

function KutubxonaPage() {
  return (
    <div className="min-h-screen bg-app font-sans text-ink pb-16">
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 px-4 py-4 backdrop-blur-md sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center gap-4">
          <Link
            to="/"
            className="flex cursor-pointer items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-sm font-semibold shadow-sm transition hover:bg-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Bosh sahifa</span>
          </Link>
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-9 w-9" />
            <div className="hidden sm:block">
              <h1 className="text-sm font-bold tracking-tight">Navoiy shahar 8-maktab</h1>
              <p className="text-xs text-muted-foreground">Elektron kutubxona</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-8 px-4 pt-8 sm:px-8">
        <section className="rounded-3xl border border-border bg-gradient-to-br from-indigo-900/10 via-card to-background p-6 shadow-lg sm:p-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-100/80 px-3 py-1 text-xs font-bold text-indigo-700">
            <Library className="h-3.5 w-3.5" />
            <span>Kutubxona</span>
          </div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Kitoblarni onlayn o‘qing
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Kitob muqovasini bosing va o‘qishni boshlang. Istasangiz, kitobni yuklab olishingiz
            ham mumkin.
          </p>
        </section>

        <section className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {books.map((book) => (
            <Link
              key={book.id}
              to="/kutubxona/$book"
              params={{ book: book.id }}
              className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="aspect-[3/4] w-full overflow-hidden bg-muted">
                <Cover book={book} />
              </div>
              <div className="flex flex-1 flex-col gap-1 p-4">
                <span className="text-[11px] font-bold uppercase tracking-wide text-indigo-600">
                  {book.category}
                </span>
                <h3 className="text-base font-extrabold leading-snug">{book.title}</h3>
                <p className="text-xs text-muted-foreground">{book.author}</p>
                <span className="mt-auto flex items-center gap-1 pt-3 text-sm font-semibold text-indigo-600">
                  O‘qish <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
}

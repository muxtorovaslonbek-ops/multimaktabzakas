import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Download, ExternalLink } from "lucide-react";
import { getBook } from "@/data/books";

export const Route = createFileRoute("/kutubxona/$book")({
  loader: ({ params }) => {
    const book = getBook(params.book);
    if (!book) throw notFound();
    return { book };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.book.title ?? "Kitob"} — Kutubxona` },
      { name: "description", content: loaderData?.book.description ?? "" },
    ],
  }),
  component: BookReader,
});

function BookReader() {
  const { book } = Route.useLoaderData();

  return (
    <div className="flex h-screen flex-col bg-app font-sans text-ink">
      <header className="z-30 flex flex-wrap items-center justify-between gap-3 border-b border-border bg-background/90 px-4 py-3 backdrop-blur-md sm:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            to="/kutubxona"
            className="flex shrink-0 cursor-pointer items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-sm font-semibold shadow-sm transition hover:bg-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Kutubxona</span>
          </Link>
          <div className="min-w-0">
            <h1 className="truncate text-sm font-extrabold sm:text-base">{book.title}</h1>
            <p className="truncate text-xs text-muted-foreground">{book.author}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={book.file}
            target="_blank"
            rel="noreferrer"
            className="flex cursor-pointer items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-xs font-semibold shadow-sm transition hover:bg-accent"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span>Yangi oynada</span>
          </a>
          <a
            href={book.file}
            download
            className="flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-3.5 py-2 text-xs font-bold text-white shadow-md transition hover:scale-105"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Yuklab olish</span>
          </a>
        </div>
      </header>

      <div className="flex-1 bg-muted">
        <object
          data={`${book.file}#view=FitH`}
          type="application/pdf"
          className="h-full w-full"
          aria-label={book.title}
        >
          {/* Telefonda PDF ko'rinmasa shu xabar chiqadi */}
          <div className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
            <p className="max-w-sm text-sm text-muted-foreground">
              Bu qurilmada kitobni sahifa ichida ko‘rsatib bo‘lmadi. Pastdagi tugma orqali oching.
            </p>
            <a
              href={book.file}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-md"
            >
              Kitobni ochish
            </a>
          </div>
        </object>
      </div>
    </div>
  );
}

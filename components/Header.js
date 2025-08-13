import Link from "next/link";

export default function Header({ cartCount = 0, query, setQuery }) {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-2xl bg-emerald-500 text-white grid place-items-center font-bold">SK</div>
          <Link href="/" className="font-semibold text-lg">Shahkart</Link>
          <span className="hidden sm:inline text-xs text-gray-500 border-l pl-2 ml-2">Shahkot’s own online bazaar</span>
        </div>
        <div className="ml-auto flex-1 max-w-xl">
          <input
            className="w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
            placeholder="Search groceries, fashion, electronics…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Link href="/cart" className="ml-3 relative rounded-xl border px-3 py-2 text-sm hover:bg-gray-100">
          Cart
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 h-5 min-w-[20px] text-xs px-1 grid place-items-center rounded-full bg-emerald-500 text-white">{cartCount}</span>
          )}
        </Link>
      </div>
    </header>
  );
}

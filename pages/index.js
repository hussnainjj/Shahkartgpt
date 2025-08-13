import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";

const categories = ["All", "Groceries", "Fashion", "Electronics", "Local Special"];

export default function Home() {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("All");
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // load products from public data file
    fetch("/data/products.json").then((res) => res.json()).then(setProducts);
    const saved = localStorage.getItem("shahkart_cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("shahkart_cart", JSON.stringify(cart));
  }, [cart]);

  const filtered = useMemo(() => {
    return products.filter((p) =>
      (activeCat === "All" || p.category === activeCat) &&
      p.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [products, activeCat, query]);

  function addToCart(product) {
    setCart((prev) => {
      const found = prev.find((item) => item.id === product.id);
      if (found) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          qty: 1,
          price: product.price,
          name: product.name,
          img: product.img,
        },
      ];
    });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartCount={cart.reduce((s, x) => s + x.qty, 0)}
        query={query}
        setQuery={setQuery}
      />

      {/* Hero section */}
      <section className="max-w-6xl mx-auto px-4 py-6">
        <div className="rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-700 text-white p-6 flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold">Fast local delivery in Shahkot</h1>
            <p className="text-white/90 mt-2">
              Order from trusted local shops. Cash on delivery, easy returns, same-day options.
            </p>
          </div>
          <div className="flex gap-2">
            <button className="bg-white text-emerald-700 rounded-xl px-4 py-2 text-sm font-medium hover:bg-white/90">
              Shop Groceries
            </button>
            <button className="bg-white/10 border border-white/30 rounded-xl px-4 py-2 text-sm font-medium hover:bg-white/20">
              Become a Seller
            </button>
          </div>
        </div>
      </section>

      {/* Category buttons */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCat(c)}
              className={`px-3 py-1.5 rounded-full border text-sm whitespace-nowrap ${
                activeCat === c
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "hover:bg-gray-100"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Product grid */}
      <main className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={addToCart} />
        ))}
      </main>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="max-w-6xl mx-auto px-4 py-6 text-xs text-gray-500 flex flex-col sm:flex-row gap-2 sm:gap-6">
          <div>© {new Date().getFullYear()} Shahkart — Serving Shahkot</div>
          <div className="sm:ml-auto">COD • WhatsApp orders • Same-day delivery</div>
        </div>
      </footer>
    </div>
  );
}

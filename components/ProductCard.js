export default function ProductCard({ product, onAdd }) {
  return (
    <article className="group rounded-2xl border bg-white overflow-hidden hover:shadow-sm transition">
      <div className="aspect-square overflow-hidden">
        <img src={product.img} alt={product.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform"/>
      </div>
      <div className="p-3">
        <h3 className="text-sm font-medium line-clamp-2">{product.name}</h3>
        <div className="mt-1 text-emerald-700 font-semibold">PKR {product.price.toLocaleString()}</div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-gray-500">{product.category}</span>
          <button onClick={() => onAdd(product)} className="rounded-lg bg-emerald-600 text-white text-xs px-3 py-1.5 hover:bg-emerald-700">Add to cart</button>
        </div>
      </div>
    </article>
  );
}

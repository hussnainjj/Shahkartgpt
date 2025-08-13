import { useEffect, useState } from "react";
import Header from "@/components/Header";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("shahkart_cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("shahkart_cart", JSON.stringify(cart));
  }, [cart]);

  function updateQty(id, delta) {
    setCart((prev) =>
      prev.flatMap((item) => {
        if (item.id === id) {
          const newQty = item.qty + delta;
          return newQty < 1 ? [] : [{ ...item, qty: newQty }];
        }
        return [item];
      })
    );
  }

  function clearCart() {
    setCart([]);
  }

  const subtotal = cart.reduce((s, item) => s + item.price * item.qty, 0);

  function handleCheckout(e) {
    e.preventDefault();
    if (!name || !phone || !address) {
      alert("Please fill all fields");
      return;
    }
    const text = `New order on Shahkart:\n${cart
      .map((item) => `${item.name} x ${item.qty}`)
      .join("\n")}\nSubtotal: PKR ${subtotal}\nName: ${name}\nPhone: ${phone}\nAddress: ${address}`;
    const phoneNumber = "923001234567"; // replace with your WhatsApp number
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartCount={cart.reduce((s, x) => s + x.qty, 0)}
        query={""}
        setQuery={() => {}}
      />

      <div className="max-w-2xl mx-auto px-4 py-6">
        <h1 className="text-xl font-semibold mb-4">Your Cart</h1>
        {cart.length === 0 ? (
          <p className="text-sm text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 border p-3 rounded-xl bg-white"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="h-16 w-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="text-sm font-medium">{item.name}</div>
                  <div className="text-xs text-gray-500">
                    PKR {item.price.toLocaleString()} × {item.qty}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => updateQty(item.id, -1)}
                    className="h-8 w-8 border rounded-lg"
                  >
                    −
                  </button>
                  <span className="px-2">{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.id, 1)}
                    className="h-8 w-8 border rounded-lg"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between font-medium">
              <span>Subtotal:</span>
              <span>PKR {subtotal.toLocaleString()}</span>
            </div>
            <form onSubmit={handleCheckout} className="space-y-3">
              <input
                className="w-full border rounded-lg px-3 py-2 text-sm"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="w-full border rounded-lg px-3 py-2 text-sm"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <textarea
                className="w-full border rounded-lg px-3 py-2 text-sm"
                placeholder="Delivery address"
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <button
                type="submit"
                className="w-full bg-emerald-600 text-white rounded-lg py-2 text-sm font-medium hover:bg-emerald-700"
              >
                Checkout via WhatsApp
              </button>
              <button
                type="button"
                onClick={clearCart}
                className="w-full border rounded-lg py-2 text-sm"
              >
                Clear cart
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

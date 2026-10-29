import React, { useMemo, useState, useEffect } from "react";
import { ShoppingBag, ArrowLeft, Plus, Minus, Trash2, X } from "lucide-react";
import { img1_1, img1_2, img1_3,
  img2_1, img2_2, 
  img3_1, img3_2, img3_3,
  img4_1, img4_2, img4_3, img4_4, 
  img5_1, img5_2, img5_3,
  img6_1, img6_2, img6_3, img6_4} from './img/img_src.js';

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error("VITE_API_URL is not configured");
}


const products = [
  {
  id: 1,
  name: "Komplet Trenerke Oversize për Femra",
  subtitle: "Bluze me zinxhir dhe pantallona wide-leg",
  price: 20,
  category: "Të reja",
  image: img1_1,
  colors: ["#000000"],
  sizes: ["S", "M", "L", "XL"],
  description: "Komplet sportiv për femra, në ngjyrë të zezë, me bluzë oversize me zinxhir dhe pantallona të gjera. Stil modern dhe shumë i rehatshëm për përditshmëri."
},
  {
  id: 2,
  name: "Komplet Trenerke Oversize për Femra",
  subtitle: "Bluze me zinxhir dhe pantallona wide-leg",
  price: 20,
  category: "Të reja",
  image: img1_2,
  colors: ["#62021c"],
  sizes: ["S", "M", "L", "XL"],
  description: "Komplet sportiv për femra, në ngjyrë të roze, me bluzë oversize me zinxhir dhe pantallona të gjera. Stil modern dhe shumë i rehatshëm për përditshmëri."
},
  {
  id: 3,
  name: "Komplet Trenerke Oversize për Femra",
  subtitle: "Bluze me zinxhir dhe pantallona wide-leg",
  price: 20,
  category: "Të reja",
  image: img1_3,
  colors: ["#b8b8b8"],
  sizes: ["S", "M", "L", "XL"],
  description: "Komplet sportiv për femra, në ngjyrë të hiri, me bluzë oversize me zinxhir dhe pantallona të gjera. Stil modern dhe shumë i rehatshëm për përditshmëri."
},

{
  id: 4,
  name: "Jumpsuit Elegant për Femra",
  subtitle: "Model i ngushtë me mëngë të gjata",
  price: 15,
  category: "Të reja",
  image: img2_1,
  colors: ["#000000"],
  sizes: ["S", "M", "L", "XL"],
  description: "Jumpsuit për femra në ngjyrë të zezë, me prerje që thekson siluetën, dekolte katrore dhe mëngë të gjata. Ideal për një pamje elegante dhe moderne."
},
{
  id: 5,
  name: "Jumpsuit Elegant për Femra",
  subtitle: "Model i ngushtë me mëngë të gjata",
  price: 15,
  category: "Të reja",
  image: img2_2,
  colors: ["#3a1803"],
  sizes: ["S", "M", "L", "XL"],
  description: "Jumpsuit për femra në ngjyrë të kaft, me prerje që thekson siluetën, dekolte katrore dhe mëngë të gjata. Ideal për një pamje elegante dhe moderne."
},

{
  id: 6,
  name: "JumpsuitSportiv me Zinxhir për Femra",
  subtitle: "Jumpsuit elastik me mëngë të gjata",
  price: 15,
  category: "Të reja",
  image: img3_1,
  colors: ["#7a3f2d"],
  sizes: ["S", "M", "L", "XL"],
  description: "Jumpsuit sportiv për femra në ngjyrë kafe, me material elastik me vija të holla, mëngë të gjata dhe zinxhir përpara. Model modern që përshtatet bukur me trupin, ideal për përditshmëri dhe dalje casual."
},
{
  id: 7,
  name: "Jumpsuit Sportiv me Zinxhir për Femra",
  subtitle: "Jumpsuit elastik me mëngë të gjata",
  price: 15,
  category: "Të reja",
  image: img3_2,
  colors: ["#000000"],
  sizes: ["S", "M", "L", "XL"],
  description: "Jumpsuit sportiv për femra në ngjyrë zez, me material elastik me vija të holla, mëngë të gjata dhe zinxhir përpara. Model modern që përshtatet bukur me trupin, ideal për përditshmëri dhe dalje casual."
},
{
  id: 8,
  name: "Jumpsuit Sportiv me Zinxhir për Femra",
  subtitle: "Jumpsuit elastik me mëngë të gjata",
  price: 15,
  category: "Të reja",
  image: img3_3,
  colors: ["#2b0f08"],
  sizes: ["S", "M", "L", "XL"],
  description: "Kombinezon sportiv për femra në ngjyrë kafe e mbyllt, me material elastik me vija të holla, mëngë të gjata dhe zinxhir përpara. Model modern që përshtatet bukur me trupin, ideal për përditshmëri dhe dalje casual."
},

{
  id: 9,
  name: "Trenerka Oversize për Femra",
  subtitle: "Pantallona sportive wide-leg me bel elastik",
  price: 13,
  category: "Të reja",
  image: img4_3,
  colors: ["#000000"],
  sizes: ["S", "M", "L", "XL"],
  description: "Trenerka sportive për femra në ngjyrë zez, me bel elastik, lidhëse për rregullim dhe prerje të gjerë wide-leg. Model oversize, shumë i rehatshëm dhe modern, ideal për përditshmëri dhe kombinime casual."
},
{
  id: 10,
  name: "Trenerka Oversize për Femra",
  subtitle: "Pantallona sportive wide-leg me bel elastik",
  price: 13,
  category: "Të reja",
  image: img4_1,
  colors: ["#C9C9C9"],
  sizes: ["S", "M", "L", "XL"],
  description: "Trenerka sportive për femra në ngjyrë gri të çelët, me bel elastik, lidhëse për rregullim dhe prerje të gjerë wide-leg. Model oversize, shumë i rehatshëm dhe modern, ideal për përditshmëri dhe kombinime casual."
},
{
  id: 11,
  name: "Trenerka Oversize për Femra",
  subtitle: "Pantallona sportive wide-leg me bel elastik",
  price: 13,
  category: "Të reja",
  image: img4_2,
  colors: ["#470d0d"],
  sizes: ["S", "M", "L", "XL"],
  description: "Trenerka sportive për femra në ngjyrë rozë, me bel elastik, lidhëse për rregullim dhe prerje të gjerë wide-leg. Model oversize, shumë i rehatshëm dhe modern, ideal për përditshmëri dhe kombinime casual."
},
{
  id: 12,
  name: "Trenerka Oversize për Femra",
  subtitle: "Pantallona sportive wide-leg me bel elastik",
  price: 13,
  category: "Të reja",
  image: img4_4,
  colors: ["#371b0c"],
  sizes: ["S", "M", "L", "XL"],
  description: "Trenerka sportive për femra në ngjyrë kafe, me bel elastik, lidhëse për rregullim dhe prerje të gjerë wide-leg. Model oversize, shumë i rehatshëm dhe modern, ideal për përditshmëri dhe kombinime casual."
},
{
  id:13,
  name: "Set Dy Pjesësh Elegant për Femra",
  subtitle: "Bluzë me zinxhir dhe pantallona wide-leg",
  price: 18,
  category: "Të reja",
  image: img5_1,
  colors: ["#000000"],
  sizes: ["S", "M", "L", "XL"],
  description: "Set dy pjesësh për femra në ngjyrë zez, i përbërë nga bluzë e ngushtë me mëngë të gjata dhe zinxhir përpara, si dhe pantallona të gjera me bel të lartë. Stil modern dhe elegant, ideal për dalje dhe veshje casual chic."
},
{
  id: 14,
  name: "Set Dy Pjesësh Elegant për Femra",
  subtitle: "Bluzë me zinxhir dhe pantallona wide-leg",
  price: 18,
  category: "Të reja",
  image: img5_2,
  colors: ["#5f2b19"],
  sizes: ["S", "M", "L", "XL"],
  description: "Set dy pjesësh për femra në ngjyrë kafe, i përbërë nga bluzë e ngushtë me mëngë të gjata dhe zinxhir përpara, si dhe pantallona të gjera me bel të lartë. Stil modern dhe elegant, ideal për dalje dhe veshje casual chic."
},
{
  id: 15,
  name: "Set Dy Pjesësh Elegant për Femra",
  subtitle: "Bluzë me zinxhir dhe pantallona wide-leg",
  price: 18,
  category: "Të reja",
  image: img5_3,
  colors: ["#FFFFFF"],
  sizes: ["S", "M", "L", "XL"],
  description: "Set dy pjesësh për femra në ngjyrë të bardhë, i përbërë nga bluzë e ngushtë me mëngë të gjata dhe zinxhir përpara, si dhe pantallona të gjera me bel të lartë. Stil modern dhe elegant, ideal për dalje dhe veshje casual chic."
},

{
  id: 16,
  name: "Set Sportiv 3-Pjesësh për Femra",
  subtitle: "Set elastik me top, streçe dhe xhaketë të shkurtër",
  price: 18,
  category: "Të reja",
  image: img6_1,
  colors: ["#000000"],
  sizes: ["S", "M", "L", "XL"],
  description: "Set sportiv për femra në ngjyrë të zezë, i përbërë nga top i shkurtër, streçe elastike me bel të lartë dhe xhaketë e shkurtër me mëngë të gjata. Material i rehatshëm që përshtatet bukur me trupin, me dizajn modern dhe elegant. Ideal për palestër, aktivitete sportive dhe kombinime casual të përditshme."
},
{
  id: 17,
  name: "Set Sportiv 3-Pjesësh për Femra",
  subtitle: "Set elastik me top, streçe dhe xhaketë të shkurtër",
  price: 18,
  category: "Të reja",
  image: img6_2,
  colors: ["#43240f"],
  sizes: ["S", "M", "L", "XL"],
  description: "Set sportiv për femra në ngjyrë kafe, i përbërë nga top i shkurtër, streçe elastike me bel të lartë dhe xhaketë e shkurtër me mëngë të gjata. Material i rehatshëm që përshtatet bukur me trupin, me dizajn modern dhe elegant. Ideal për palestër, aktivitete sportive dhe kombinime casual të përditshme."
},
{
  id: 18,
  name: "Set Sportiv 3-Pjesësh për Femra",
  subtitle: "Set elastik me top, streçe dhe xhaketë të shkurtër",
  price: 18,
  category: "Të reja",
  image: img6_3,
  colors: ["#eee6c4"],
  sizes: ["S", "M", "L", "XL"],
  description: "Set sportiv për femra në ngjyrë të kremt, i përbërë nga top i shkurtër, streçe elastike me bel të lartë dhe xhaketë e shkurtër me mëngë të gjata. Material i rehatshëm që përshtatet bukur me trupin, me dizajn modern dhe elegant. Ideal për palestër, aktivitete sportive dhe kombinime casual të përditshme."
},
{
  id: 19,
  name: "Set Sportiv 3-Pjesësh për Femra",
  subtitle: "Set elastik me top, streçe dhe xhaketë të shkurtër",
  price: 18,
  category: "Të reja",
  image: img6_4,
  colors: ["#521717"],
  sizes: ["S", "M", "L", "XL"],
  description: "Set sportiv për femra në ngjyrë rozë, i përbërë nga top i shkurtër, streçe elastike me bel të lartë dhe xhaketë e shkurtër me mëngë të gjata. Material i rehatshëm që përshtatet bukur me trupin, me dizajn modern dhe elegant. Ideal për palestër, aktivitete sportive dhe kombinime casual të përditshme."
}
];

function Header({ cartCount, onOpenCart, onHome }) {
  return (
    <header className="site-header">
      <button className="wordmark" onClick={onHome} aria-label="BellaFashion - ballina">
        BellaFashion
      </button>
      <button className="bag-button" onClick={onOpenCart} aria-label="Hape shportën">
        <ShoppingBag size={24} strokeWidth={1.5} />
        {cartCount > 0 && <span className="bag-count">{cartCount}</span>}
      </button>
    </header>
  );
}

function ProductCard({ product, onSelect }) {
  return (
    <button className="product-card" onClick={() => onSelect(product)} aria-label={`Shiko ${product.name}`}>
      <img src={product.image} alt={product.name} loading="lazy" />
      <span className="product-card-name">{product.name}</span>
      <span className="product-card-price">{product.price}€</span>
    </button>
  );
}

function ProductDetail({ product, onBack, onAdd }) {
  const [color, setColor] = useState(0);
  const [size, setSize] = useState("M");
  const [added, setAdded] = useState(false);

  function addToCart() {
    onAdd(product, product.colors[color], size);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  }

  return (
    <main className="detail-page">
      <button className="back-link" onClick={onBack}><ArrowLeft size={16} /> Kthehu te produktet</button>
      <div className="detail-layout">
        <div className="detail-image-wrap">
          <img className="detail-image" src={product.image} alt={product.name} />
        </div>
        <section className="detail-info">
          {/* <p className="eyebrow">BELLA FASHION / KOLEKSIONI I RI</p> */}
          <h1>{product.name}</h1>
          <p className="subtitle">{product.subtitle}</p>
          <p className="detail-description">{product.description}</p>
          <div className="detail-price">Çmimi: <strong>{product.price}€</strong></div>

          <div className="option-label">Ngjyra</div>
          <div className="color-options">
            {product.colors.map((item, index) => (
              <button
                key={item}
                className={`color-dot ${color === index ? "selected" : ""}`}
                style={{ backgroundColor: item }}
                onClick={() => setColor(index)}
                aria-label={`Zgjedh ngjyrën ${index + 1}`}
              />
            ))}
          </div>

          <div className="option-label">Madhësia</div>
          <div className="size-options">
            {product.sizes.map((item) => (
              <button key={item} className={size === item ? "size-option selected" : "size-option"} onClick={() => setSize(item)}>
                {item}
              </button>
            ))}
          </div>
          <button className="primary-button add-button" onClick={addToCart}>
            {added ? "U shtua në shportë ✓" : "SHTO NË SHPORTË"}
          </button>
        </section>
      </div>
    </main>
  );
}

function CartPage({ cart, onBack, onChangeQty, onRemove, onCheckout }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <main className="content-page">
      <button className="back-link" onClick={onBack}><ArrowLeft size={16} /> Vazhdo blerjen</button>
      <h1 className="page-title">Shporta ime</h1>
      {cart.length === 0 ? (
        <div className="empty-state">
          <ShoppingBag size={38} strokeWidth={1.2} />
          <p>Shporta jote është ende e zbrazët.</p>
          <button className="primary-button" onClick={onBack}>SHIKO PRODUKTET</button>
        </div>
      ) : (
        <>
          <div className="cart-list">
            {cart.map((item) => (
              <article className="cart-item" key={`${item.id}-${item.color}-${item.size}`}>
                <img src={item.image} alt={item.name} />
                <div className="cart-item-info">
                  <h2>{item.name}</h2>
                  <p>Madhësia: {item.size}</p>
                  <p className="cart-item-price">{item.price}€</p>
                  <div className="quantity-control">
                    <button onClick={() => onChangeQty(item, -1)} aria-label="Zvogëlo sasinë"><Minus size={14} /></button>
                    <span>{item.qty}</span>
                    <button onClick={() => onChangeQty(item, 1)} aria-label="Rrit sasinë"><Plus size={14} /></button>
                  </div>
                </div>
                <button className="remove-button" onClick={() => onRemove(item)} aria-label="Largo produktin"><Trash2 size={17} /></button>
              </article>
            ))}
          </div>
          <div className="cart-summary">
            <span>Totali</span><strong>{total}€</strong>
          </div>
          <button className="primary-button full-button" onClick={onCheckout}>VAZHDO TE POROSIA</button>
        </>
      )}
    </main>
  );
}

function CheckoutPage({ cart, onBack, onOrder }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", city: "" });
  const [error, setError] = useState("");

  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  async function submit(event) {
  event.preventDefault();

  if (cart.length === 0) {
    setError("Your cart is empty.");
    return;
  }

  setError("");

  try {
    await onOrder(form);
  } catch (err) {
    setError(err.message || "Could not submit order.");
  }
}

  return (
    <main className="content-page checkout-page">
      <button className="back-link" onClick={onBack}><ArrowLeft size={16} /> Kthehu te shporta</button>
      <h1 className="page-title">Përfundo porosinë</h1>
      <p className="payment-note">Sigurohuni që të dhënat tuaja janë të sakta.
          </p>
      <div className="checkout-layout">
        
        <form className="checkout-form" onSubmit={submit}>
          <label>Emri dhe mbiemri<input name="name" value={form.name} onChange={update} placeholder="Shkruaj emrin" required /></label>
          <label>Numri i telefonit<input name="phone" value={form.phone} onChange={update} placeholder="04X XXX XXX" inputMode="tel" required /></label>
          <label>Email<input name="email" type="email" value={form.email} onChange={update} placeholder="email@example.com" required/></label>
          <label>Adresa<input name="address" value={form.address} onChange={update} placeholder="Rruga dhe numri" required /></label>
          <label>Vendbanimi<input name="city" value={form.city} onChange={update} placeholder="Prishtinë" required /></label>
          {error && <p className="form-error">{error}</p>}
          <button className="primary-button full-button" type="submit">DËRGO POROSINË</button>
          <p className="payment-note">Pagesa bëhet përmes postës, sipas marrëveshjes me shitësin.<br></br>
           Posta për KS 2€ <br></br> Posta për MK 5€ <br></br>  Posta për Al 5€
          </p>
        </form>
        <aside className="order-summary">
          <h2>Përmbledhja</h2>
          {cart.map((item) => (
            <div className="summary-line" key={`${item.id}-${item.color}-${item.size}`}>
              <span>{item.name} × {item.qty}</span><span>{item.price * item.qty}€</span>
            </div>
          ))}
          <div className="summary-total"><span>Totali</span><strong>{cart.reduce((sum, item) => sum + item.price * item.qty, 0)}€</strong>
          
          + POSTA</div>
        </aside>
      </div>
    </main>
  );
}
const CART_STORAGE_KEY = "bellaFashionCart";

function usePersistentCart() {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error loading cart:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  }, [cart]);

  return [cart, setCart];
}

function App() {
  const [page, setPage] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [cart, setCart] = usePersistentCart();
  const [category, setCategory] = useState("Të gjitha");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const visibleProducts = useMemo(
    () => category === "Të gjitha" ? products : products.filter((product) => product.category === category),
    [category]
  );
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  function addToCart(product, color, size) {
    const keyMatch = (item) => item.id === product.id && item.color === color && item.size === size;
    setCart((current) => {
      const found = current.find(keyMatch);
      if (found) return current.map((item) => keyMatch(item) ? { ...item, qty: item.qty + 1 } : item);
      return [...current, { ...product, color, size, qty: 1 }];
    });
  }

  function changeQty(target, amount) {
    setCart((current) => current.map((item) =>
      item.id === target.id && item.color === target.color && item.size === target.size
        ? { ...item, qty: item.qty + amount }
        : item
    ).filter((item) => item.qty > 0));
  }

  function removeItem(target) {
    setCart((current) => current.filter((item) => !(item.id === target.id && item.color === target.color && item.size === target.size)));
  }

   
async function placeOrder(form) {
  let response;

  try {
    response = await fetch(`${API_URL}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customer: form,
        items: cart.map((item) => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.qty,
          color: item.color,
          size: item.size,
        })),
      }),
    });
  } catch (error) {
    throw new Error(
      "Cannot connect to the server. Check the API URL and backend status."
    );
  }

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      result.message || `Order failed (${response.status})`
    );
  }

  setOrderPlaced(true);
  setCart([]);
  setPage("success");
}
  function goHome() {
    setPage("home");
    setOrderPlaced(false);
  }

  return (
    <div className="app-shell">
      <Header cartCount={cartCount} onOpenCart={() => setPage("cart")} onHome={goHome} />
      {page === "home" && (
        <main>
          <section className="hero-banner">
            <div className="hero-copy">
              <span className="hero-kicker">Koleksioni i ri</span>
              <h1>Stili yt, <em>historia jote.</em></h1>
              <p>Zbulo pjesët që të bëjnë të ndihesh bukur çdo ditë.</p>
              <a href="#products" className="hero-link">SHIKO PRODUKTET <span>↗</span></a>
            </div>
            <div className="hero-photo" role="img" aria-label="Koleksioni BellaFashion" />
          </section>

          {/* <section className="new-strip"><span>new</span><span>new</span><span>new</span><span>new</span><span>new</span></section> */}

          <section className="catalog-section" id="products">
            <div className="section-heading">
              <div><p className="eyebrow">ZGJEDHJE PËR TY</p><h2>Produktet tona</h2></div>
              <p className="section-note">Pak elegancë, çdo ditë.</p>
            </div>
            <div className="category-tabs">
              {["Të gjitha", "Të reja",].map((item) => (
                <button key={item} onClick={() => setCategory(item)} className={category === item ? "active" : ""}>{item}</button>
              ))}
            </div>
            <div className="product-grid">
              {visibleProducts.map((product) => <ProductCard key={product.id} product={product} onSelect={(item) => { setSelectedProduct(item); setPage("detail"); }} />)}
            </div>
          </section>
          <footer className="site-footer"><span className="footer-logo">BellaFashion</span><p>Elegancë në çdo detaj.</p><small>© {new Date().getFullYear()} BellaFashion</small></footer>
        </main>
      )}

      {page === "detail" && <ProductDetail product={selectedProduct} onBack={goHome} onAdd={addToCart} />}
      {page === "cart" && <CartPage cart={cart} onBack={goHome} onChangeQty={changeQty} onRemove={removeItem} onCheckout={() => setPage("checkout")} />}
      {page === "checkout" && <CheckoutPage cart={cart} onBack={() => setPage("cart")} onOrder={placeOrder} />}
      {page === "success" && orderPlaced && (
        <main className="success-page">
          <div className="success-mark">✓</div>
          <p className="eyebrow">BELLA FASHION</p>
          <h1>Faleminderit për porosinë!</h1>
          <p>Porosia jote u regjistrua.</p>
          <button className="primary-button" onClick={goHome}>KTHEHU NË BALLINË</button>
        
        </main>
      )}
    </div>
  );
}

export default App;

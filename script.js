(() => {
  const PRODUCTS = [
    { id: '1', name: 'Café Latte', desc: 'Espresso con leche vaporizada', price: 8500, img: 'images/latte.jpg' },
    { id: '2', name: 'Cappuccino', desc: 'Espuma de leche y cacao', price: 9000, img: 'images/cappuccino.jpg' },
    { id: '3', name: 'Cold Brew', desc: 'Café frío extraído lentamente', price: 9500, img: 'images/coldbrew.jpg' },
  ];

  const productListEl = document.getElementById('productList');
  const tpl = document.getElementById('productTpl');
  const cartBtn = document.getElementById('cartBtn');
  const cartPanel = document.getElementById('cartPanel');
  const overlay = document.getElementById('overlay');
  const closeCart = document.getElementById('closeCart');
  const cartItemsEl = document.getElementById('cartItems');
  const cartCountEl = document.getElementById('cartCount');
  const subtotalEl = document.getElementById('subtotal');
  const shippingEl = document.getElementById('shipping');
  const totalEl = document.getElementById('total');
  const clearCartBtn = document.getElementById('clearCart');
  const checkoutBtn = document.getElementById('checkoutBtn');

  let cart = JSON.parse(localStorage.getItem('cart') || '{}');
  const saveCart = () => localStorage.setItem('cart', JSON.stringify(cart));
  const format = n => new Intl.NumberFormat('es-CO',{style:'currency',currency:'COP',maximumFractionDigits:0}).format(n);

  const totals = () => {
    const subtotal = Object.values(cart).reduce((a,b)=>a+b.price*b.qty,0);
    const shipping = subtotal>=50000?0:(subtotal>0?6000:0);
    return {subtotal, shipping, total:subtotal+shipping};
  };

  function renderProducts(){
    productListEl.innerHTML='';
    PRODUCTS.forEach(p=>{
      const node=tpl.content.cloneNode(true);
      node.querySelector('.product-title').textContent=p.name;
      node.querySelector('.product-desc').textContent=p.desc;
      node.querySelector('.price').textContent=format(p.price);
      node.querySelector('.media').innerHTML=`<img src="${p.img}" alt="${p.name}">`;
      const qty=node.querySelector('.qty');
      node.querySelector('.add-to-cart').onclick=()=>add(p.id,p.name,p.price,Number(qty.value));
      productListEl.appendChild(node);
    });
  }

  function add(id,name,price,qty){
    cart[id]?cart[id].qty+=qty:cart[id]={id,name,price,qty};
    saveCart(); renderCart(); openCart();
  }

  function remove(id){ delete cart[id]; saveCart(); renderCart(); }
  function update(id,qty){ cart[id].qty=Math.max(1,qty); saveCart(); renderCart(); }
  function clear(){ cart={}; saveCart(); renderCart(); }

  function renderCart(){
    cartItemsEl.innerHTML='';
    const items=Object.values(cart);
    if(!items.length) cartItemsEl.innerHTML='<p style="color:#f4e2b8">Tu carrito está vacío.</p>';
    items.forEach(it=>{
      const el=document.createElement('div');
      el.className='cart-item';
      el.innerHTML=`
        <div class="thumb"><img src="${PRODUCTS.find(p=>p.id===it.id)?.img}" style="width:100%;height:100%;object-fit:cover;border-radius:8px"></div>
        <div class="meta">
          <div class="name">${it.name}</div>
          <div class="small">${format(it.price)} · x${it.qty}</div>
          <div style="margin-top:6px;display:flex;gap:8px;align-items:center">
            <input type="number" min="1" value="${it.qty}" style="width:72px;padding:6px;border-radius:8px;border:1px solid #ddd">
            <button class="btn small remove-item">Eliminar</button>
          </div>
        </div>`;
      el.querySelector('.remove-item').onclick=()=>remove(it.id);
      el.querySelector('input').onchange=e=>update(it.id,Number(e.target.value));
      cartItemsEl.appendChild(el);
    });
    const {subtotal,shipping,total}=totals();
    subtotalEl.textContent=format(subtotal);
    shippingEl.textContent=shipping?format(shipping):'Gratis';
    totalEl.textContent=format(total);
    cartCountEl.textContent=items.reduce((a,b)=>a+b.qty,0);
  }

  const openCart=()=>{cartPanel.classList.add('open');overlay.hidden=false;};
  const closeC=()=>{cartPanel.classList.remove('open');overlay.hidden=true;};

  cartBtn.onclick=openCart;
  closeCart.onclick=closeC;
  overlay.onclick=closeC;
  clearCartBtn.onclick=clear;
  checkoutBtn.onclick=()=>{alert('Gracias por tu compra ☕');clear();closeC();};

  renderProducts();
  renderCart();
})();

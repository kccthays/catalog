/*
  MODELO REUTILIZÁVEL
  Troque apenas as duas áreas abaixo: CONFIG e PRODUTOS.
  As imagens usam URLs do Unsplash. Você pode substituir por URLs próprias.
*/
let CONFIG = {
  marca: 'Vitrine', temporada: '2026',
  titulo: 'Objetos que<br><em>acompanham</em><br>o seu ritmo.',
  descricao: 'Uma curadoria de peças essenciais, pensadas para durarem e fazerem parte da sua rotina.',
  sobre: 'Cada item entra nesta seleção porque resolve algo no dia a dia — com materiais honestos, formas simples e tempo de vida longo.',
  imagemHero: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1800&q=85',
  whatsapp: '5511999999999', instagram: 'https://instagram.com/'
};
const CONFIG_STORAGE_KEY='vitrine-catalogo-config-v1';
try{const savedConfig=localStorage.getItem(CONFIG_STORAGE_KEY);if(savedConfig)Object.assign(CONFIG,JSON.parse(savedConfig))}catch{}
const PRODUTOS = [
  {id:1,nome:'Bolsa Horizonte',categoria:'Bolsas',preco:289,estoque:true,destaque:'NOVO',imagem:'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85',descricao:'Bolsa de ombro em couro macio com alça ajustável e compartimento interno.'},
  {id:2,nome:'Óculos Litoral',categoria:'Acessórios',preco:179,estoque:true,imagem:'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85',descricao:'Armação leve de linhas clássicas, feita para dias de sol.'},
  {id:3,nome:'Jaqueta Campo',categoria:'Vestuário',preco:469,estoque:true,destaque:'MAIS VENDIDO',imagem:'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85',descricao:'Jaqueta utilitária em algodão estruturado, com bolsos frontais amplos.'},
  {id:4,nome:'Tênis Vértice',categoria:'Calçados',preco:329,estoque:false,imagem:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85',descricao:'Tênis de perfil baixo com acabamento em camurça e solado de borracha.'},
  {id:5,nome:'Relógio Marco',categoria:'Acessórios',preco:549,estoque:true,imagem:'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85',descricao:'Relógio minimalista em aço com mostrador de alta legibilidade.'},
  {id:6,nome:'Mochila Norte',categoria:'Bolsas',preco:359,estoque:true,imagem:'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85',descricao:'Mochila compacta e resistente para a rotina, com espaço para notebook.'},
  {id:7,nome:'Camiseta Forma',categoria:'Vestuário',preco:129,estoque:true,imagem:'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85',descricao:'Camiseta de algodão encorpado, modelagem reta e toque macio.'},
  {id:8,nome:'Sandália Brisa',categoria:'Calçados',preco:219,estoque:true,destaque:'ÚLTIMAS UNIDADES',imagem:'https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&w=900&q=85',descricao:'Sandália de tiras em couro com palmilha anatômica.'}
];

const state={category:'Todos',stock:false,search:'',sort:'featured'};
const money=v=>v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const whats=(product)=>`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(`Olá! Tenho interesse em: ${product.nome}`)}`;
function setup(){
  document.title=`${CONFIG.marca} — Catálogo`;
  ['brandName','footerBrand'].forEach(id=>document.getElementById(id).textContent=CONFIG.marca);
  document.getElementById('season').textContent=CONFIG.temporada;document.getElementById('heroTitle').innerHTML=CONFIG.titulo;document.getElementById('heroText').textContent=CONFIG.descricao;document.getElementById('aboutText').textContent=CONFIG.sobre;document.getElementById('heroImage').src=CONFIG.imagemHero;document.getElementById('year').textContent=new Date().getFullYear();
  document.getElementById('instagram').href=CONFIG.instagram;
  ['whatsappNav','whatsappCta'].forEach(id=>{const e=document.getElementById(id);e.href=`https://wa.me/${CONFIG.whatsapp}`;e.target='_blank'});
  const cats=['Todos',...new Set(PRODUTOS.map(p=>p.categoria))];
  document.getElementById('categoryFilters').innerHTML=cats.map(c=>`<label class="check-label"><input type="radio" name="category" value="${c}" ${c==='Todos'?'checked':''}> ${c}</label>`).join('');
  document.querySelectorAll('[name=category]').forEach(i=>i.addEventListener('change',e=>{state.category=e.target.value;render()}));
  document.getElementById('stockFilter').addEventListener('change',e=>{state.stock=e.target.checked;render()});
  document.getElementById('searchInput').addEventListener('input',e=>{state.search=e.target.value.toLowerCase();render()});
  document.getElementById('sortSelect').addEventListener('change',e=>{state.sort=e.target.value;render()});
  document.getElementById('clearFilters').addEventListener('click',reset);document.getElementById('resetEmpty').addEventListener('click',reset);
  document.getElementById('mobileFilters').addEventListener('click',()=>{document.querySelector('.filters').classList.toggle('open');document.body.classList.toggle('mobile-open')});
  document.querySelector('.menu-button').addEventListener('click',()=>document.getElementById('produtos').scrollIntoView());
  document.querySelector('.close-dialog').addEventListener('click',()=>document.getElementById('productDialog').close());render();
}
function reset(){state.category='Todos';state.stock=false;state.search='';state.sort='featured';document.querySelector('[value="Todos"]').checked=true;document.getElementById('stockFilter').checked=false;document.getElementById('searchInput').value='';document.getElementById('sortSelect').value='featured';render()}
function filtered(){let a=PRODUTOS.filter(p=>(state.category==='Todos'||p.categoria===state.category)&&(!state.stock||p.estoque)&&p.nome.toLowerCase().includes(state.search));if(state.sort==='low')a.sort((a,b)=>a.preco-b.preco);if(state.sort==='high')a.sort((a,b)=>b.preco-a.preco);if(state.sort==='name')a.sort((a,b)=>a.nome.localeCompare(b.nome));return a}
function render(){const items=filtered(),grid=document.getElementById('productGrid');document.getElementById('resultCount').textContent=`${items.length} ${items.length===1?'produto':'produtos'}`;grid.innerHTML=items.map(p=>`<article class="product-card"><button class="product-image" data-product="${p.id}" aria-label="Ver detalhes de ${p.nome}"><img src="${p.imagem}" alt="${p.nome}" loading="lazy">${p.destaque?`<span class="badge">${p.destaque}</span>`:''}${!p.estoque?'<span class="badge">ESGOTADO</span>':''}</button><div class="product-info"><div class="product-meta"><h3 class="product-name">${p.nome}</h3><span class="product-price">${money(p.preco)}</span></div><p class="product-category">${p.categoria}</p></div></article>`).join('');document.getElementById('emptyState').hidden=items.length>0;grid.hidden=items.length===0;grid.querySelectorAll('[data-product]').forEach(b=>b.addEventListener('click',()=>openProduct(Number(b.dataset.product))))}
function openProduct(id){const p=PRODUTOS.find(x=>x.id===id);document.getElementById('dialogContent').innerHTML=`<div class="dialog-grid"><img src="${p.imagem}" alt="${p.nome}"><div class="dialog-info"><p class="eyebrow">${p.categoria.toUpperCase()}</p><h3>${p.nome}</h3><strong class="product-price">${money(p.preco)}</strong><p>${p.descricao}</p><p>${p.estoque?'Em estoque e disponível para envio.':'Produto temporariamente esgotado.'}</p>${p.estoque?`<a class="cta" target="_blank" href="${whats(p)}">Tenho interesse <span>↗</span></a>`:''}</div></div>`;document.getElementById('productDialog').showModal()}
// The enhanced initializer below owns the catalog events and storage.

/* Extensões do modelo: carrinho, checkout detalhado e painel local do lojista. */
const ENHANCE_PRODUCTS_KEY = 'vitrine-catalogo-produtos-v1';
const ENHANCE_CART_KEY = 'vitrine-catalogo-carrinho-v1';
const enhanceRead = (key, fallback) => { try { const saved = localStorage.getItem(key); return saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(fallback)); } catch { return JSON.parse(JSON.stringify(fallback)); } };
let enhanceProducts = enhanceRead(ENHANCE_PRODUCTS_KEY, PRODUTOS);
let enhanceCart = enhanceRead(ENHANCE_CART_KEY, []);
const enhanceState = { category: 'Todos', stock: false, search: '', sort: 'featured' };
const enhanceMoney = (value) => Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const enhanceEsc = (value) => String(value ?? '').replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
const enhanceProduct = (id) => enhanceProducts.find(item => String(item.id) === String(id));
const enhanceSaveProducts = () => localStorage.setItem(ENHANCE_PRODUCTS_KEY, JSON.stringify(enhanceProducts));
const enhanceSaveCart = () => localStorage.setItem(ENHANCE_CART_KEY, JSON.stringify(enhanceCart));

function enhanceRefreshCategories() {
  const categories = ['Todos', ...new Set(enhanceProducts.map(product => product.categoria))];
  document.getElementById('categoryFilters').innerHTML = categories.map(category => `<label class="check-label"><input type="radio" name="category" value="${enhanceEsc(category)}" ${category === enhanceState.category ? 'checked' : ''}> ${enhanceEsc(category)}</label>`).join('');
  document.querySelectorAll('[name="category"]').forEach(input => input.addEventListener('change', event => { enhanceState.category = event.target.value; enhanceRenderProducts(); }));
}
function enhanceFilteredProducts() {
  const result = enhanceProducts.filter(product => (enhanceState.category === 'Todos' || product.categoria === enhanceState.category) && (!enhanceState.stock || product.estoque) && `${product.nome} ${product.categoria}`.toLowerCase().includes(enhanceState.search));
  if (enhanceState.sort === 'low') result.sort((a, b) => a.preco - b.preco);
  if (enhanceState.sort === 'high') result.sort((a, b) => b.preco - a.preco);
  if (enhanceState.sort === 'name') result.sort((a, b) => a.nome.localeCompare(b.nome));
  return result;
}
function enhanceRenderProducts() {
  const items = enhanceFilteredProducts();
  const grid = document.getElementById('productGrid');
  document.getElementById('resultCount').textContent = `${items.length} ${items.length === 1 ? 'produto' : 'produtos'}`;
  grid.innerHTML = items.map(product => `<article class="product-card"><button class="product-image" data-enhance-action="detail" data-product="${product.id}" aria-label="Ver detalhes de ${enhanceEsc(product.nome)}"><img src="${enhanceEsc(product.imagem)}" alt="${enhanceEsc(product.nome)}" loading="lazy">${product.destaque ? `<span class="badge">${enhanceEsc(product.destaque)}</span>` : ''}${!product.estoque ? '<span class="badge">ESGOTADO</span>' : ''}</button><div class="product-info"><div class="product-meta"><h3 class="product-name">${enhanceEsc(product.nome)}</h3><span class="product-price">${enhanceMoney(product.preco)}</span></div><p class="product-category">${enhanceEsc(product.categoria)}</p><button class="add-button" data-enhance-action="add" data-product="${product.id}" ${!product.estoque ? 'disabled' : ''}>${product.estoque ? 'Adicionar ao carrinho' : 'Indisponível'} <span>${product.estoque ? '+' : ''}</span></button></div></article>`).join('');
  document.getElementById('emptyState').hidden = items.length > 0; grid.hidden = items.length === 0;
}
function enhanceOpenProduct(id) {
  const product = enhanceProduct(id); if (!product) return;
  document.getElementById('dialogContent').innerHTML = `<div class="dialog-grid"><img src="${enhanceEsc(product.imagem)}" alt="${enhanceEsc(product.nome)}"><div class="dialog-info"><p class="eyebrow">${enhanceEsc(product.categoria.toUpperCase())}</p><h3>${enhanceEsc(product.nome)}</h3><strong class="product-price">${enhanceMoney(product.preco)}</strong><p>${enhanceEsc(product.descricao)}</p><p>${product.estoque ? 'Em estoque e disponível para envio.' : 'Produto temporariamente esgotado.'}</p>${product.estoque ? `<button class="cta dialog-add" type="button" data-dialog-add="${product.id}">Adicionar ao carrinho <span>+</span></button>` : ''}</div></div>`;
  document.querySelector('[data-dialog-add]')?.addEventListener('click', () => { enhanceAddToCart(product.id); document.getElementById('productDialog').close(); enhanceOpenCart(); });
  document.getElementById('productDialog').showModal();
}
function enhanceAddToCart(id) { const product = enhanceProduct(id); if (!product || !product.estoque) return; const line = enhanceCart.find(item => String(item.id) === String(id)); if (line) line.quantidade += 1; else enhanceCart.push({ id: product.id, quantidade: 1 }); enhanceSaveCart(); enhanceRenderCart(); enhanceOpenCart(); }
function enhanceCartTotal() { return enhanceCart.reduce((total, line) => { const product = enhanceProduct(line.id); return total + (product ? product.preco * line.quantidade : 0); }, 0); }
function enhanceRenderCart() {
  enhanceCart = enhanceCart.filter(line => enhanceProduct(line.id));
  const count = enhanceCart.reduce((total, line) => total + line.quantidade, 0);
  document.getElementById('cartCount').textContent = count; document.getElementById('drawerCount').textContent = `(${count})`;
  document.getElementById('cartEmpty').hidden = count > 0; document.getElementById('cartSummary').hidden = count === 0;
  document.getElementById('cartItems').innerHTML = enhanceCart.map(line => { const product = enhanceProduct(line.id); return `<div class="cart-row"><img src="${enhanceEsc(product.imagem)}" alt="${enhanceEsc(product.nome)}"><div><h3>${enhanceEsc(product.nome)}</h3><p>${enhanceMoney(product.preco)} cada</p><div class="quantity-control"><button type="button" data-cart-action="minus" data-id="${product.id}" aria-label="Diminuir quantidade">−</button><span>${line.quantidade}</span><button type="button" data-cart-action="plus" data-id="${product.id}" aria-label="Aumentar quantidade">+</button><button type="button" class="remove-item" data-cart-action="remove" data-id="${product.id}">Remover</button></div></div><span class="cart-row-total">${enhanceMoney(product.preco * line.quantidade)}</span></div>`; }).join('');
  document.getElementById('cartTotal').textContent = enhanceMoney(enhanceCartTotal()); enhanceSaveCart();
}
function enhanceOpenCart() { document.getElementById('cartDrawer').classList.add('open'); document.getElementById('drawerBackdrop').classList.add('open'); document.getElementById('cartDrawer').setAttribute('aria-hidden', 'false'); }
function enhanceCloseCart() { document.getElementById('cartDrawer').classList.remove('open'); document.getElementById('drawerBackdrop').classList.remove('open'); document.getElementById('cartDrawer').setAttribute('aria-hidden', 'true'); }
function enhanceCheckout() {
  if (!enhanceCart.length) return;
  const name = document.getElementById('customerName').value.trim(); const note = document.getElementById('orderNote').value.trim();
  let message = `Olá! Gostaria de fazer este pedido pelo catálogo ${CONFIG.marca}.\n\n*Itens do pedido:*\n`;
  enhanceCart.forEach((line, index) => { const product = enhanceProduct(line.id); message += `\n${index + 1}. *${product.nome}*\n   Quantidade: ${line.quantidade}\n   Valor unitário: ${enhanceMoney(product.preco)}\n   Subtotal: ${enhanceMoney(product.preco * line.quantidade)}\n`; });
  message += `\n*Total: ${enhanceMoney(enhanceCartTotal())}*`; if (name) message += `\n\nNome: ${name}`; if (note) message += `\nObservação: ${note}`; message += '\n\nAguardo a confirmação da disponibilidade e os próximos passos. Obrigado!';
  window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
}

function enhanceRenderAdmin() {
  document.getElementById('adminProductCount').textContent = `(${enhanceProducts.length})`;
  document.getElementById('adminList').innerHTML = enhanceProducts.map(product => `<div class="admin-product"><img src="${enhanceEsc(product.imagem)}" alt=""><div><strong>${enhanceEsc(product.nome)}</strong><small>${enhanceEsc(product.categoria)} · ${enhanceMoney(product.preco)}</small></div><span class="admin-status ${product.estoque ? '' : 'off'}">${product.estoque ? 'DISPONÍVEL' : 'INDISPONÍVEL'}</span><div class="admin-actions"><button type="button" data-admin-action="toggle" data-id="${product.id}">${product.estoque ? 'Indisponibilizar' : 'Disponibilizar'}</button><button type="button" data-admin-action="edit" data-id="${product.id}">Editar</button><button type="button" class="delete-product" data-admin-action="delete" data-id="${product.id}">Excluir</button></div></div>`).join('');
}
function enhanceClearForm() { document.getElementById('productForm').reset(); document.getElementById('editId').value = ''; document.getElementById('formStock').checked = true; document.getElementById('cancelEdit').hidden = true; }
function enhanceFillForm(product) { document.getElementById('editId').value = product.id; document.getElementById('formName').value = product.nome; document.getElementById('formCategory').value = product.categoria; document.getElementById('formPrice').value = product.preco; document.getElementById('formBadge').value = product.destaque || ''; document.getElementById('formImage').value = product.imagem; document.getElementById('formDescription').value = product.descricao; document.getElementById('formStock').checked = product.estoque; document.getElementById('cancelEdit').hidden = false; document.querySelector('.admin-dialog').scrollTo({ top: 0, behavior: 'smooth' }); }
function enhanceSaveForm(event) { event.preventDefault(); const id = document.getElementById('editId').value; const product = { id: id || Date.now(), nome: document.getElementById('formName').value.trim(), categoria: document.getElementById('formCategory').value.trim(), preco: Number(document.getElementById('formPrice').value), destaque: document.getElementById('formBadge').value.trim(), imagem: document.getElementById('formImage').value.trim(), descricao: document.getElementById('formDescription').value.trim(), estoque: document.getElementById('formStock').checked }; enhanceProducts = id ? enhanceProducts.map(item => String(item.id) === String(id) ? product : item) : [...enhanceProducts, product]; enhanceSaveProducts(); enhanceClearForm(); enhanceRefreshCategories(); enhanceRenderProducts(); enhanceRenderAdmin(); }
function enhanceBind() {
  if (!localStorage.getItem(ENHANCE_PRODUCTS_KEY)) enhanceSaveProducts();
  document.title = `${CONFIG.marca} — Catálogo`; ['brandName', 'footerBrand'].forEach(id => document.getElementById(id).textContent = CONFIG.marca); document.getElementById('season').textContent = CONFIG.temporada; document.getElementById('heroTitle').innerHTML = CONFIG.titulo; document.getElementById('heroText').textContent = CONFIG.descricao; document.getElementById('aboutText').textContent = CONFIG.sobre; document.getElementById('heroImage').src = CONFIG.imagemHero; document.getElementById('year').textContent = new Date().getFullYear(); document.getElementById('instagram').href = CONFIG.instagram; ['whatsappNav', 'whatsappCta'].forEach(id => { const link = document.getElementById(id); link.href = `https://wa.me/${CONFIG.whatsapp}`; link.target = '_blank'; });
  enhanceRefreshCategories(); enhanceRenderProducts(); enhanceRenderCart(); document.querySelector('.close-dialog').addEventListener('click', () => document.getElementById('productDialog').close()); document.querySelector('.menu-button').addEventListener('click', () => document.getElementById('produtos').scrollIntoView()); document.getElementById('mobileFilters').addEventListener('click', () => { document.querySelector('.filters').classList.toggle('open'); document.body.classList.toggle('mobile-open'); }); document.getElementById('emptyLink').addEventListener('click', enhanceCloseCart);
  document.getElementById('productGrid').addEventListener('click', event => { const trigger = event.target.closest('[data-enhance-action]'); if (!trigger) return; event.preventDefault(); if (trigger.dataset.enhanceAction === 'detail') enhanceOpenProduct(trigger.dataset.product); if (trigger.dataset.enhanceAction === 'add') enhanceAddToCart(trigger.dataset.product); });
  document.getElementById('cartButton').addEventListener('click', enhanceOpenCart); document.getElementById('closeCart').addEventListener('click', enhanceCloseCart); document.getElementById('drawerBackdrop').addEventListener('click', enhanceCloseCart); document.getElementById('emptyLink').addEventListener('click', enhanceCloseCart); document.getElementById('checkoutButton').addEventListener('click', enhanceCheckout);
  document.getElementById('cartItems').addEventListener('click', event => { const button = event.target.closest('[data-cart-action]'); if (!button) return; const line = enhanceCart.find(item => String(item.id) === String(button.dataset.id)); if (!line) return; if (button.dataset.cartAction === 'plus') line.quantidade += 1; if (button.dataset.cartAction === 'minus') line.quantidade -= 1; if (button.dataset.cartAction === 'remove' || line.quantidade < 1) enhanceCart = enhanceCart.filter(item => String(item.id) !== String(button.dataset.id)); enhanceRenderCart(); });
  document.getElementById('adminButton').addEventListener('click', enhanceOpenAdminApp); document.getElementById('closeAdmin').addEventListener('click', () => document.getElementById('adminDialog').close()); document.getElementById('cancelEdit').addEventListener('click', enhanceClearForm); document.getElementById('productForm').addEventListener('submit', enhanceSaveForm);
  document.getElementById('adminList').addEventListener('click', event => { const button = event.target.closest('[data-admin-action]'); if (!button) return; const product = enhanceProduct(button.dataset.id); if (!product) return; if (button.dataset.adminAction === 'toggle') { product.estoque = !product.estoque; enhanceSaveProducts(); enhanceRenderAdmin(); enhanceRenderProducts(); } if (button.dataset.adminAction === 'edit') enhanceFillForm(product); if (button.dataset.adminAction === 'delete' && window.confirm(`Excluir “${product.nome}”?`)) { enhanceProducts = enhanceProducts.filter(item => String(item.id) !== String(product.id)); enhanceCart = enhanceCart.filter(item => String(item.id) !== String(product.id)); enhanceSaveProducts(); enhanceSaveCart(); enhanceRefreshCategories(); enhanceRenderAdmin(); enhanceRenderProducts(); enhanceRenderCart(); } });
  document.getElementById('stockFilter').addEventListener('change', event => { enhanceState.stock = event.target.checked; enhanceRenderProducts(); }); document.getElementById('searchInput').addEventListener('input', event => { enhanceState.search = event.target.value.toLowerCase(); enhanceRenderProducts(); }); document.getElementById('sortSelect').addEventListener('change', event => { enhanceState.sort = event.target.value; enhanceRenderProducts(); }); document.getElementById('clearFilters').addEventListener('click', () => { enhanceState.category = 'Todos'; enhanceState.stock = false; enhanceState.search = ''; enhanceState.sort = 'featured'; document.getElementById('stockFilter').checked = false; document.getElementById('searchInput').value = ''; document.getElementById('sortSelect').value = 'featured'; enhanceRefreshCategories(); enhanceRenderProducts(); });
}
if (document.getElementById('productGrid')) enhanceBind();

function enhanceAdminSetView(view) {
  const views = { dashboard: ['adminDashboardView', 'Painel'], products: ['adminProductsView', 'Produtos'], categories: ['adminCategoriesView', 'Categorias'], settings: ['adminSettingsView', 'Configurações'], editor: ['adminProductEditorView', document.getElementById('appEditId').value ? 'Editar produto' : 'Adicionar produto'] };
  document.querySelectorAll('.admin-view').forEach(section => section.classList.remove('active'));
  const target = document.getElementById(views[view][0]); if (target) target.classList.add('active');
  document.getElementById('adminPageTitle').textContent = views[view][1];
  document.querySelectorAll('.admin-nav-item').forEach(button => button.classList.toggle('active', button.dataset.adminView === view));
  if (view === 'dashboard') enhanceAdminRenderDashboard(); if (view === 'products') enhanceAdminRenderAppProducts(); if (view === 'categories') enhanceAdminRenderCategories();
}
function enhanceAdminRenderDashboard() {
  const available = enhanceProducts.filter(product => product.estoque).length;
  document.getElementById('statProducts').textContent = enhanceProducts.length; document.getElementById('statAvailable').textContent = available; document.getElementById('statUnavailable').textContent = enhanceProducts.length - available; document.getElementById('statCategories').textContent = new Set(enhanceProducts.map(product => product.categoria)).size;
  document.getElementById('adminRecentList').innerHTML = enhanceProducts.slice(-5).reverse().map(product => `<div class="admin-recent-row"><img src="${enhanceEsc(product.imagem)}" alt=""><div><strong>${enhanceEsc(product.nome)}</strong><small>${enhanceEsc(product.categoria)} · ${enhanceMoney(product.preco)}</small></div><span class="admin-recent-status ${product.estoque ? '' : 'off'}">${product.estoque ? 'Disponível' : 'Indisponível'}</span></div>`).join('');
}
function enhanceAdminRenderAppProducts() {
  document.getElementById('appProductCount').textContent = `(${enhanceProducts.length})`;
  document.getElementById('appProductList').innerHTML = enhanceProducts.map(product => `<div class="admin-product"><img src="${enhanceEsc(product.imagem)}" alt=""><div><strong>${enhanceEsc(product.nome)}</strong><small>${enhanceEsc(product.categoria)} · ${enhanceMoney(product.preco)}</small></div><span class="admin-status ${product.estoque ? '' : 'off'}">${product.estoque ? 'Disponível' : 'Indisponível'}</span><div class="admin-actions"><button type="button" data-app-action="toggle" data-id="${product.id}">${product.estoque ? 'Indisponibilizar' : 'Disponibilizar'}</button><button type="button" data-app-action="edit" data-id="${product.id}">Editar</button><button type="button" class="delete-product" data-app-action="delete" data-id="${product.id}">Excluir</button></div></div>`).join('');
}
function enhanceAdminRenderCategories() {
  const groups = [...new Set(enhanceProducts.map(product => product.categoria))].map(category => ({ category, count: enhanceProducts.filter(product => product.categoria === category).length, available: enhanceProducts.filter(product => product.categoria === category && product.estoque).length }));
  document.getElementById('appCategoryList').innerHTML = groups.map(group => `<div class="admin-category-card"><strong>${enhanceEsc(group.category)}</strong><span>${group.count} produtos · ${group.available} disponíveis</span></div>`).join('');
}
function enhanceAdminPopulateCategories(selected = '') { document.getElementById('appFormCategory').innerHTML = `<option value="">Sem categoria</option>${[...new Set(enhanceProducts.map(product => product.categoria))].map(category => `<option value="${enhanceEsc(category)}" ${category === selected ? 'selected' : ''}>${enhanceEsc(category)}</option>`).join('')}`; }
function enhanceAdminOpenEditor(product = null) {
  document.getElementById('appProductForm').reset(); document.getElementById('appEditId').value = product ? product.id : ''; document.getElementById('appEditorTitle').textContent = product ? 'Editar produto' : 'Adicionar produto'; document.getElementById('appDeleteProduct').hidden = !product;
  enhanceAdminPopulateCategories(product?.categoria || ''); document.getElementById('appFormName').value = product?.nome || ''; document.getElementById('appFormDescription').value = product?.descricao || ''; document.getElementById('appFormPrice').value = product?.preco ?? ''; document.getElementById('appFormImage').value = product?.imagem || ''; document.getElementById('appFormAvailable').checked = product ? product.estoque : true; document.querySelector('#appProductForm input[name="appStock"][value="false"]').checked = product ? !product.estoque : false; document.getElementById('appFormFeatured').checked = Boolean(product?.destaque); enhanceAdminPreviewImage(); enhanceAdminSetView('editor');
}
function enhanceAdminPreviewImage() { const url = document.getElementById('appFormImage').value.trim(); document.getElementById('appImagePreview').innerHTML = url ? `<img src="${enhanceEsc(url)}" alt="Prévia da foto">` : '<span>▧</span><small>Insira a URL de uma foto</small>'; }
function enhanceAdminSaveAppForm(event) {
  event.preventDefault(); const id = document.getElementById('appEditId').value; const old = id ? enhanceProduct(id) : null; const product = { id: id || Date.now(), nome: document.getElementById('appFormName').value.trim(), descricao: document.getElementById('appFormDescription').value.trim(), preco: Number(document.getElementById('appFormPrice').value), categoria: document.getElementById('appFormCategory').value || 'Sem categoria', imagem: document.getElementById('appFormImage').value.trim(), estoque: document.querySelector('#appProductForm input[name="appStock"]:checked').value === 'true', destaque: document.getElementById('appFormFeatured').checked ? (old?.destaque || 'DESTAQUE') : '' };
  enhanceProducts = id ? enhanceProducts.map(item => String(item.id) === String(id) ? product : item) : [...enhanceProducts, product]; enhanceSaveProducts(); enhanceRefreshCategories(); enhanceRenderProducts(); enhanceAdminRenderAppProducts(); enhanceAdminRenderDashboard(); enhanceAdminSetView('products');
}
function enhanceBindAdminApp() {
  document.querySelectorAll('[data-admin-view]').forEach(button => button.addEventListener('click', () => enhanceAdminSetView(button.dataset.adminView)));
  document.getElementById('appAddProduct').addEventListener('click', () => enhanceAdminOpenEditor()); document.getElementById('appBackProducts').addEventListener('click', () => enhanceAdminSetView('products')); document.getElementById('appCancelForm').addEventListener('click', () => enhanceAdminSetView('products')); document.getElementById('adminAppClose').addEventListener('click', () => document.getElementById('adminAppDialog').close()); document.getElementById('adminExit').addEventListener('click', () => document.getElementById('adminAppDialog').close()); document.getElementById('adminViewSite').addEventListener('click', () => document.getElementById('adminAppDialog').close()); document.getElementById('appProductForm').addEventListener('submit', enhanceAdminSaveAppForm); document.getElementById('appFormImage').addEventListener('input', enhanceAdminPreviewImage);
  document.getElementById('appDeleteProduct').addEventListener('click', () => { const id = document.getElementById('appEditId').value; const product = enhanceProduct(id); if (!product || !window.confirm(`Excluir “${product.nome}”?`)) return; enhanceProducts = enhanceProducts.filter(item => String(item.id) !== String(id)); enhanceCart = enhanceCart.filter(item => String(item.id) !== String(id)); enhanceSaveProducts(); enhanceSaveCart(); enhanceRefreshCategories(); enhanceRenderProducts(); enhanceAdminRenderAppProducts(); enhanceAdminRenderDashboard(); enhanceAdminSetView('products'); });
  document.getElementById('appProductList').addEventListener('click', event => { const button = event.target.closest('[data-app-action]'); if (!button) return; const product = enhanceProduct(button.dataset.id); if (!product) return; if (button.dataset.appAction === 'edit') enhanceAdminOpenEditor(product); if (button.dataset.appAction === 'toggle') { product.estoque = !product.estoque; enhanceSaveProducts(); enhanceRenderProducts(); enhanceAdminRenderAppProducts(); enhanceAdminRenderDashboard(); } if (button.dataset.appAction === 'delete' && window.confirm(`Excluir “${product.nome}”?`)) { enhanceProducts = enhanceProducts.filter(item => String(item.id) !== String(product.id)); enhanceCart = enhanceCart.filter(item => String(item.id) !== String(product.id)); enhanceSaveProducts(); enhanceSaveCart(); enhanceRefreshCategories(); enhanceRenderProducts(); enhanceRenderCart(); enhanceAdminRenderAppProducts(); enhanceAdminRenderDashboard(); } });
}
function enhanceOpenAdminApp() { window.open('admin.html', '_blank', 'noopener'); }
if (document.getElementById('productGrid')) enhanceBindAdminApp();

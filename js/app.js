class Cart {
    constructor() {
        this.items = this.loadCart() || [];
        this.total = 0;
        this.count = 0;
        this.updateCart();
    }

  // Cargar carrito desde LocalStorage
  loadCart() {
    const savedCart = localStorage.getItem('shoppingCart');
    return savedCart ? JSON.parse(savedCart) : null;
    }

    // Guardar carrito en LocalStorage
    saveCart() {
    localStorage.setItem('shoppingCart', JSON.stringify(this.items));
    }     
    //agregar productos en el carrito
    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
        
        this.updateCart();
    }
       //remover productos en el carrito
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.updateCart();
    }
     //mover cantidad de  productos en el carrito
    updateQuantity(productId, newQuantity) {
        const item = this.items.find(item => item.id === productId);
        
        if (item) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = newQuantity;
            }
        }
        
        this.updateCart();
    }
    //calcular total en el carrito
    calculateTotal() {
        this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        this.count = this.items.reduce((count, item) => count + item.quantity, 0);
    }

    updateCart() {
        this.calculateTotal();
        this.saveCart();
        this.renderCart();
        this.updateCartCounter();
    }
        //Cargar productos en el carrito
    renderCart() {
        const container = document.getElementById('cartItemsContainer');
        const emptyMessage = document.getElementById('cartEmptyMessage');
        const summary = document.getElementById('cartSummary');
         // Limpiar el contenedor excepto el mensaje de carrito vacío
        const itemsToRemove = container.querySelectorAll('.cart-item');
        itemsToRemove.forEach(item => item.remove());
        
        if (this.items.length === 0) {
            emptyMessage.style.display = 'block';
            summary.style.display = 'none';
        } else {
            emptyMessage.style.display = 'none';
            summary.style.display = 'block';
            
            this.items.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.className = 'cart-item';
                itemElement.innerHTML = `
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <img src="${item.image}" alt="${item.title}" style="width: 60px; height: 60px; object-fit: contain;">
                        <div class="ms-3 flex-grow-1">
                            <h6 class="mb-1">${item.title}</h6>
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="price-tag">$${item.price.toFixed(2)}</span>
                                <button class="btn btn-sm btn-outline-danger remove-item" data-id="${item.id}">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex align-items-center">
                        <button class="btn btn-sm btn-outline-secondary quantity-btn minus" data-id="${item.id}">
                            <i class="bi bi-dash"></i>
                        </button>
                        <input type="number" class="form-control cart-item-quantity mx-2" value="${item.quantity}" min="1" data-id="${item.id}">
                        <button class="btn btn-sm btn-outline-secondary quantity-btn plus" data-id="${item.id}">
                            <i class="bi bi-plus"></i>
                        </button>
                        <span class="ms-auto fw-bold">$${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    
                `;
                container.appendChild(itemElement);
            });
            
            document.getElementById('cartTotal').textContent = `$${this.total.toFixed(2)}`;
        }
    }

    updateCartCounter() {
        document.getElementById('cartCounter').textContent = this.count;
        const badge = document.getElementById('cartCounter');
        badge.style.display = this.count > 0 ? 'block' : 'none';
    }
}

class Store {
    constructor(endpoint = 'https://fakestoreapi.com/products') {
        this.endpoint = endpoint;
        this.products = [];
        this.filteredProducts = [];
        this.currentSort = '';
        this.currentCategory = '';
        this.currentSearch = '';
        this.currentPriceFilter = '';
        this.cart = new Cart(); // Esto cargará el carrito guardado
    }

    async executeRequest() {
        try {
            const response = await fetch(this.endpoint);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.products = await response.json();
            this.filteredProducts = [...this.products];
            this.renderProducts();
            this.setupEventListeners();
            console.log('Productos cargados exitosamente');
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }
    // Cargar productos en la pagina desde el inicio
    renderProducts() {
        const container = document.getElementById('products-container');
        container.innerHTML = '';

        if (this.filteredProducts.length === 0) {
            container.innerHTML = '<div class="col-12 text-center py-5"><h4>No se encontraron productos</h4></div>';
            return;
        }

        this.filteredProducts.forEach(product => {
            const col = document.createElement('div');
            col.className = 'col-md-6 col-lg-4 col-xl-3 mb-4';

            col.innerHTML = `
                <div class="card product-card h-100">
                    <img src="${product.image}" class="card-img-top product-img" alt="${product.title}">
                    <div class="card-body d-flex flex-column">
                        <span class="price-tag ">$${product.price}</span>
                        <h5 class="card-title">${product.title}</h5>
                        
                        <div class="mt-auto">
                            <span class="badge bg-info float-end">${product.category}</span>
                            <button class="btn btn-primary mt-2 w-100 btn-add-to-cart" data-id="${product.id}">
                                <i class="bi bi-cart-plus-fill"></i> Agregar al carrito
                            </button>
                        </div>
                    </div>
                </div>
            `;

            container.appendChild(col);
        });
    }
    // Cargar modal cuando se da click en un producto
    showProductDetailsModal(product) {
        const modalContent = `
                            <div class="modal fade" id="productDetailsModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content shadow-lg border-0 rounded-3 overflow-hidden">
                        <div class="modal-header border-0 bg-light">
                            <h5 class="modal-title fw-bold text-primary">${product.title}</h5>
                            <button type="button" class="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body p-0">
                            <div class="row g-0">
                                <div class="col-md-6 image-container bg-white d-flex align-items-center justify-content-center p-4">
                                    <img src="${product.image}" class="img-fluid product-image hover-zoom" alt="${product.title}" style="max-height: 350px; object-fit: contain;">
                                </div>
                                <div class="col-md-6 p-4 bg-light">
                                    <div class="product-details">
                                        <div class="d-flex justify-content-between align-items-center mb-3">
                                            <span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3 py-2 fw-normal">${product.category}</span>
                                            <div class="rating">
                                                <span class="fw-bold text-warning">${product.rating?.rate || 'N/A'}</span>
                                                <i class="bi bi-star-fill text-warning"></i>
                                                <span class="text-muted small">(${product.rating?.count || 0} reseñas)</span>
                                            </div>
                                        </div>
                                        <div class="price mb-4">
                                            <span class="fs-4 fw-bold text-dark">$ ${product.price}</span>
                                        </div>
                                        
                                        <div class="description mb-4">
                                            <h6 class="text-uppercase text-muted small fw-bold mb-3">DESCRIPCIÓN:</h6>
                                            <p class="text-muted lh-lg">${product.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer border-0 bg-light">
                            <button type="button" class="btn btn-outline-secondary rounded-pill px-4" data-bs-dismiss="modal">Cerrar</button>
                            <button class="btn btn-primary rounded-pill px-4 d-flex align-items-center gap-2 btn-modal-add-to-cart" data-id="${product.id}">
                                <i class="bi bi-cart-plus-fill"></i>
                                <span>Agregar al carrito</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        if (!document.getElementById('productDetailsModal')) {
            document.body.insertAdjacentHTML('beforeend', modalContent);
        } else {
            document.getElementById('productDetailsModal').outerHTML = modalContent;
        }

        const modal = new bootstrap.Modal(document.getElementById('productDetailsModal'));
        modal.show();

        document.querySelector('.btn-modal-add-to-cart').addEventListener('click', async (e) => {
            e.stopPropagation();
            
            const result = await Swal.fire({
                title: "¿Agregar al carrito?",
                text: `¿Deseas agregar ${product.title} a tu carrito?`,
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, agregar",
                cancelButtonText: "Cancelar"
            });
            
            if (result.isConfirmed) {
                this.cart.addItem(product);
                modal.hide();
                
                await Swal.fire({
                    title: "¡Agregado!",
                    text: `${product.title} se ha añadido al carrito`,
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        });
    }

    setupEventListeners() {
                // Toggle de modo oscuro/claro
            const themeToggle = document.getElementById('themeToggle');
            const themeText = document.getElementById('themeText');
            
            // Verificar preferencia guardada o del sistema
            const savedTheme = localStorage.getItem('theme') || 
                            (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
            document.body.classList.toggle('dark-mode', savedTheme === 'dark');
            themeText.textContent = savedTheme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';
            themeToggle.querySelector('i').className = savedTheme === 'dark' ? 'bi bi-moon-fill me-2' : 'bi bi-sun-fill me-2';

            // Evento para cambiar el tema
            themeToggle.addEventListener('click', () => {
                const isDark = document.body.classList.toggle('dark-mode');
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
                themeText.textContent = isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';
                themeToggle.querySelector('i').className = isDark ? 'bi bi-moon-fill me-2' : 'bi bi-sun-fill me-2';
            });
            //cierre del modal del carrito
            document.addEventListener('click', (e) => {
                const target = e.target.closest('button');
                if (target && target.textContent.trim() === "Seguir comprando") {
                    e.preventDefault();
                    document.getElementById('cartModal').style.display = 'none';
                    return; // Detiene la ejecución para este caso
                }
            });
        // Evento para abrir/cerrar el carrito
        document.getElementById('cartIcon').addEventListener('click', () => {
            const cartModal = document.getElementById('cartModal');
            cartModal.style.display = cartModal.style.display === 'block' ? 'none' : 'block';
        });

        document.getElementById('closeCart').addEventListener('click', () => {
            document.getElementById('cartModal').style.display = 'none';
        });

        // Evento para mostrar detalles del producto (excluyendo el botón de agregar al carrito)
        document.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            const isAddToCartButton = e.target.classList.contains('btn-add-to-cart') || 
                                     e.target.closest('.btn-add-to-cart');
            
            if (productCard && !isAddToCartButton) {
                const productId = parseInt(productCard.querySelector('.btn-add-to-cart').dataset.id);
                const product = this.products.find(p => p.id === productId);
                
                if (product) {
                    this.showProductDetailsModal(product);
                }
            }
        });

        // Evento para agregar productos al carrito
        document.addEventListener('click', async (e) => {
            if (e.target.classList.contains('btn-add-to-cart') || e.target.closest('.btn-add-to-cart')) {
                e.stopPropagation();
                const button = e.target.classList.contains('btn-add-to-cart') ? e.target : e.target.closest('.btn-add-to-cart');
                const productId = parseInt(button.dataset.id);
                const product = this.products.find(p => p.id === productId);
                
                if (product) {
                    const result = await Swal.fire({
                        title: "¿Agregar al carrito?",
                        text: `¿Deseas agregar ${product.title} a tu carrito?`,
                        icon: "question",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Sí, agregar",
                        cancelButtonText: "Cancelar"
                    });
                    
                    if (result.isConfirmed) {
                        this.cart.addItem(product);
                        
                        button.innerHTML = '<i class="bi bi-check-circle-fill"></i> Agregado';
                        button.classList.remove('btn-primary');
                        button.classList.add('btn-success');
                        
                        await Swal.fire({
                            title: "¡Agregado!",
                            text: "El producto se ha añadido al carrito",
                            icon: "success",
                            timer: 1500,
                            showConfirmButton: false
                        });
                        
                        setTimeout(() => {
                            button.innerHTML = '<i class="bi bi-cart-plus-fill"></i> Agregar al carrito';
                            button.classList.remove('btn-success');
                            button.classList.add('btn-primary');
                        }, 1000);
                    }
                }
            }
            
            // Eventos para manejar la cantidad en el carrito
            if (e.target.classList.contains('minus') || e.target.closest('.minus')) {
                const button = e.target.classList.contains('minus') ? e.target : e.target.closest('.minus');
                const productId = parseInt(button.dataset.id);
                const item = this.cart.items.find(item => item.id === productId);
                
                if (item) {
                    this.cart.updateQuantity(productId, item.quantity - 1);
                }
            }
            
            if (e.target.classList.contains('plus') || e.target.closest('.plus')) {
                const button = e.target.classList.contains('plus') ? e.target : e.target.closest('.plus');
                const productId = parseInt(button.dataset.id);
                const item = this.cart.items.find(item => item.id === productId);
                
                if (item) {
                    this.cart.updateQuantity(productId, item.quantity + 1);
                }
            }
            
            // Evento para eliminar items del carrito
            if (e.target.classList.contains('remove-item') || e.target.closest('.remove-item')) {
                const button = e.target.classList.contains('remove-item') ? e.target : e.target.closest('.remove-item');
                const productId = parseInt(button.dataset.id);
                const item = this.cart.items.find(item => item.id === productId);
                
                if (item) {
                    const result = await Swal.fire({
                        title: "¿Eliminar producto?",
                        text: `¿Deseas quitar "${item.title}" del carrito?`,
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Sí, eliminar",
                        cancelButtonText: "Cancelar"
                    });
                    
                    if (result.isConfirmed) {
                        this.cart.removeItem(productId);
                        await Swal.fire({
                            title: "Eliminado",
                            text: "El producto fue removido del carrito",
                            icon: "success",
                            timer: 1500,
                            showConfirmButton: false
                        });
                    }
                }
            }
            
            // Evento para proceder al pago 
            const proceedBtn = e.target.closest('#cartModal .btn-primary:not(.btn-modal-add-to-cart)');
            if (proceedBtn) {
                e.preventDefault();
                if (this.cart.items.length === 0) {
                    await Swal.fire({
                        title: "Carrito vacío",
                        text: "No hay productos en tu carrito para proceder al pago",
                        icon: "warning",
                        confirmButtonColor: "#3085d6",
                    });
                    return;
                }
    
                const result = await Swal.fire({
                    title: "Confirmar compra",
                    html: `
                        <div class="text-start">
                            <p>Estás a punto de comprar ${this.cart.count} producto(s)</p>
                            <p><strong>Total: $${this.cart.total.toFixed(2)}</strong></p>
                            <p>¿Deseas continuar con el pago?</p>
                        </div>
                    `,
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Confirmar pago",
                    cancelButtonText: "Seguir comprando",
                    showLoaderOnConfirm: true,
                    preConfirm: () => {
                        return new Promise(resolve => {
                            setTimeout(() => {
                                resolve();
                            }, 1500);
                        });
                    }
                });
    
                if (result.isConfirmed) {
                    this.cart.items = [];
                    this.cart.updateCart();
                    localStorage.removeItem('shoppingCart');
    
                    await Swal.fire({
                        title: "¡Pago exitoso!",
                        text: "Tu compra ha sido procesada correctamente",
                        icon: "success",
                        confirmButtonText: "Aceptar"
                    });
    
                    document.getElementById('cartModal').style.display = 'none';
                }
            }
        });
      
        // Evento para cambiar cantidad manualmente
        document.addEventListener('change', (e) => {
            if (e.target.classList.contains('cart-item-quantity')) {
                const input = e.target;
                const productId = parseInt(input.dataset.id);
                const newQuantity = parseInt(input.value);
                
                if (!isNaN(newQuantity)) {
                    if (newQuantity <= 0) {
                        input.value = 1;
                        this.cart.updateQuantity(productId, 1);
                    } else {
                        this.cart.updateQuantity(productId, newQuantity);
                    }
                } else {
                    input.value = 1;
                }
            }
        });

        // Configurar event listeners para los filtros
        document.querySelectorAll('[data-sort]').forEach(option => {
            option.addEventListener('click', function() {
                store.currentSort = this.dataset.sort;
                store.applyFilters();
                
                const dropdownButton = this.closest('.dropdown').querySelector('.dropdown-toggle');
                const prefix = this.dataset.sort.includes('price') ? 'Precio: ' : 'Orden: ';
                dropdownButton.textContent = prefix + this.textContent;
            });
        });

        document.querySelectorAll('[data-category]').forEach(option => {
            option.addEventListener('click', function() {
                store.currentCategory = this.dataset.category;
                store.applyFilters();
                
                const dropdownButton = this.closest('.dropdown').querySelector('.dropdown-toggle');
                dropdownButton.textContent = this.textContent;
            });
        });

        // Configurar barra de búsqueda
        document.getElementById('searchButton').addEventListener('click', function() {
            store.currentSearch = document.getElementById('searchInput').value;
            store.applyFilters();
        });

        document.getElementById('searchInput').addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                store.currentSearch = this.value;
                store.applyFilters();
            }
        });

        // Selector de idioma
        document.querySelectorAll('.btn-language').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.btn-language').forEach(b => {
                    b.classList.remove('active');
                });
                this.classList.add('active');
            });
        });
    }
   //aplicación de diferentes tipo de busquedas en el sidebar
    applyFilters() {
        
        this.filteredProducts = [...this.products];
        
        if (this.currentSearch) {
            const searchTerm = this.currentSearch.toLowerCase();
            this.filteredProducts = this.filteredProducts.filter(product => 
                product.title.toLowerCase().includes(searchTerm) || 
                product.description.toLowerCase().includes(searchTerm)
            );
        }
        
        if (this.currentCategory) {
            this.filteredProducts = this.filteredProducts.filter(
                product => product.category === this.currentCategory
            );
        }
        
        if (this.currentPriceFilter) {
            const price = parseFloat(this.currentPriceFilter);
            this.filteredProducts = this.filteredProducts.filter(
                product => product.price === price
            );
        }
        
        if (this.currentSort) {
            if (this.currentSort === 'price-asc') {
                this.filteredProducts.sort((a, b) => a.price - b.price);
            } else if (this.currentSort === 'price-desc') {
                this.filteredProducts.sort((a, b) => b.price - a.price);
            } else if (this.currentSort === 'az-asc') {
                this.filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
            } else if (this.currentSort === 'az-desc') {
                this.filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
            }
        }
        
        this.renderProducts();
    }
    
}

// Inicializar la tienda
const store = new Store();
store.executeRequest();
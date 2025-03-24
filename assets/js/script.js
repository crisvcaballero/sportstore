// Estado del carrito
let cart = [];

// Elementos del DOM
const cartCount = document.querySelector('.cart-count');
const addToCartButtons = document.querySelectorAll('.add-to-cart');

// Función para actualizar el contador del carrito
function updateCartCount() {
    cartCount.textContent = cart.length;
}

// Función para agregar productos al carrito
function addToCart(event) {
    const button = event.target;
    const productCard = button.closest('.product-card');
    const productName = productCard.querySelector('h3').textContent;
    const productPrice = productCard.querySelector('.price').textContent;
    
    cart.push({
        name: productName,
        price: productPrice
    });
    
    updateCartCount();
    
    // Animación de feedback
    button.textContent = '¡Agregado!';
    button.style.backgroundColor = '#27ae60';
    
    setTimeout(() => {
        button.textContent = 'Añadir al Carrito';
        button.style.backgroundColor = '';
    }, 2000);
}

// Agregar event listeners a los botones
addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
});

// Inicializar el contador del carrito
updateCartCount(); 
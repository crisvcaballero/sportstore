// Funciones principales de la aplicación
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el contador del carrito
    updateCartCount();
    
    // Inicializar los botones de "Añadir al Carrito"
    initializeAddToCartButtons();
});

// Función para actualizar el contador del carrito
function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cartItems.length;
    }
}

// Función para inicializar los botones de "Añadir al Carrito"
function initializeAddToCartButtons() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            const productName = this.parentElement.querySelector('h3').textContent;
            const productPrice = this.parentElement.querySelector('.price').textContent;
            const productImage = this.parentElement.querySelector('img').src;
            
            addToCart(productId, productName, productPrice, productImage);
        });
    });
}

// Función para añadir productos al carrito
function addToCart(productId, productName, productPrice, productImage) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    cartItems.push({
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage,
        quantity: 1
    });
    
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartCount();
    
    // Mostrar notificación
    showNotification('Producto añadido al carrito');
}

// Función para mostrar notificaciones
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
} 
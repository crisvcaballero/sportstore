document.addEventListener('DOMContentLoaded', function() {
    // Crear el banner de cookies
    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.innerHTML = `
        <p>Este es un proyecto de aprendizaje y no una tienda real. No se procesarán pagos ni se almacenarán datos personales.</p>
        <button onclick="this.parentElement.remove()">Entendido</button>
    `;
    
    // Estilos para el banner
    banner.style.cssText = `
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: #f8f9fa;
        padding: 1rem;
        text-align: center;
        box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
        z-index: 1000;
    `;
    
    // Añadir el banner al body
    document.body.appendChild(banner);
}); 
# SportStore - Tienda de Deportes

## Autora
Cristina V. Caballero
- Email: cristina.vcab@gmail.com
- GitHub: [Tu perfil de GitHub]

## Requisitos del Sistema
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Conexión a Internet
- Cuenta de Google para la integración con Google Sheets
- Editor de código (recomendado: Visual Studio Code)

## Instalación

### 1. Clonar el Repositorio
```bash
git clone [URL_DEL_REPOSITORIO]
cd ecommerce
```

### 2. Configurar el Entorno Local
1. Instala un servidor web local (opcional pero recomendado):
   - Python: `python -m http.server 8000`
   - Node.js: `npx serve`
   - PHP: `php -S localhost:8000`

2. Abre el proyecto en tu navegador:
   - Si usas servidor local: `http://localhost:8000`
   - Si no usas servidor: Abre `index.html` directamente

### 3. Configurar Google Sheets
[Instrucciones existentes de Google Sheets...]

## Personalización

### 1. Cambiar Colores y Estilos
1. Abre `assets/css/styles.css`
2. Modifica las variables CSS al inicio del archivo:
```css
:root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    --accent-color: #ffc107;
    --background-color: #f8f9fa;
    --text-color: #212529;
}
```

### 2. Añadir Nuevos Productos
1. Abre la página correspondiente (ej: `pages/football.html`)
2. Copia y modifica el bloque de producto:
```html
<div class="product-card">
    <img src="../assets/images/nuevo-producto.jpg" alt="Nuevo Producto">
    <h3>Nombre del Producto</h3>
    <p class="price">29.99€</p>
    <button class="add-to-cart">Añadir al Carrito</button>
    <a href="product-detail.html" class="view-details">Ver Detalles</a>
</div>
```

### 3. Modificar Categorías
1. Edita `index.html` para añadir/modificar categorías
2. Actualiza la navegación en todas las páginas
3. Crea nuevas páginas de categoría si es necesario

## Solución de Problemas Comunes

### 1. Los Productos no se Añaden al Carrito
- Verifica que el archivo `cart.js` está correctamente vinculado
- Comprueba la consola del navegador (F12) para ver errores
- Asegúrate de que los botones tienen la clase `add-to-cart`

### 2. Los Datos no se Guardan en Google Sheets
- Verifica que la URL de la API es correcta
- Comprueba que el script de Google Apps está desplegado
- Asegúrate de que la hoja de cálculo tiene los permisos correctos

### 3. Problemas de Diseño Responsive
- Verifica los media queries en `styles.css`
- Comprueba que las imágenes tienen tamaños adecuados
- Asegúrate de que los elementos flex/grid están configurados correctamente

### 4. Errores de Validación de Formularios
- Verifica que los campos requeridos están marcados
- Comprueba los patrones de validación en el HTML
- Asegúrate de que los mensajes de error están correctamente configurados

## Mantenimiento

### 1. Actualizar Productos
1. Modifica los archivos HTML correspondientes
2. Actualiza las imágenes en `assets/images/`
3. Verifica que los precios y descripciones son correctos

### 2. Limpiar Datos
1. Para limpiar el carrito: `localStorage.removeItem('cart')`
2. Para limpiar pedidos: `localStorage.removeItem('lastOrder')`

### 3. Backup de Datos
1. Exporta regularmente la hoja de Google Sheets
2. Guarda copias de seguridad de los archivos del proyecto

## Seguridad
- No compartas la URL de tu Google Apps Script
- Mantén actualizado tu navegador
- Verifica regularmente los permisos de Google Sheets
- No almacenes información sensible en el código

## Soporte
Para obtener ayuda:
1. Revisa la documentación
2. Consulta la sección de Solución de Problemas
3. Contacta al soporte técnico

## Configuración de Google Sheets

### 1. Crear la Hoja de Cálculo
1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja de cálculo
3. Añade las siguientes columnas en la primera fila:
   - Fecha
   - Número de Pedido
   - Nombre
   - Email
   - Dirección
   - Ciudad
   - Código Postal
   - País
   - Teléfono
   - Productos
   - Total

### 2. Configurar Google Apps Script
1. En tu hoja de cálculo, ve a Herramientas > Editor de Script
2. Copia y pega el siguiente código:

```javascript
function doGet(e) {
  try {
    // Obtener los datos
    var data = JSON.parse(decodeURIComponent(e.parameter.data));
    
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Formatear los productos para la hoja de cálculo
    var productos = data.items.map(item => 
      `${item.name} (${item.quantity}) - ${(item.price * item.quantity).toFixed(2)}€`
    ).join('; ');
    
    // Calcular el total
    var subtotal = data.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    var shipping = subtotal > 0 ? 5.99 : 0;
    var total = subtotal + shipping;
    
    // Añadir nueva fila
    sheet.appendRow([
      new Date(data.date),
      data.orderNumber,
      data.shipping.name,
      data.shipping.email,
      data.shipping.address,
      data.shipping.city,
      data.shipping.postalCode,
      data.shipping.country,
      data.shipping.phone,
      productos,
      total.toFixed(2) + '€'
    ]);
    
    // Devolver una imagen transparente de 1x1 píxel
    return ContentService.createTextOutput(
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
    ).setMimeType(ContentService.MimeType.TEXT);
    
  } catch (error) {
    console.error('Error:', error);
    return ContentService.createTextOutput(
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
    ).setMimeType(ContentService.MimeType.TEXT);
  }
}
```

3. Guarda el script

### 3. Desplegar el Script
1. Haz clic en "Desplegar" > "Nuevo despliegue"
2. Selecciona "Web app"
3. Configura:
   - Ejecutar como: "Yo"
   - Quién tiene acceso: "Cualquiera"
4. Haz clic en "Desplegar"
5. Copia la URL que te proporciona

### 4. Actualizar la URL en el Código
1. Abre el archivo `checkout.html`
2. Busca la constante `GOOGLE_SHEETS_API_URL`
3. Reemplaza la URL con la que copiaste en el paso anterior

## Estructura del Proyecto
```
ecommerce/
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── cart.js
│   └── images/
├── pages/
│   ├── football.html
│   ├── gym.html
│   ├── climbing.html
│   ├── swimming.html
│   ├── product-detail.html
│   ├── cart.html
│   ├── checkout.html
│   └── thank-you.html
└── index.html
```

## Funcionalidades
- Catálogo de productos por categorías deportivas
- Carrito de compras
- Proceso de checkout
- Validación de formularios
- Integración con Google Sheets para registro de pedidos
- Diseño responsive
- Animaciones y efectos visuales

## Tecnologías Utilizadas
- HTML5
- CSS3
- JavaScript (ES6+)
- Google Sheets API
- Google Apps Script 
# VIP WEAR — Marketplace de Estampados de Autor & Diseños Exclusivos

Plataforma web para conectar clientes y diseñadores/estampadores independientes. Permite a los compradores elegir prendas de alta calidad con estampados de autor o solicitar diseños personalizados directamente a los artistas, con gestión de roles, carrito interactivo y precios adaptados al mercado colombiano (COP).

---

## ✨ Características Principales

### 👥 1. Sistema de Inicio de Sesión & Roles
- **Rol Comprador:** Explora colecciones, filtra por estilos, personaliza prendas, añade al carrito de compras y solicita encargos personalizados a diseñadores.
- **Rol Vendedor / Diseñador:** Dispone de panel para publicar nuevos diseños con imágenes, precios en COP, técnica de estampado, y gestionar encargos recibidos de compradores.
- **Switch Rápido Demo (1-Clic):** Botones en el Navbar y en el modal de autenticación para alternar instantáneamente entre `🛍️ Comprador` y `🎨 Vendedor` sin necesidad de formularios.

### 🎨 2. Catálogo & Estética Minimalista
- Diseños sobrios y de autor: arte en trazo continuo, tipografía suiza, geometría zen, y composiciones botánicas.
- Búsqueda en tiempo real por palabras clave, estilo o diseñador.
- Filtros por estilo (*Línea Continua, Minimalista, Botánico & Zen, Tipográfico Suizo, Geométrico, Monocromático*).
- Filtros por tipo de prenda (*Camiseta Oversize 240g, Hoodie Premium, Sudadera Crewneck, Tote Bag*).
- Ordenamiento dinámico por popularidad, fecha, precio y calificación.

### 👕 3. Personalizador Pre-Compra
- **Visualizador dual:** Alterna entre ver la prenda completa (mockup) o el estampado original en alta resolución.
- **Prenda Base:** Selección entre Camiseta Oversize, Hoodie Polar, Sudadera o Tote Bag con ajuste dinámico de precio.
- **Color de Tela:** Muestras de color interactivas (Negro Carbón, Blanco Crudo / Oatmeal, Gris Carbón, Azul Noche, Verde Militar).
- **Tallas & Guía:** Selector de tallas (S, M, L, XL, 2XL) con tabla de medidas en centímetros.
- **Ubicación del Estampado:** Pecho frontal grande, espalda gigante o bolsillo discreto.

### ✉️ 4. Solicitud de Diseños Personalizados
- Contacto directo con el creador desde su perfil o ficha de producto.
- Formulario de encargo: tipo de proyecto (ilustración desde cero, adaptar diseño, logo), prenda sugerida, rango de presupuesto en COP y descripción del brief.
- Bandeja de solicitudes reflejada en tiempo real en el panel del vendedor.

### 🛒 5. Carrito de Compras & Checkout
- Drawer lateral con desglose por prenda, color, talla y técnica.
- Control de cantidades (+ / -) y eliminación de items.
- Cupón de descuento interactivo (puedes probar con el código promocional **`VIP10`**).
- Envío nacional asegurado ($ 12.000 COP o GRATIS en órdenes superiores a $ 150.000 COP).
- Simulación de confirmación de pedido con número de orden y seguimiento.

---

## 🛠️ Tecnologías Utilizadas

- **Framework:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Iconos:** [Lucide React](https://lucide.dev/)
- **Fuentes:** Plus Jakarta Sans & Space Grotesk (Google Fonts)
- **Moneda:** Pesos Colombianos (COP) mediante `Intl.NumberFormat`

---

## 🚀 Instalación y Ejecución Local

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/juanesovies-netizen/Estampados-Vip.git
   cd Estampados-Vip
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

4. **Compilar para producción:**
   ```bash
   npm run build
   ```

---

Desarrollado para el proyecto **Estampados VIP**.

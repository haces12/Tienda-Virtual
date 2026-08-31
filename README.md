# 2.  `Tienda-Virtual`

Aquí sí recomiendo un README más pequeño.

Tu código realmente tiene cosas interesantes: consume productos desde **Fake Store API**, tiene carrito persistente con `localStorage`, búsqueda, filtros, ordenamiento, cantidades, eliminación, detalles del producto, modo oscuro y un flujo de compra simulado. :contentReference[oaicite:3]{index=3}

```markdown
#  Tienda Virtual

Aplicación web de comercio electrónico desarrollada con HTML, CSS y
JavaScript.

El proyecto simula una tienda virtual donde los usuarios pueden consultar
productos, buscar y filtrar artículos y administrar un carrito de compras.

---

##  Descripción

La aplicación obtiene los productos mediante una API externa y los muestra
dinámicamente en la interfaz.

El usuario puede agregar productos al carrito, modificar cantidades,
eliminar productos y consultar el total de la compra.

El carrito se mantiene almacenado en `localStorage`, permitiendo conservar
los productos seleccionados aunque se recargue la página.

---

##  Funcionalidades

-  Visualización dinámica de productos.
-  Búsqueda de productos.
-  Filtrado por categoría.
-  Ordenamiento por precio.
-  Ordenamiento alfabético.
-  Agregar productos al carrito.
-  Aumentar cantidad.
-  Disminuir cantidad.
-  Eliminar productos.
-  Cálculo automático del total.
-  Persistencia del carrito mediante `localStorage`.
-  Modal con información detallada del producto.
-  Visualización de valoración del producto.
-  Modo oscuro.
-  Confirmaciones mediante SweetAlert2.
-  Flujo de pago simulado.

---

##  Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- Bootstrap Icons
- SweetAlert2
- LocalStorage
- Fetch API
- Fake Store API

---

## 🔌 API utilizada

Los productos son obtenidos desde:

```text
https://fakestoreapi.com/products

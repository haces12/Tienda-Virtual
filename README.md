
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
```
#Imagenes
![Banner de tienda](https://private-user-images.githubusercontent.com/130525712/643309257-1b2d2c20-b83a-4e8a-80b6-d00504a6c196.jpeg?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3ODgxNDMyMDEsIm5iZiI6MTc4ODE0MjkwMSwicGF0aCI6Ii8xMzA1MjU3MTIvNjQzMzA5MjU3LTFiMmQyYzIwLWI4M2EtNGU4YS04MGI2LWQwMDUwNGE2YzE5Ni5qcGVnP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9QUtJQVZDT0RZTFNBNTNQUUs0WkElMkYyMDI2MDgzMSUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNjA4MzFUMDIyMTQxWiZYLUFtei1FeHBpcmVzPTMwMCZYLUFtei1TaWduYXR1cmU9N2UwZjM2OGZjYjg0OTU5NTU3MjU2ZjQ3MDc3ZTA3ZTk2YjhiZTM2YmVkZmY0ZWM4Njc4YzU1NWE0YTA2YjJkNiZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QmcmVzcG9uc2UtY29udGVudC10eXBlPWltYWdlJTJGanBlZyJ9.TWarZhJ6UMMmEvC91WBGnkwLesmIobZtl0nEIezWNO8)

![Banner de tienda](https://private-user-images.githubusercontent.com/130525712/643309391-8deb4ae5-6ba8-42f3-883b-4d3d971076a8.jpeg?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3ODgxNDMyNDQsIm5iZiI6MTc4ODE0Mjk0NCwicGF0aCI6Ii8xMzA1MjU3MTIvNjQzMzA5MzkxLThkZWI0YWU1LTZiYTgtNDJmMy04ODNiLTRkM2Q5NzEwNzZhOC5qcGVnP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9QUtJQVZDT0RZTFNBNTNQUUs0WkElMkYyMDI2MDgzMSUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNjA4MzFUMDIyMjI0WiZYLUFtei1FeHBpcmVzPTMwMCZYLUFtei1TaWduYXR1cmU9ZDM3ZDE5NGY2NGMzMzJhN2JmNTk4ODcyYjJmNzJiNjBmZDk2ZGVjYjQwMjE4MmRiOTU3ZjE5ODRlMTY4OWFhZiZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QmcmVzcG9uc2UtY29udGVudC10eXBlPWltYWdlJTJGanBlZyJ9.YZhRKkGLXBnfAdrfNUyJhcvFZTkvPjngWUqsLF797BI)

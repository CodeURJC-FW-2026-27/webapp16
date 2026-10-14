# webapp16
# Bull and Pear

## Integrantes del equipo

* **Ismael Sakhisada García**
  * **Correo URJC:** i.sakhisada.2025@alumnos.urjc.es
  * **GitHub:** [@Sakhii-007](https://github.com/Sakhii-007)

* **Diego Fernández Martín**
  * **Correo URJC:** d.fernandezma.2025@alumnos.urjc.es
  * **GitHub:** [@Diego-Fdzz](https://github.com/Diego-Fdzz)

* **Sergio Fernández González**
  * **Correo URJC:** s.fernandezgo.2025@alumnos.urjc.es
  * **GitHub:** [@SergioFernandezURJC](https://github.com/SergioFernandezURJC)

* **Alejandro Delgado Merino**
  * **Correo URJC:** a.delgadom.2025@alumnos.urjc.es
  * **GitHub:** [@laalooo](https://github.com/laalooo)
   ## Funcionalidad

### Entidades
* **Entidad Principal:**
   * Representa los productos textiles comercializados en la plataforma.
  * **Atributos:**
    * `Nombre` (Texto)
    * `Descripción` (Texto largo)
    * `Precio` (Número decimal)
    * `Género` (Selección: Hombre, Mujer, Unisex)
    * `Tipo de producto` (Selección: Camiseta, Pantalón, Chaqueta, etc.)
    * `Color` (Texto / Selección)
    * `Talla` (Selección: XS, S, M, L, XL)
    * 
* **Entidad Secundaria:** `Reseña`
  * Relacionada con cada producto para complementar la información del artículo.
  * **Atributos (Reseñas):**
    * `Autor` (Texto)
    * `Puntuación` (Número del 1 al 5)
    * `Comentario` (Texto)
    * `Fecha` (Fecha)
 
   
      
      ### Imágenes

* Cada producto de ropa de la entidad principal tendrá asociada al menos una imagen junto con su descripción.

### Filtrado

* **Filtrado múltiple:** Formulario de filtrado avanzado que permitirá organizar y encontrar productos según:
  * Género
  * Tipo de producto
  * Color
  * Rango de precio



  ## Práctica 1
  ### Imágenes de las páginas
  * **Página principal**: ![Captura de pantalla de página principal](/Capturas%20de%20pantalla%20practica%201/Captura%20de%20pantalla%202026-10-14%20115618.png) ![Captura de pantalla de página principal](/Capturas%20de%20pantalla%20practica%201/Captura%20de%20pantalla%202026-10-14%20115633.png)

* **Página de detalle**: ![Captura de pantalla de página detalle](/Capturas%20de%20pantalla%20practica%201/Captura%20de%20pantalla%202026-10-14%20115653.png) ![Captura de pantalla de página detalle](/Capturas%20de%20pantalla%20practica%201/Captura%20de%20pantalla%202026-10-14%20115703.png)

* **Página de nuevo elemento**: ![Captura de pantalla de página nuevo elemento](/Capturas%20de%20pantalla%20practica%201/Captura%20de%20pantalla%202026-10-14%20115804.png) ![Captura de pantalla de página nuevo elemento](/Capturas%20de%20pantalla%20practica%201/Captura%20de%20pantalla%202026-10-14%20115810.png)


### Participaciones
* **Ismael:**
* He participado en la creación de la página principal y edición de la misma, modificando el grid dependiendo del tamaño de la pantalla. También he añadido la página de nuevo elemento em bruto para después corregir errores. Además de añadir la mayoria de imágenes

* Cinco commits más importantes

1. [Modificacion grid y cambios de estilo en la pagina principal](https://github.com/CodeURJC-FW-2026-27/webapp16/commit/ae25bc52b41a0e307c764525b3076abac77bb8d8)
2. [Creación página nuevo elemento](https://github.com/CodeURJC-FW-2026-27/webapp16/commit/71d3f1b17328c685f91d679d57e7d84512635a8e)
3. [Adición de colores en style.css](https://github.com/CodeURJC-FW-2026-27/webapp16/commit/b053ff84a1588810f0e4130615d23d1138d24e0f)
4. [Eliminación de código sobrante del boostrap](https://github.com/CodeURJC-FW-2026-27/webapp16/commit/984201bec7fd6b50f68b568bf2303faf08799b96)
5. [Corrección página nuevo elemento](https://github.com/CodeURJC-FW-2026-27/webapp16/commit/6ba4cfaf3b8b497f81ed2f42d19afd639672aec4)

* ficheros en los que participo

1. [index.html](https://github.com/CodeURJC-FW-2026-27/webapp16/blob/main/startbootstrap-shop-homepage-gh-pages/index.html)
2. [nuevo_elemento.html](https://github.com/CodeURJC-FW-2026-27/webapp16/blob/main/startbootstrap-shop-homepage-gh-pages/nuevo_elemento.html)
3. [página_detalle.html](https://github.com/CodeURJC-FW-2026-27/webapp16/blob/main/startbootstrap-shop-homepage-gh-pages/p%C3%A1gina_detalle.html)
4. [product-detail.css](https://github.com/CodeURJC-FW-2026-27/webapp16/blob/main/startbootstrap-shop-homepage-gh-pages/css/product-detail.css)
5. [styles.css](https://github.com/CodeURJC-FW-2026-27/webapp16/blob/main/startbootstrap-shop-homepage-gh-pages/css/styles.css)


* **Alejandro:**
* He participado en la creación de la página de detalle del producto y sus estilos CSS. También he completado el formulario de creación añadiendo desplegables para el tipo de producto y el género, un selector de imagen, un campo numérico para el precio y casillas para elegir varias tallas. Además, he corregido faltas de ortografía, traducido comentarios al inglés y actualizado los enlaces del catálogo para que apunten a la página de detalle.

* Cinco commits más importantes 

1. [Crear la página de detalle y sus estilos CSS](https://github.com/CodeURJC-FW-2026-27/webapp16/commit/99ad789ce5880c83ec6de69971de7339e1ec0f1e)
2. [Mejorar los campos de precio y tallas](https://github.com/CodeURJC-FW-2026-27/webapp16/commit/d85b65a454561c5487e22dbd735472c8152dc9d8)
3. [Añadir el selector de imagen](https://github.com/CodeURJC-FW-2026-27/webapp16/commit/6ae89f2871aa638c96a20234ffb54be8d9df4dae)
4. [Añadir la selección de género](https://github.com/CodeURJC-FW-2026-27/webapp16/commit/acceec269e04503ee1463067eb26466cda395170)
5. [Añadir el desplegable de tipo de producto](https://github.com/CodeURJC-FW-2026-27/webapp16/commit/6b017b11a829d8ecb59e07bdd9ee11c2a80c699f)

* ficheros en los que participo

1. [index.html](https://github.com/CodeURJC-FW-2026-27/webapp16/blob/main/startbootstrap-shop-homepage-gh-pages/index.html)
2. [nuevo_elemento.html](https://github.com/CodeURJC-FW-2026-27/webapp16/blob/main/startbootstrap-shop-homepage-gh-pages/nuevo_elemento.html)
3. [página_detalle.html](https://github.com/CodeURJC-FW-2026-27/webapp16/blob/main/startbootstrap-shop-homepage-gh-pages/p%C3%A1gina_detalle.html)
4. [product-detail.css](https://github.com/CodeURJC-FW-2026-27/webapp16/blob/main/startbootstrap-shop-homepage-gh-pages/css/product-detail.css)
5. [styles.css](https://github.com/CodeURJC-FW-2026-27/webapp16/blob/main/startbootstrap-shop-homepage-gh-pages/css/styles.css)


* **Sergio:**
* He participado en la pagina de detalle del producto y estilos, haciendo un diseño interactivo en las reseñas en las puntuaciones y fechas, también añadiendo perfiles en las reseñas para que sean usuarios los que las cuelguen y en la página principal he hecho que todos los botones de ver detalles funcionen redirigiendonos al producto de vaquero en detalle.
En la página de nuevo elemento he alineado las etiquetas y añadido márgenes.

* cinco commits
1. [Fechas en reseña realistas con un rango desde 2018-2030 en año](https://github.com/CodeURJC-FW-2026-27/webapp16/commit/f6d4f5fe911e36f4ac6d00cdb3f05c998a95b0e3) 
2. [rediseño de review, puntuacion interactiva y reseña con contador de caracteres](https://github.com/CodeURJC-FW-2026-27/webapp16/commit/41d1c68f708c86f2974e52f01a4669673bb16e83)
3. [fotos de perfil en las reseñas (pfp por defecto con iniciales)](https://github.com/CodeURJC-FW-2026-27/webapp16/commit/ccb97bd2f43706678416aa1bb1bba5a9e50ec3d1)
4. [correcion de la pagina de detalles de sergio y alejandro](https://github.com/CodeURJC-FW-2026-27/webapp16/commit/e9c9c408e08ac20e28d188d90af23795431016a2)
5. [cambio autor x usuario pagina detalle](https://github.com/CodeURJC-FW-2026-27/webapp16/commit/156246f1dbe8d8f3b7c9047ccb8fc8b44ea01f87)

* ficheros en los que participo

1. [index.html](https://github.com/CodeURJC-FW-2026-27/webapp16/blob/main/startbootstrap-shop-homepage-gh-pages/index.html)
2. [nuevo_elemento.html](https://github.com/CodeURJC-FW-2026-27/webapp16/blob/main/startbootstrap-shop-homepage-gh-pages/nuevo_elemento.html)
3. [página_detalle.html](https://github.com/CodeURJC-FW-2026-27/webapp16/blob/main/startbootstrap-shop-homepage-gh-pages/p%C3%A1gina_detalle.html)
4. [product-detail.css](https://github.com/CodeURJC-FW-2026-27/webapp16/blob/main/startbootstrap-shop-homepage-gh-pages/css/product-detail.css)



* **Diego:**
* He colaborado en la elaboración de la pagina principal, lo cual implica adición de imágenes de los productos y modificación en cada producto (información, precio, etc.). Por otro lado, he modificado la estética (colores y tamaños) del nav, header y footer. Tambien,he sustituido el contenido predeterminado por el que encaja con nuestro tema. He reestructurado el formulario y he modificado totalmente la estética para que concordase mejor con la estética general de la página.

* cinco commits 

1. [Modificación del formulario (reestructuración y estética)](https://github.com/CodeURJC-FW-2026-27/webapp16/commit/6d6734d902f5f3af8afeee2ad10279726c742346)
2. [Adición de imágenes](https://github.com/CodeURJC-FW-2026-27/webapp16/commit/994a479c5cb230ca33b60bfded0f3c8a35ce7ec3)
3. [Modificaciones del nav](https://github.com/CodeURJC-FW-2026-27/webapp16/commit/50bdd45130184a70febdf77566d35ef880ade39b)
4. [Modificación del footer](https://github.com/CodeURJC-FW-2026-27/webapp16/commit/994a479c5cb230ca33b60bfded0f3c8a35ce7ec3)
5. [Modificación header](https://github.com/CodeURJC-FW-2026-27/webapp16/commit/857653f37204fbafca3af464298e638b96a0ca31)


* ficheros en los que participo

1. [index.html](https://github.com/CodeURJC-FW-2026-27/webapp16/blob/main/startbootstrap-shop-homepage-gh-pages/index.html)
2. [styles.css](https://github.com/CodeURJC-FW-2026-27/webapp16/blob/main/startbootstrap-shop-homepage-gh-pages/css/styles.css)
3. [página_detalle.html](https://github.com/CodeURJC-FW-2026-27/webapp16/blob/main/startbootstrap-shop-homepage-gh-pages/p%C3%A1gina_detalle.html)
4. [product-detail.css](https://github.com/CodeURJC-FW-2026-27/webapp16/blob/main/startbootstrap-shop-homepage-gh-pages/css/product-detail.css)
5. [nuevo_elemento.html](https://github.com/CodeURJC-FW-2026-27/webapp16/blob/main/startbootstrap-shop-homepage-gh-pages/nuevo_elemento.html)
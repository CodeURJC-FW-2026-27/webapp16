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



      

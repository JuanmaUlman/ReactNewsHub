# Proyecto React News Hub

## Ulman Juan Manuel

El proyecto React News Hub es una solución diseñada para simplificar la gestión de noticias en un blog o sitio web desde la perspectiva del administrador. Está construido utilizando React Quill, una biblioteca de React que proporciona un editor de texto enriquecido (WYSIWYG). Con esta herramienta, puedes cargar noticias junto con su título, una breve descripción, y una imagen de portada, que se convierte en una representación en formato Base64 mediante una función incorporada. Además, puedes marcar una noticia como activa o inactiva; las noticias activas se muestran en el blog, mientras que las inactivas permanecen en la base de datos.

El editor ofrece una característica adicional: un botón de vista previa que abre un modal con una vista en tiempo real de cómo se verá el contenido en dispositivos móviles. Esto facilita la visualización y la edición del contenido final.

Una vez que completes y agregues una noticia, se almacenará en una base de datos en Firebase y se mostrará en el componente en la sección "Ver todas las noticias". Si una noticia está marcada como activa, también se mostrará con su título en la parte superior del componente para facilitar la administración.

El proyecto fue creado con Vite, una herramienta que ofrece características y eficiencia para el desarrollo de aplicaciones web en React. [Vite](https://github.com/vitejs/vite).

Como información adicional, este proyecto utiliza variables de entorno para garantizar la seguridad y privacidad de los datos almacenados en la base de datos de Firebase. Estas variables de entorno se utilizan para cifrar y proteger el contenido de la base de datos, asegurando que los datos sean accesibles solo para usuarios autorizados.

## Para levantar el proyecto, utilizar el siguiente comando en la consola:

### `npm run dev`

La App abre en el puerto [ http://localhost:5173/](http://localhost:5173/) del navegador.

## Las dependencias que se utilizaron en el proyecto son:

- [ ] firebase
- [ ] html-react-parser
- [ ] quill
- [ ] quill-image-resize-module
- [ ] react
- [ ] react-bootstrap
- [ ] react-dom
- [ ] react-quilljs
- [ ] react-router-dom
- [ ] dotenv

## Gif de un proceso de creacion y subida de una noticia.

<p>
<img src="./src/assets/ReactNewsHub.gif" alt="ReactNewsHub">
</p>

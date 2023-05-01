# proyecto-final-backend ecommerce

Comercio electrónico que permite a los navegantes convertirse en usuarios, clientes registrados que comprarán productos en stock disponibles. Se le adicionan algunos detalles como un chat donde se puede interactuar.
Se preserva información en la base de datos Mongoose Atlas de los usuarios, los productos, mensajes y las compras junto con datos útiles para el delivery, que tambien se traslada a través de mails.

Variables de entorno modificables en archivo ".env":

- PORT: puerto de escucha del servidor.
- MONGO_CONNECT: base de datos con usuario registrado en MongoDB.
- USER & PASS : correo electronico y token (permisos especificos) donde se guarda el registro de los nuevos usuarios en plataforma y confirmacion de compra .
- ACCOUNTSID, AUTHTOKEN & FROM: datos necesarios para confirmar la compra via whatsApp.

API que utiliza motor de plantilla pug, en donde se divide en dos carpetas: withoutUser y userLogged. Fuera de estas carpetas se encuentra un archivo intermediario entre ambos estados. Genera facilidad y orden al visualizar el codigo en su extensión desde el back end hasta front end.

---

Rutas sin usuario (withoutUser)

"/ {GET}": redirecciona al home.
"/login {GET}": formulario para iniciar sesión. Los campos requeridos son el e-mail y el password registrados anteriormente.
"/login {POST}": envia, compara con los datos existentes en la base de datos redirigiendo a la ruta /home si los datos del usuario son correctos. Si lo ingresado es incorrecto redirige a la ruta "/dologin/errordologin".
"/dologin/errordologin {GET}": pagina de error debido a datos incorrectos.
"/signup {GET}": formulario para registrar un nuevo usuario. Se requieren los campos nombre, apellido, dirección, edad, foto, celular, e-mail y password.
"/signup {POST}": en caso que lo enviado sea acertado se envian los datos del nuevo usuario a la base de datos redirigiendo al cliente a /home, si se envia información errónea redirige a "dosignup/errorregistration".
"dosignup/errorregistration {GET}": pagina de error debido a datos incorrectos.
"/home {GET}": página inicial, impresión inicial de nuestro ecommerce.
"/products {GET}": stocks de productos no disponibles, se debe iniciar sesión.

Rutas con usuario (userLogged)

"/ {GET}": redirecciona al home.
"/home {GET}": página inicial, impresión inicial de nuestro ecommerce.
"/products {GET}": stocks de productos disponibles.
"/products {POST}": facilita guardar nuevos productos en la base de datos, visibles en stocks de productos.
"/messages {GET}": se presenta un chat, sus mensajes vienen de la base de datos y posee campos a llenar para enviar mensajes nuevos.
"/cart {GET}": se presenta el carrito con los productos elegidos.
"/cart {POST}": se utiliza el id del producto cargar productos al carrito.
"/cart/product {POST}": posibilita borrar producto específico del carrito utilizando el id del producto.
"/cart {DELETE}": posibilita borrar todos los productos del carrito.
"/buy {POST}": finaliza la compra del contenido del carrito y se trasladan datos para avisar su confirmación.
"/logout {POST}": cerrar sesión.

---

Dependencias en uso

bcrypt, connect-mongo, cookie-parser, dotenv, express, express-session, log4js, mongoose, multer, nodemailer, nodemon, passport,passport-local, pug, socket.io & twilio

---

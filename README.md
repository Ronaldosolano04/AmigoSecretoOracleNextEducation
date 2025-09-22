🎁 Amigo Secreto - Aplicación Web
https://programorphosis.github.io/Challenge-AmigoSecreto/
📖 ¿Qué es esta aplicación?
Amigo Secreto es una aplicación web divertida y fácil de usar que te ayuda a organizar el sorteo de amigos secretos para cualquier celebración. Es perfecta para fiestas de Navidad, cumpleaños, o cualquier evento donde quieras hacer un intercambio de regalos sorpresa.

✨ Características principales:
✅ Agregar participantes fácilmente
✅ Sorteo automático y justo
✅ Interfaz bonita y fácil de usar
✅ Funciona en cualquier dispositivo (móvil, tablet, computadora)
✅ Notificaciones que te avisan si algo sale mal
✅ Puedes reiniciar el sorteo cuando quieras
✅ Modal elegante con animaciones para mostrar resultados
✅ Efectos visuales con confeti y gradientes modernos
🚀 ¿Cómo usar la aplicación?
Paso 1: Abrir la aplicación
Abre el archivo index.html en tu navegador web (Chrome, Firefox, Safari, etc.)
Verás una pantalla con gradiente azul-púrpura con el título "Amigo Secreto" y una imagen
Paso 2: Agregar participantes
En la sección con fondo degradado gris-beige, verás un campo de texto que dice "Escribe un nombre"
Escribe el nombre de una persona y haz clic en "Añadir"
El nombre aparecerá en una lista debajo
Repite el proceso para agregar todos los participantes
Importante: Necesitas al menos 2 personas para poder iniciar el sorteo
Paso 3: Iniciar el sorteo
Una vez que hayas agregado al menos 2 personas, aparecerá el botón "🎯 Iniciar Sorteo"
Haz clic en este botón para comenzar el proceso de sorteo
Esto habilitará la sección donde puedes asignar amigos secretos
Nota: Una vez iniciado el sorteo, se ocultará la sección de agregar participantes para evitar confusiones
Paso 4: Asignar amigos secretos
En la nueva sección que aparece, verás un campo que dice "Escribe tu nombre"
Escribe el nombre de la persona que quiere saber su amigo secreto
Haz clic en el botón rosa "Sortear amigo" (tiene un ícono de play)
¡Se abrirá un modal elegante con animaciones mostrando quién es su amigo secreto!
El modal incluye efectos de confeti y una presentación visual atractiva
Puedes cerrar el modal haciendo clic en la X, presionando Escape, o haciendo clic fuera del modal
Repite el proceso para cada persona hasta que todos tengan su amigo secreto
Paso 5: Reiniciar (opcional)
Si quieres hacer otro sorteo desde cero, haz clic en "🔄 Reiniciar Sorteo"
Esto borrará todos los nombres y podrás empezar de nuevo
📱 ¿En qué dispositivos funciona?
Esta aplicación está diseñada para funcionar perfectamente en:

📱 Móviles y tablets
iPhone y Android
Tablets iPad y Android
Se adapta automáticamente al tamaño de la pantalla
Botones grandes y fáciles de tocar
💻 Computadoras
Windows, Mac y Linux
Cualquier navegador moderno
Se ve perfecto en pantallas grandes
🌐 Navegadores compatibles
Google Chrome
Mozilla Firefox
Safari
Microsoft Edge
Opera
🔧 ¿Cómo está hecha la aplicación?
Archivos que componen la aplicación:
📄 index.html
Es como el "esqueleto" de la aplicación
Contiene toda la estructura visual
Define dónde van los títulos, botones y campos de texto
Incluye el modal integrado para mostrar resultados
🎨 style.css
Es como el "maquillaje" de la aplicación
Define los colores, tamaños y posiciones
Hace que se vea bonita en todos los dispositivos
Contiene las reglas para que funcione bien en móviles
Incluye todos los estilos del modal con animaciones
⚡ app.js
Es como el "cerebro" de la aplicación
Contiene toda la lógica y funcionalidad
Maneja el agregar nombres, hacer el sorteo, etc.
Controla las notificaciones y mensajes
Gestiona la apertura y cierre del modal integrado
🖼️ assets/
Carpeta con las imágenes
amigo-secreto.png - Imagen decorativa del header
play_circle_outline.png - Ícono del botón de sorteo
🎯 ¿Cómo funciona el sorteo?
Algoritmo del sorteo:
La aplicación toma todos los nombres que agregaste
Los mezcla de manera aleatoria (como barajar cartas)
Asigna a cada persona un amigo secreto diferente
Se asegura de que nadie se toque a sí mismo
Te muestra el resultado de manera clara
Reglas del sorteo:
✅ Necesitas al menos 2 personas para hacer el sorteo
✅ Cada persona tiene exactamente un amigo secreto
✅ Nadie puede ser su propio amigo secreto
✅ El sorteo es completamente aleatorio y justo
🔔 Sistema de notificaciones
La aplicación te avisa cuando algo importante pasa:

✅ Notificaciones de éxito:
"¡Nombre agregado correctamente!"
"¡Sorteo completado!"
❌ Notificaciones de error:
"Por favor, escribe un nombre válido"
"Este nombre ya está en la lista"
"Necesitas al menos 2 personas para el sorteo"
ℹ️ Notificaciones informativas:
"Lista de participantes vaciada"
🛠️ ¿Cómo personalizar la aplicación?
Cambiar colores:
Si quieres cambiar los colores, puedes editar el archivo style.css en la sección de variables:

:root {
    --color-primary: #667eea;           /* Azul suave moderno */
    --color-primary-light: #764ba2;     /* Púrpura suave para gradientes */
    --color-secondary: #f7fafc;         /* Gris muy claro, casi blanco */
    --color-secondary-warm: #fef7f0;    /* Beige muy suave */
    --color-button: #f093fb;            /* Rosa suave moderno */
    --color-button-hover: #f5576c;      /* Rosa más intenso para hover */
    --color-button-secondary: #4facfe;  /* Azul claro para botones secundarios */
    --color-button-secondary-hover: #00f2fe; /* Azul más claro para hover */
    --color-text: #2d3748;              /* Gris oscuro suave para texto */
    --color-success: #48bb78;           /* Verde suave para éxito */
    --color-error: #f56565;             /* Rojo suave para errores */
}
Cambiar textos:
Para cambiar los textos, edita el archivo index.html:

Títulos principales
Textos de botones
Mensajes de placeholder
Agregar más funcionalidades:
Si quieres agregar más características, puedes modificar el archivo app.js:

Guardar la lista de participantes
Exportar resultados
Agregar más validaciones
🚨 Solución de problemas
La aplicación no se abre:
Asegúrate de abrir el archivo index.html con un navegador web
Verifica que todos los archivos estén en la misma carpeta
No puedo agregar nombres:
Asegúrate de escribir algo en el campo de texto
Verifica que el nombre no esté vacío
Comprueba que no hayas agregado el mismo nombre antes
El sorteo no funciona:
Necesitas al menos 2 personas en la lista
Verifica que hayas escrito tu nombre en el campo correspondiente
Asegúrate de hacer clic en el botón naranja
Se ve mal en mi dispositivo:
La aplicación se adapta automáticamente a diferentes tamaños
Si se ve raro, intenta refrescar la página
Verifica que estés usando un navegador actualizado
📞 ¿Necesitas ayuda?
Si tienes alguna pregunta o problema con la aplicación:

Revisa esta documentación - La mayoría de dudas están respondidas aquí
Prueba reiniciar - A veces refrescar la página soluciona problemas
Verifica los archivos - Asegúrate de que todos los archivos estén presentes
🎉 ¡Disfruta tu Amigo Secreto!
Esta aplicación está diseñada para hacer que organizar un amigo secreto sea divertido y fácil. ¡Esperamos que la disfrutes y que tu intercambio de regalos sea un éxito!

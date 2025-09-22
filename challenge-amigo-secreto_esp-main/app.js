// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.

// ========================================
// FUNCIONALIDAD DE LOCALSTORAGE
// ========================================
// Esta aplicación usa localStorage para:
// 1. Guardar nombres cuando se agregan (función: guardarNombresEnLocalStorage)
// 2. Cargar nombres cuando se abre la página (función: cargarNombresDesdeLocalStorage)
// 3. Borrar nombres cuando se reinicia (función: borrarNombresDeLocalStorage)
//
// El localStorage es una API del navegador que permite guardar datos
// de forma persistente en el navegador del usuario.
// ========================================

const nombres = [];
const nombresDisponibles = []; // Lista de nombres disponibles para sorteo
const asignaciones = {}; // Registro de asignaciones realizadas
let isSorting = false;
let todosAsignadosNotificado = false; // Evita repetir mensaje final

// Seleccionar elementos HTML una sola vez
const elementos = {
    inputNombre: document.getElementById('amigo'),
    inputSortear: document.getElementById('nombreSortear'),
    listaAmigos: document.getElementById('listaAmigos'),
    resultado: document.getElementById('resultado'),
    toastContainer: document.getElementById('toast-container'),
    botonSortear: document.querySelector('.button-draw'),
    botonRecordar: document.querySelector('.button-req'),
    seccionSorteo: document.querySelector('.sorteo-section'),
    inputAgregarParticipante: document.querySelector('.input-section'),
    buttonStartSorteo: document.querySelector('.button-start-sorteo'),
    buttonRestart : document.querySelector('.button-restart'),
    nombresList : document.querySelector('.name-list'),
    modalOverlay2: document.getElementById('modalOverlay2'),
    instrucciones: document.getElementById('instruccionesJuego'),
};


//crea un objeto con colores cremas para asignar aleatopriamente de backgroun a los li de la funcion actualizarLIsta
const colores = {
    0: '#f5f5dc',
    1: '#ffe4c4',
    2: '#faf0e6',
    3: '#f0e68c',
    4: '#e6e6fa',
    5: '#dcdcdc',
    6: '#f0fff0',
    7: '#f0f8ff',
    8: '#f5f5f5',
    9: '#fffaf0',
    10: '#fdf5e6',
    11: '#f0ffff',
    12: '#fff0f5',

}

// ========================================
// FUNCIONES DE LOCALSTORAGE
// ========================================

/**
 * Guarda los nombres en localStorage
 * Esta función se ejecuta cada vez que se agrega un nuevo nombre
 */
const guardarNombresEnLocalStorage = () => {
    try {
        // Convertir el array de nombres a JSON y guardarlo en localStorage
        localStorage.setItem('amigoSecretoNombres', JSON.stringify(nombres));
        console.log('✅ Nombres guardados en localStorage:', nombres);
    } catch (error) {
        console.error('❌ Error al guardar nombres en localStorage:', error);
    }
};

/**
 * Carga los nombres desde localStorage
 * Esta función se ejecuta cuando se carga la página
 */
const cargarNombresDesdeLocalStorage = () => {
    try {
        // Obtener los nombres guardados en localStorage
        const nombresGuardados = localStorage.getItem('amigoSecretoNombres');
        
        if (nombresGuardados) {
            // Convertir el JSON de vuelta a array
            const nombresArray = JSON.parse(nombresGuardados);
            
            // Verificar que sea un array válido
            if (Array.isArray(nombresArray)) {
                // Limpiar los arrays actuales
                nombres.length = 0;
                nombresDisponibles.length = 0;
                
                // Agregar cada nombre a los arrays
                nombresArray.forEach(nombre => {
                    nombres.push(nombre);
                    nombresDisponibles.push(nombre);
                });
                
                // Actualizar la lista visual
                actualizarLista();
                
                // Mostrar/ocultar botón de iniciar sorteo según la cantidad de nombres
                if (nombres.length >= 2) {
                    elementos.buttonStartSorteo.style.display = 'block';
                } else {
                    elementos.buttonStartSorteo.style.display = 'none';
                }
                
                console.log('✅ Nombres cargados desde localStorage:', nombres);
                mostrarToast(`Se cargaron ${nombres.length} nombres guardados`, 'info');
            } else {
                console.warn('⚠️ Los datos en localStorage no son un array válido');
            }
        } else {
            console.log('ℹ️ No hay nombres guardados en localStorage');
        }
    } catch (error) {
        console.error('❌ Error al cargar nombres desde localStorage:', error);
        // Si hay error, limpiar localStorage para evitar problemas futuros
        localStorage.removeItem('amigoSecretoNombres');
    }
};

/**
 * Borra los nombres del localStorage
 * Esta función se ejecuta cuando se reinicia el sorteo
 */
const borrarNombresDeLocalStorage = () => {
    try {
        // Remover los nombres del localStorage
        localStorage.removeItem('amigoSecretoNombres');
        console.log('🗑️ Nombres borrados de localStorage');
    } catch (error) {
        console.error('❌ Error al borrar nombres de localStorage:', error);
    }
};

// Función para agregar nombres a la lsta
const agregarAmigo = () => {
    const nombre = elementos.inputNombre.value.trim().toLowerCase();
    
    if (!nombre) {
        mostrarToast('Por favor, ingresa un nombre válido.', 'error');
        return;
    }
    
    if (nombres.includes(nombre)) {
        mostrarToast('El nombre ya existe en la lista.', 'error');
        return;
    }
    
    // Agregar nombre a la lista principal
    nombres.push(nombre);
    nombresDisponibles.push(nombre);
    console.log(`✅ Nombre agregado: ${nombre}`);
    // Limpiar input
    elementos.inputNombre.value = '';
    
    // Actualizar lista visual
    actualizarLista();
    
    // Guardar nombres en localStorage después de agregar
    guardarNombresEnLocalStorage();
    
    // Mostrar mensaje de éxito
    mostrarToast(`${nombre.toUpperCase()} agregado exitosamente`, 'success');
    
    // Mostrar/ocultar botón de iniciar sorteo según la cantidad de nombres
    if (nombres.length >= 2) {
        elementos.buttonStartSorteo.style.display = 'block';
    } else {
        elementos.buttonStartSorteo.style.display = 'none';
    }

    // Actualizar instrucciones en fase de registro
    if (!isSorting) {
        actualizarInstrucciones(
            '📝 Registro de participantes',
            `Se han agregado <strong>${nombres.length}</strong> participante(s). Agrega más nombres. Debe haber un <strong>mínimo de 2</strong> y el número total debe ser <strong>par</strong> para habilitar el sorteo.`
        );
    }
};

// Función para mostrar toasts
const mostrarToast = (mensaje, tipo = 'info') => {
    const toast = document.createElement('div');
    toast.className = `toast toast-${tipo}`;
    
    const icono = tipo === 'error' ? '' : tipo === 'success' ? '' : 'ℹ️';
    
    toast.innerHTML = `
        <div class="toast-content">
            <span class="toast-icon">${icono}</span>
            <span class="toast-message">${mensaje}</span>
            <button class="toast-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    elementos.toastContainer.appendChild(toast);
    
    // Animación de entrada
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Auto-remover después de 4 segundos
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentElement) {
                toast.remove();
            }
        }, 300);
    }, 4000);
};

// Función para actualizar la lista visual
const actualizarLista = () => {
    if(nombres.length){
        elementos.nombresList.style.display='flex'
    }
    elementos.listaAmigos.innerHTML = '';
    nombres.forEach(nombre => {
        const li = document.createElement('li');
        li.textContent = nombre;
        li.style.background= colores[Math.floor(Math.random() * Object.keys(colores).length)];
        li.className = 'nombre-item';
        elementos.listaAmigos.appendChild(li);
    });
};
// Función para iiniciar el sorteo (mostrar la sección de sorteo)
const iniciarSorteo = () => {
    if (nombres.length < 2) {
        mostrarToast('Necesitas al menos 2 amigos para jugar.', 'error');
        return;
    }
    if (nombres.length % 2 !== 0) {
        mostrarToast('Necesitas un número par de nombres para poder jugar.', 'error');
        return;
    }
    
    if (isSorting) {
        mostrarToast('El sorteo ya ha sido iniciado.', 'error');
        return;
    }

    // Iniciar el proceso de sorteo
    isSorting = true;
    elementos.seccionSorteo.style.display = 'block';
    elementos.botonSortear.disabled = false;
    elementos.inputSortear.disabled = false;
    elementos.buttonStartSorteo.style.display = 'none'; // Ocultar botón de iniciar
    
    // Ocultar la sección de agregar participantes
    const inputSection = document.querySelector('.input-wrapper');
    const sectionTitle = document.querySelector('.section-title');
    const listaAmigos = document.getElementById('listaAmigos');
    
    if (inputSection) {
        inputSection.style.display = 'none';
    }
    if (sectionTitle) {
        sectionTitle.style.display = 'none';
    }
    if (listaAmigos) {
        listaAmigos.style.display = 'none';
    }
    
    mostrarToast('¡Sorteo iniciado! Ahora puedes asignar amigos secretos.', 'info');

    actualizarInstrucciones(
        '🎯 Sorteo en progreso',
        'Ahora cada participante, de uno en uno y en privado, debe escribir su nombre en el campo "Quién eres?" y presionar "Sortear amigo". El sistema le mostrará su amigo secreto en una ventana modal. Si lo olvida más adelante, podrá volver a escribir su nombre cuando todos hayan sido asignados y presionar "Recordar".'
    );
};

// Función para sortear amigo secreto individual
const sortearAmigo = () => {
    // Validar que el sorteo esté iniciado
    if (!isSorting) {
        mostrarToast('Primero debes iniciar el sorteo.', 'error');
        return;
    }
    
    // Validar que haya al menos 2 nombres en la lista
    if (nombres.length < 2) {
        mostrarToast('Necesitas al menos 2 nombres para realizar el sorteo.', 'error');
        return;
    }

    // Validar que el input de sortear tenga un valor
    const nombrePersona = elementos.inputSortear.value.trim().toLowerCase();
    
    if (!nombrePersona) {
        mostrarToast('Por favor, ingresa tu nombre para sortear tu amigo secreto.', 'error');
        return;
    }
    
    if (!nombres.includes(nombrePersona.toLowerCase())) {
        mostrarToast('Tu nombre no está en la lista. Primero debes agregarlo.', 'error');
        return;
    }
    
    if (asignaciones[nombrePersona]) {
        mostrarToast('Ya tienes un amigo secreto asignado.', 'error');
        elementos.modalOverlay2.style.display = 'flex';
        elementos.modalOverlay2.style.opacity = '0';
        setTimeout(() => {
            elementos.modalOverlay2.style.opacity = '1';
        }, 10);
        document.getElementById('resultPerson2').textContent = '';
        document.getElementById('resultAmigo2').textContent = asignaciones[nombrePersona];
        // Enfocar el modal para accesibilidad
        elementos.modalOverlay2.focus();
        if (Object.keys(asignaciones).length === nombres.length) {
            actualizarInstrucciones(
                '🔐 Consulta de asignaciones',
                'Todos los participantes ya tienen su amigo secreto. Si alguien olvidó su asignación, puede volver a escribir su nombre y presionar el botón "Recordar" para que la aplicación le muestre nuevamente el resultado.'
            );
        }
        return;
    }
    
    // Filtrar nombres disponibles (excluyendo a la persona misma y ya asignados)
    const disponibles = nombresDisponibles.filter(nombre => 
        nombre.toLowerCase() !== nombrePersona.toLowerCase() &&
        !Object.values(asignaciones).includes(nombre.toLowerCase())
    );
    
    if (disponibles.length === 0) {
        mostrarToast('No hay amigos disponibles para asignar.', 'error');
        return;
    }
    
    // Seleccionar amigo secreto aleatoriamente
    const amigoSecreto = disponibles[Math.floor(Math.random() * disponibles.length)];
    
    // Registrar la asignación
    asignaciones[nombrePersona] = amigoSecreto;
    
    // Eliminar el amigo secreto de la lista disponible
    const index = nombresDisponibles.indexOf(amigoSecreto);
    if (index > -1) {
        nombresDisponibles.splice(index, 1);
    }
    
    // Mostrar resultado
    mostrarResultado(nombrePersona, amigoSecreto);
    
    // Limpiar input
    elementos.inputSortear.value = '';
    
    // Verificar si todos tienen amigo secreto
    if (Object.keys(asignaciones).length === nombres.length) {
        mostrarToast('¡Todos los amigos secretos han sido asignados!', 'success');
        elementos.botonSortear.disabled = false;
        elementos.botonRecordar.style.display = 'flex';
        elementos.botonRecordar.disabled = false;
        elementos.botonSortear.style.display = 'none';
        console.log(asignaciones)
        // isSorting = false;
        if (!todosAsignadosNotificado) {
            todosAsignadosNotificado = true;
            actualizarInstrucciones(
                '✅ Todos asignados',
                '¡El sorteo ha finalizado! Ahora, si alguien olvidó a quién le toca, puede ingresar su nombre y usar el botón "Recordar" para ver nuevamente su amigo secreto. Mantengan el dispositivo en un lugar privado para que nadie más vea otras asignaciones.'
            );
        }
    }
 
};

// Función para mostrar el resultado del sorteo
const mostrarResultado = (persona, amigoSecreto) => {
    // Actualizar el contenido del modal
    document.getElementById('resultPerson').textContent = persona;
    document.getElementById('resultAmigo').textContent = amigoSecreto;
    
    // Mostrar el modal
    const modalOverlay = document.getElementById('modalOverlay');
    modalOverlay.style.display = 'flex';
    modalOverlay.style.opacity = '0';
    
    // Animar la entrada del modal
    setTimeout(() => {
        modalOverlay.style.opacity = '1';
    }, 10);
    
    // Enfocar el modal para accesibilidad
    modalOverlay.focus();
    
    // Mostrar mensaje de éxito
    mostrarToast('¡Resultado mostrado en el modal!', 'success');
};
const recargarPagina = (e) => {
    
}

// Función para cerrar el modal
const cerrarModal = () => {
    const modalOverlay = document.getElementById('modalOverlay');
    const modalOverlay2 = document.getElementById('modalOverlay2');
    modalOverlay.style.opacity = '0';
    modalOverlay.style.display = 'none';
    modalOverlay2.style.opacity = '0';
    modalOverlay2.style.display = 'none';
    setTimeout(() => {
        modalOverlay.style.display = 'none';
        modalOverlay2.style.display = 'none';
    }, 300);
};

//

// Hacer la función disponible globalmente
window.cerrarModal = cerrarModal;

// Función para reiniciar el sorteo
const reiniciarSorteo = () => {
    // Limpiar todas las listas y asignaciones
    nombres.length = 0;
    nombresDisponibles.length = 0;
    Object.keys(asignaciones).forEach(key => delete asignaciones[key]);
    
    // Limpiar la interfaz
   
    elementos.listaAmigos.innerHTML = '';
    elementos.inputNombre.value = '';
    elementos.inputSortear.value = '';
    
    // Resetear el estado
    isSorting = false;
    elementos.seccionSorteo.style.display = 'none';
    elementos.botonSortear.disabled = true;
    elementos.inputSortear.disabled = true;
    elementos.buttonStartSorteo.style.display = 'none';
    
    // Mostrar la sección de agregar participantes
    const inputSection = document.querySelector('.input-wrapper');
    const sectionTitle = document.querySelector('.section-title');
    const listaAmigos = document.getElementById('listaAmigos');
    
    if (inputSection) {
        inputSection.style.display = 'flex';
    }
    if (sectionTitle) {
        sectionTitle.style.display = 'block';
    }
    if (listaAmigos) {
        listaAmigos.style.display = 'block';
    }
    
    // Borrar nombres del localStorage cuando se reinicia
    borrarNombresDeLocalStorage();
    window.location.reload();
    mostrarToast('Sorteo reiniciado. Puedes volver a agregar participantes.', 'success');
    actualizarInstrucciones(
        '🔄 Nuevo sorteo',
        'Ingresa nuevamente los nombres de los participantes. Recuerda: mínimo 2 y cantidad par para comenzar.'
    );
};

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    // Configurar estado inicial
    elementos.botonSortear.disabled = true;
    elementos.inputSortear.disabled = true;
    elementos.seccionSorteo.style.display = 'none';
    elementos.buttonStartSorteo.style.display = 'none';
    
    // Cargar nombres guardados en localStorage al iniciar la página
    cargarNombresDesdeLocalStorage();
    // Instrucciones iniciales si no hay nombres cargados
    if (!nombres.length) {
        actualizarInstrucciones(
            '👋 Bienvenidos',
            'Paso 1: Cada participante (o alguien encargado) ingresa un nombre y presiona "Añadir". Paso 2: Cuando haya al menos 2 nombres y el total sea par, presiona "Iniciar Sorteo".'
        );
    }
    
    // Agregar evento Enter al input de agregar
    elementos.inputNombre.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            agregarAmigo();
        }
    });
    
    // Agregar evento Enter al input de sortear
    elementos.inputSortear.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sortearAmigo();
        }
    });
    
    // Event listeners para el modal
    const modalOverlay = document.getElementById('modalOverlay');
    
    // Cerrar modal con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.style.display === 'flex') {
            cerrarModal();
        }
    });
    
    // Cerrar modal haciendo clic fuera
    modalOverlay.addEventListener('click', (e) => {
        if (e.target.id === 'modalOverlay') {
            cerrarModal();
        }
    });
});

// ========================================
// INSTRUCCIONES DINÁMICAS
// ========================================
function actualizarInstrucciones(titulo, htmlTexto) {
    if (!elementos.instrucciones) return;
    elementos.instrucciones.innerHTML = `
        <h2 class="instructions-title">${titulo}</h2>
        <p class="instructions-text">${htmlTexto}</p>
    `;
}

// Hacer todas las funciones disponibles globalmente para los onclick del HTML
window.agregarAmigo = agregarAmigo;
window.iniciarSorteo = iniciarSorteo;
window.sortearAmigo = sortearAmigo;
window.reiniciarSorteo = reiniciarSorteo;
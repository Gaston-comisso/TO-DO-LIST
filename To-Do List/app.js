let tareas = []; // Array para almacenar las tareas

function agregarTarea() {
    let nuevaTareaTexto = document.getElementById("nuevaTarea").value;
    let horaSeleccionada = document.getElementById("horaTarea").value;

    if (nuevaTareaTexto === "" || horaSeleccionada === "") {
        alert("Campo vacío, ingrese una nueva tarea y seleccione una hora.");
        return;
    }

    // Crear objeto de tarea
    let nuevaTarea = {
        texto: nuevaTareaTexto,
        hora: horaSeleccionada
    };

    // Agregar la tarea a la lista
    tareas.push(nuevaTarea);
    actualizarLista();

    // Limpiar los campos
    document.getElementById("nuevaTarea").value = "";
    document.getElementById("horaTarea").value = "";
}

function actualizarLista() {
    // Limpiar la lista actual
    const listaTareas = document.getElementById("listaTareas");
    listaTareas.innerHTML = "";

    // Ordenar las tareas por hora
    tareas.sort((a, b) => a.hora.localeCompare(b.hora));

    // Crear elementos de lista para cada tarea
    tareas.forEach((tarea, index) => {
        let nuevaTarea = document.createElement("li");

        // Crear span para el texto de la tarea con la hora
        let textoTarea = document.createElement("span");
        textoTarea.textContent = `${tarea.texto} a las ${tarea.hora}`; // Mostrar la hora

        // Crear contenedor para los botones
        let contenedorBotones = document.createElement("div");
        contenedorBotones.className = "botones"; // Clase para estilo

        // Crear botón de eliminar
        let botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.className = "eliminar"; // Clase para estilo
        botonEliminar.onclick = function() {
            eliminarTarea(index);
        };

        // Crear botón de editar
        let botonEditar = document.createElement("button");
        botonEditar.textContent = "Editar";
        botonEditar.className = "editar"; // Clase para estilo
        botonEditar.onclick = function() {
            editarTarea(nuevaTarea, tarea, index);
        };

        // Añadir los botones al contenedor
        contenedorBotones.appendChild(botonEliminar);
        contenedorBotones.appendChild(botonEditar);

        // Añadir el texto y el contenedor de botones al elemento de la lista
        nuevaTarea.appendChild(textoTarea);
        nuevaTarea.appendChild(contenedorBotones);

        // Agregar la tarea a la lista
        listaTareas.appendChild(nuevaTarea);
    });
}

function eliminarTarea(index) {
    tareas.splice(index, 1); // Eliminar la tarea del array
    actualizarLista();
}

function editarTarea(tareaElemento, tarea, index) {
    // Creamos un input para editar la tarea
    let inputEditar = document.createElement("input");
    inputEditar.type = "text";
    inputEditar.value = tarea.texto; // Obtener solo el texto de la tarea

    // Creamos un input para editar la hora
    let inputHoraEditar = document.createElement("input");
    inputHoraEditar.type = "time";
    inputHoraEditar.value = tarea.hora;

    // Creamos un botón para guardar los cambios
    let botonGuardar = document.createElement("button");
    botonGuardar.textContent = "Guardar";
    botonGuardar.className = "guardar"; // Clase para estilo
    botonGuardar.onclick = function() {
        guardarEdicion(index, inputEditar.value, inputHoraEditar.value);
    };

    // Limpiamos la tarea actual y reemplazamos con los inputs y botón guardar
    tareaElemento.innerHTML = ""; // Limpia el contenido del elemento <li>
    tareaElemento.appendChild(inputEditar);
    tareaElemento.appendChild(inputHoraEditar);
    tareaElemento.appendChild(botonGuardar);
}

function guardarEdicion(index, nuevoTexto, nuevaHora) {
    // Verificamos si el nuevo texto no está vacío
    if (nuevoTexto === "" || nuevaHora === "") {
        alert("El campo no puede estar vacío");
        return;
    }

    // Actualizamos el objeto de la tarea en el array
    tareas[index] = { texto: nuevoTexto, hora: nuevaHora };

    // Actualizamos la lista
    actualizarLista();
}

// Función para limpiar la lista
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("botonLimpiar").onclick = function() {
        limpiarLista();
    };

    function limpiarLista() {
        tareas = []; // Reiniciar el array de tareas
        actualizarLista(); // Actualizar la lista visual
    }
});

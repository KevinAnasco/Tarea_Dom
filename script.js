function obtenerTareasDeLocalStorage() {
    const tareasGuardadas = localStorage.getItem('tareas');
    return tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
}

function guardarTareasEnLocalStorage() {
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

let tareas = obtenerTareasDeLocalStorage();

function actualizarContador() {
    const pendientes = tareas.filter(t => !t.completada).length;
    document.getElementById('contador-tareas').textContent = `Tareas pendientes: ${pendientes}`;
}

function agregarTarea() {
    const inputTarea = document.getElementById('titulo-tarea');
    const titulo = inputTarea.value.trim();
    const inputFecha = document.getElementById('fecha-tarea');
    const fecha = inputFecha.value;

    if (titulo === '') {
        alert('Por favor, escribe una tarea.');
        return;
    }

    tareas.push({ titulo, fecha, completada: false });
    guardarTareasEnLocalStorage();
    inputTarea.value = '';
    inputFecha.value = '';
    renderizarTareas();
}

function eliminarTarea(indice) {
    tareas.splice(indice, 1);
    guardarTareasEnLocalStorage();
    renderizarTareas();
}

function completarTarea(indice) {
    tareas[indice].completada = !tareas[indice].completada;
    guardarTareasEnLocalStorage();
    renderizarTareas();
}

function editarTarea(indice) {
    const nuevaTarea = prompt('Editar tarea:', tareas[indice].titulo);
    const nuevaFecha = prompt('Editar fecha (YYYY-MM-DD):', tareas[indice].fecha);

    if (nuevaTarea !== null && nuevaTarea.trim() !== '') {
        tareas[indice].titulo = nuevaTarea.trim();
    }

    if (nuevaFecha !== null && nuevaFecha.trim() !== '') {
        tareas[indice].fecha = nuevaFecha.trim();
    }

    guardarTareasEnLocalStorage();
    renderizarTareas();
}

function renderizarTareas() {
    const listaTareas = document.getElementById('lista-tareas');
    listaTareas.innerHTML = '';

    tareas.forEach((tarea, indice) => {
        const divTarea = document.createElement('div');
        divTarea.classList.add('tarea');
        if (tarea.completada) {
            divTarea.classList.add('tarea-completada');
        }

        divTarea.innerHTML = `
            <span class="texto-tarea">${tarea.titulo} - ${tarea.fecha}</span>
            <div class="botones-tarea">
                <button class="boton" onclick="completarTarea(${indice})">✔</button>
                <button class="boton-editar" onclick="editarTarea(${indice})">✏</button>
                <button class="boton-eliminar" onclick="eliminarTarea(${indice})">🗑</button>
            </div>
        `;

        listaTareas.appendChild(divTarea);
    });

    actualizarContador();
}

renderizarTareas();

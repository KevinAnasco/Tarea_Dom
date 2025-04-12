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
const recordatoriosActivos = [];
let recordatorioActual = "";
let recordatorioActualObj = null;

document.getElementById('guardar-btn').addEventListener('click', () => {
  const texto = document.getElementById('recordatorio').value;
  const fechaHoraInput = document.getElementById('fecha-hora').value;
  const repetir = document.getElementById('repetir').value;

  if (!fechaHoraInput || texto.trim() === '') {
    alert('Completa todos los campos.');
    return;
  }

  const fechaHora = new Date(fechaHoraInput);
  const now = new Date();
  let tiempoRestante = fechaHora - now;

  if (tiempoRestante <= 0) {
    alert('La fecha debe estar en el futuro.');
    return;
  }

  const recordatorioObj = {
    texto,
    fechaHora,
    repetir,
    timeoutID: null
  };

  function mostrarYRepetir() {
    recordatorioActual = recordatorioObj.texto;
    recordatorioActualObj = recordatorioObj;

    document.getElementById('modal-mensaje').textContent = `¡Es hora de tu recordatorio!: ${recordatorioActual}`;
    document.getElementById('modal').style.display = 'flex';

    let nuevaFecha = new Date();
    switch (repetir) {
      case 'diaria':
        nuevaFecha.setDate(nuevaFecha.getDate() + 1);
        break;
      case 'semanal':
        nuevaFecha.setDate(nuevaFecha.getDate() + 7);
        break;
      case 'mensual':
        nuevaFecha.setMonth(nuevaFecha.getMonth() + 1);
        break;
      default:
        return;
    }

    const nuevoTiempo = nuevaFecha - new Date();
    recordatorioObj.timeoutID = setTimeout(mostrarYRepetir, nuevoTiempo);
  }

  recordatorioObj.timeoutID = setTimeout(mostrarYRepetir, tiempoRestante);
  recordatoriosActivos.push(recordatorioObj);
  agregarALaLista(recordatorioObj);

  document.getElementById('mensaje').textContent = "¡Recordatorio guardado!";
  document.getElementById('recordatorio').value = '';
  document.getElementById('fecha-hora').value = '';
});

function agregarALaLista(recordatorioObj) {
  const lista = document.getElementById('lista-recordatorios');
  const li = document.createElement('li');

  const infoSpan = document.createElement('span');
  infoSpan.textContent = `${recordatorioObj.texto} - ${new Date(recordatorioObj.fechaHora).toLocaleString()} (${recordatorioObj.repetir})`;

  const btnEliminar = document.createElement('button');
  btnEliminar.textContent = 'Eliminar';
  btnEliminar.className = 'btn-eliminar';

  btnEliminar.addEventListener('click', () => {
    clearTimeout(recordatorioObj.timeoutID);
    lista.removeChild(li);
    const index = recordatoriosActivos.indexOf(recordatorioObj);
    if (index > -1) recordatoriosActivos.splice(index, 1);
  });

  li.appendChild(infoSpan);
  li.appendChild(btnEliminar);
  lista.appendChild(li);
}

document.getElementById('cerrar-modal').addEventListener('click', () => {
  document.getElementById('modal').style.display = 'none';
});

document.getElementById('posponer-btn').addEventListener('click', () => {
  const minutos = parseInt(document.getElementById('minutos-posponer').value);
  if (isNaN(minutos) || minutos < 1) {
    alert("Ingresa una cantidad válida de minutos.");
    return;
  }

  document.getElementById('modal').style.display = 'none';

  const nuevoTiempo = minutos * 60 * 1000;
  recordatorioActualObj.timeoutID = setTimeout(() => {
    document.getElementById('modal-mensaje').textContent = `¡Recordatorio pospuesto!: ${recordatorioActual}`;
    document.getElementById('modal').style.display = 'flex';
  }, nuevoTiempo)
});

document.getElementById('btn-whatsapp').addEventListener('click', () => {
  window.open('https://wa.me/', '_blank');
});
messaging.getToken({ vapidKey: 'BKF9GqBGNb73nAhqNbujIG6OE7p04lXHTKr09DsjsREKDVsQxoCxawhtAVPqu7Is_x3zrvsyCgPrQrYu3yBubBk' })
.then((currentToken) => {
  if (currentToken) {
    alert('Token FCM:\n' + currentToken);  // <- esto muestra el token como alerta
  } else {
    alert('No se pudo obtener el token.');
  }
});

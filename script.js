let totalEntradas = 0;
let totalSalidas = 0;
let movimientos = [];

const ctx = document.getElementById('grafico').getContext('2d');
const grafico = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Entradas', 'Salidas'],
    datasets: [{
      label: 'Monto',
      data: [totalEntradas, totalSalidas],
      backgroundColor: ['#4CAF50', '#f44336'],
      borderColor: ['#388E3C', '#D32F2F'],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

function registrarEntrada() {
  const monto = obtenerMonto();
  const razon = document.getElementById('razon').value;
  if (monto !== null && razon.trim() !== '') {
    totalEntradas += monto;
    registrarMovimiento('entrada', monto, razon);
    actualizarVista();
    actualizarGrafico();
    document.getElementById('razon').value = '';
  } else {
    alert('Ingresa un monto válido y una razón.');
  }
}

function registrarSalida() {
  const monto = obtenerMonto();
  const razon = document.getElementById('razon').value;
  if (monto !== null && razon.trim() !== '') {
    totalSalidas += monto;
    registrarMovimiento('salida', monto, razon);
    actualizarVista();
    actualizarGrafico();
    document.getElementById('razon').value = '';
  } else {
    alert('Ingresa un monto válido y una razón.');
  }
}

function obtenerMonto() {
  const input = document.getElementById('monto');
  const valor = parseFloat(input.value);
  if (isNaN(valor) || valor <= 0) {
    alert('Ingresa un monto válido');
    return null;
  }
  input.value = '';
  return valor;
}

function actualizarVista() {
  document.getElementById('totalEntradas').textContent = totalEntradas.toFixed(2);
  document.getElementById('totalSalidas').textContent = totalSalidas.toFixed(2);
}

function actualizarGrafico() {
  grafico.data.datasets[0].data = [totalEntradas, totalSalidas];
  grafico.update();
}

function registrarMovimiento(tipo, monto, razon) {
  const fechaHora = new Date().toLocaleString();
  movimientos.unshift({ tipo, monto, razon, fechaHora });
  actualizarHistorial();
}

function actualizarHistorial() {
  const lista = document.getElementById('listaMovimientos');
  lista.innerHTML = movimientos.length === 0
    ? '<p class="sin-movimientos">No hay movimientos registrados aún.</p>'
    : movimientos.map(mov => `
        <div class="movimiento ${mov.tipo}">
          <span><strong>${mov.fechaHora}</strong></span>
          <span>${mov.razon}</span>
          <span>$${mov.monto.toFixed(2)}</span>
        </div>
      `).join('');
}
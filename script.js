let totalEntradas = 0;
let totalSalidas = 0;

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
  if (monto !== null) {
    totalEntradas += monto;
    actualizarVista();
    actualizarGrafico();
  }
}

function registrarSalida() {
  const monto = obtenerMonto();
  if (monto !== null) {
    totalSalidas += monto;
    actualizarVista();
    actualizarGrafico();
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
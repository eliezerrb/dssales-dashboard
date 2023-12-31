import { ApexOptions } from 'apexcharts';
import { SalesByDate } from '../../types';

export const chartOptions = {
  legend: {
    show: false
  },
  noData: {
    text: 'Sem resultados',
    align: 'center',
    verticalAlign: 'middle',
    offsetY: -15,
    style: {
      color: '#FFF',
      fontSize: '18px',
      fontFamily: 'Roboto, sans-serif'
    }
  },
  chart: {
    foreColor: '#b4bed2',
    height: 240,
    with: 1000
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '20%',
      endingShape: 'rounded'
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: false
  },
  xaxis: {
    type: 'datetime'
  },
  yaxis: {},
  fill: {
    opacity: 1,
    colors: ['#3e82f7']
  },
  tooltip: {
    theme: 'dark',
    y: {
      formatter: function (val: number) {
        return `R$ ${val}`;
      }
    }
  }
} as ApexOptions;

// Convertendo o que vem do backend para o apexChart entender
// Para cada sales eu extraiu a data e o sum e coloco no eixo x e y do obj
export const buildChartSeries = (salesByDate: SalesByDate[] = []) => {
  return salesByDate.map(({ date, sum }) => ({
    x: date,
    y: sum
  }));
};

// reduce - compactar os valores em um apenas
// previusValue - valor anterior ou acumulador
// currentValue.sum ou atributo sum
export const sumSalesByDate = (salesByDate: SalesByDate[] = []) => {
  return salesByDate.reduce((previusValue, currentValue) => {
    return previusValue + currentValue.sum;
  }, 0);
};

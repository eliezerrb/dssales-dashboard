import { useEffect, useMemo, useState } from 'react';
import { buildChartSeries, chartOptions, sumSalesByDate } from './helpers';
import './styles.css';
import ReactApexChart from 'react-apexcharts';
import { buildFilterParams, makeRequest } from '../../utils/request';
import { ChartSeriesData, FilterData, SalesByDate } from '../../types';
import { formartPrice, formatDate } from '../../utils/formatters';

type Props = {
  filterData?: FilterData;
};

function SalesByDateComponent({ filterData }: Props) {
  const [chartSeries, setCharSeries] = useState<ChartSeriesData[]>([]);
  const [totalSum, setTotalSum] = useState(0);

  // useMemo - para evitar looping, ele memoriza o valor do filtro e somente quando o filtro muda que gera uma nova referencia do filtro
  const params = useMemo(() => buildFilterParams(filterData), [filterData]);

  useEffect(() => {
    makeRequest
      .get<SalesByDate[]>('sales/by-date', { params })
      .then((response) => {
        const newChartSeries = buildChartSeries(response.data);
        setCharSeries(newChartSeries);
        const newTotalSum = sumSalesByDate(response.data);
        setTotalSum(newTotalSum);
      })
      .catch(() => {
        console.log('Error to fetch sales by date');
      });
  }, [params]);

  return (
    <div className="sales-by-date-container base-card">
      <div>
        <h4 className="sales-by-date-title">Evolução das vendas</h4>
        {filterData?.dates && (
          <span className="sales-by-date-period">
            {formatDate(filterData?.dates?.[0])} até {formatDate(filterData?.dates?.[1])}
          </span>
        )}
      </div>
      <div className="sales-by-date-data">
        <div className="sales-by-date-quantity-container">
          <h2 className="sales-by-date-quantity">{formartPrice(totalSum)}</h2>
          <span className="sales-by-date-quantity-label">Vendas no período</span>
          <span className="sales-by-date-quantity-description">
            O gráfico mostra as vendas em todas as lojas
          </span>
        </div>
        <div className="sales-by-date-chart">
          {/*options - configurações do gráfico */}
          <ReactApexChart
            options={chartOptions}
            series={[{ name: 'Vendas', data: chartSeries }]}
            type="bar"
            height={240}
            width="100%"
          />
        </div>
      </div>
    </div>
  );
}

export default SalesByDateComponent;

import SalesSummaryCard from './sales-summary-card';
import './styles.css';
import { ReactComponent as AvatarIcon } from '../../assets/avatar-icon.svg';
import { ReactComponent as BarChartIcon } from '../../assets/bar-chart-icon.svg';
import { ReactComponent as DoneIcon } from '../../assets/done-icon.svg';
import { ReactComponent as SyncIcon } from '../../assets/sync-icon.svg';
import { FilterData, SalesSumaryData } from '../../types';
import { useEffect, useMemo, useState } from 'react';
import { buildFilterParams, makeRequest } from '../../utils/request';

type Props = {
  filterData?: FilterData;
};

const initialSumary = {
  sum: 0,
  min: 0,
  max: 0,
  avg: 0,
  count: 0
};

function SalesSummary({ filterData }: Props) {
  const [sumary, setSumary] = useState<SalesSumaryData>(initialSumary);

  // useMemo - para evitar looping, ele memoriza o valor do filtro e somente quando o filtro muda que gera uma nova referencia do filtro
  const params = useMemo(() => buildFilterParams(filterData), [filterData]);

  useEffect(() => {
    makeRequest
      .get<SalesSumaryData>('sales/summary', { params })
      .then((response) => {
        setSumary(response.data);
      })
      .catch(() => {
        console.log('Error to fetch sales summary');
      });
  }, [params]);

  return (
    <div className="sales-summary-container">
      <SalesSummaryCard value={sumary?.avg?.toFixed(2)} label="Média" icon={<DoneIcon />} />
      <SalesSummaryCard value={sumary?.count} label="Quantidade" icon={<SyncIcon />} />
      <SalesSummaryCard value={sumary?.min} label="Mínima" icon={<BarChartIcon />} />
      <SalesSummaryCard value={sumary?.max} label="Máxima" icon={<AvatarIcon />} />
    </div>
  );
}

export default SalesSummary;

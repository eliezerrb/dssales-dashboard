import SalesSummaryCard from './sales-summary-card';
import './styles.css';
import { ReactComponent as AvatarIcon } from '../../assets/avatar-icon.svg';
import { ReactComponent as BarChartIcon } from '../../assets/bar-chart-icon.svg';
import { ReactComponent as DoneIcon } from '../../assets/done-icon.svg';
import { ReactComponent as SyncIcon } from '../../assets/sync-icon.svg';

function SalesSummary() {
  return (
    <div className="sales-sumary-container">
      <SalesSummaryCard valeu={430} label="Média" icon={<DoneIcon />} />
      <SalesSummaryCard valeu={630} label="Quantidade" icon={<SyncIcon />} />
      <SalesSummaryCard valeu={130} label="Mínima" icon={<BarChartIcon />} />
      <SalesSummaryCard valeu={230} label="Máxima" icon={<AvatarIcon />} />
    </div>
  );
}

export default SalesSummary;

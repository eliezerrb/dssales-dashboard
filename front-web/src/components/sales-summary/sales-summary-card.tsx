import React from 'react';
import './styles.css';

type Props = {
  valeu: number;
  label: string;
  icon: React.ReactNode;
};

function SalesSummaryCard({ valeu, label, icon }: Props) {
  return (
    <div className="sales-sumary-card base-card">
      {icon}
      <h3 className="sales-sumary-card-value">{valeu}</h3>
      <span className="sales-sumary-card-label">{label}</span>
    </div>
  );
}

export default SalesSummaryCard;

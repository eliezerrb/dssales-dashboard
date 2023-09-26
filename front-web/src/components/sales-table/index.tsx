import { useEffect, useMemo, useState } from 'react';
import './styles.css';
import { buildFilterParams, makeRequest } from '../../utils/request';
import { FilterData, Gender, Sales, SalesResoponse } from '../../types';
import { formartPrice, formatDate } from '../../utils/formatters';

type Props = {
  filterData?: FilterData;
};

function SalesTable({ filterData }: Props) {
  const [sales, setSales] = useState<Sales[]>([]);

  const params = useMemo(() => buildFilterParams(filterData), [filterData]);

  useEffect(() => {
    makeRequest
      .get<SalesResoponse>('sales', { params })
      .then((response) => {
        setSales(response.data.content);
      })
      .catch(() => {
        console.log('Error to fetch sales');
      });
  }, [params]);

  const formatGender = (gender: Gender) => {
    const textByGender = {
      MALE: 'Masculino',
      FEMALE: 'Feminino',
      OTHER: 'Outros'
    };

    return textByGender[gender];
  };

  return (
    <div className="sales-table-container base-card">
      <h3 className="sales-table-title"> Vendas recentes </h3>
      <table className="sales-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Data</th>
            <th>Gênero</th>
            <th>Categoria</th>
            <th>Loja</th>
            <th>Forma de pagamento</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale.id}>
              <td>#{sale.id}</td>
              <td>{formatDate(sale.date)}</td>
              <td>{formatGender(sale.gender)}</td>
              <td>{sale.categoryName}</td>
              <td>{sale.storeName}</td>
              <td>{sale.paymentMethod}</td>
              <td>{formartPrice(sale.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SalesTable;

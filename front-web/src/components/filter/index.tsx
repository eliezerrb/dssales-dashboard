import './styles.css';
import 'flatpickr/dist/themes/material_green.css';
import FlatPickerLib from 'flatpickr';
import { Portuguese } from 'flatpickr/dist/l10n/pt';

import FlatPicker from 'react-flatpickr';

FlatPickerLib.localize(Portuguese);

function Filter() {
  // Ao selecionar uma data ele retorna uma lista de datas
  const onChangeDate = (dates: Date[]) => {
    console.log(dates);
  };

  return (
    <div className="filter-container base-card">
      <FlatPicker
        options={{
          // range de datas
          mode: 'range',
          // Y porque vamos querer somente os primeiros caracteres do ano
          dateFormat: 'd/m/Y',
          showMonths: 2
        }}
        className="filter-input"
        onChange={onChangeDate}
        placeholder="Selecione um período"
      />
      <select className="filter-input">
        <option value="">Selecione um gênero</option>
        <option value="MALE">Masculino</option>
        <option value="FEMALE">Feminino</option>
        <option value="OTHER">Outro</option>
      </select>
    </div>
  );
}

export default Filter;

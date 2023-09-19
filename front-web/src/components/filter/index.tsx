import './styles.css';
import 'flatpickr/dist/themes/material_green.css';
import FlatPickerLib from 'flatpickr';
import { Portuguese } from 'flatpickr/dist/l10n/pt';

import FlatPicker from 'react-flatpickr';
import { useState } from 'react';
import { FilterData, Gender } from '../../types';

FlatPickerLib.localize(Portuguese);

type Props = {
  onFilterChange: (filter: FilterData) => void;
};

function Filter({ onFilterChange }: Props) {
  const [dates, setDates] = useState<Date[]>([]);
  const [gender, setGender] = useState<Gender>();

  // Ao selecionar uma data ele retorna uma lista de datas
  const onChangeDate = (dates: Date[]) => {
    // só atualizo se tiver selecionado as duas datas
    if (dates.length === 2) {
      setDates(dates);
      onFilterChange({ dates, gender });
    }
  };

  const onChangeGender = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedGender = event.target.value as Gender;
    setGender(selectedGender);
    // usar selectedGender para ter a garantia que terá o valor atualizado, pois toda a mudança de estado é operação assincrona, se não tivesse o selectedGender teria que fazer useEfect passando a dependencia
    onFilterChange({ dates, gender: selectedGender });
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
      <select className="filter-input" value={gender} onChange={onChangeGender}>
        <option value="">Selecione um gênero</option>
        <option value="MALE">Masculino</option>
        <option value="FEMALE">Feminino</option>
        <option value="OTHER">Outro</option>
      </select>
    </div>
  );
}

export default Filter;

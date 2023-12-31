// Intl - API do JavaScript de internacionalização
// minimumFractionDigits - Números depois da virgula
// currency: 'BRL' - Moeda brasileira

export const formartPrice = (price: number) => {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    style: 'currency',
    currency: 'BRL'
  }).format(price);
};

export const formatDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString();
};

export const formatDateToServer = (date?: Date) => {
  if (date) {
    // Se a data existir formato ela e corto os 10 primeiros caracteres
    return date.toISOString().substring(0, 10);
  }
};

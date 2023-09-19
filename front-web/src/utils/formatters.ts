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

export const formatDate = (date: Date) => {
  return date.toLocaleDateString();
};

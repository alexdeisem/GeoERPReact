const locale = 'ru-Ru';
const currency = 'BYN';

const formatNumberAsCurrency = (number) => {
  return Number(number)
    .toLocaleString(locale, { style: 'currency', currency: currency })
    .replace(',', '.');
}

export { formatNumberAsCurrency };
import { formatNumberAsCurrency } from 'helpers';

function CurrencyCell(props) {
  const formatNum = (number) => {
    if (!number) {
      return '0.00';
    }

    return formatNumberAsCurrency(number).replace('BYN', '');
  }

  return (
    <span style={{fontStyle: "italic"}}>
      {formatNum(props.value)}
    </span>
  )
}

export { CurrencyCell }
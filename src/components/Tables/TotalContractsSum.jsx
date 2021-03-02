import { formatNumberAsCurrency } from '../../helpers';

export function TotalContractsSum(props) {
  return (
    <span style={props.style}>
      {formatNumberAsCurrency(props.value)}
    </span>
  )
}
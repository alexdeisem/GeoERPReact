import { Table } from 'rsuite';
import { reachNestedValue } from '../../../helpers'; 

const { Cell } = Table;

function NumberCell({rowData, dataKey, ...props}) {
  const formatNum = (number) => {
    if (!number) {
      return '0.00';
    }

    return (Math.round((+number + Number.EPSILON) * 100) / 100).toFixed(2);
  }

  return (
    <Cell {...props}>
      <span style={{fontStyle: "italic"}}>
        {formatNum(reachNestedValue(rowData, dataKey))}
        </span>
    </Cell>
  )
}

export { NumberCell }
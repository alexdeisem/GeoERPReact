import { Table } from 'rsuite';
import { reachNestedValue } from '../../../helpers';

const { Cell } = Table;

function DateCell({rowData, dataKey, ...props}) {
  const toLocaleDate = (stringDate) => {
    return new Date(stringDate).toLocaleDateString();
  }

  return (
    <Cell {...props}>
      {toLocaleDate(reachNestedValue(rowData, dataKey))}
    </Cell>
  )
};

export { DateCell };
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'rsuite';
import TablePagination from 'rsuite/lib/Table/TablePagination';

import { getContracts } from '../../store/contracts/contractsActions';
import { DateCell, NumberCell } from './cells';

const { Column, HeaderCell, Cell, Pagintaion } = Table;



export function ContractsTable() {
  const contracts = useSelector(state => state.contracts.contracts);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const contractTable = (
    <div>
      <Table
        bordered
        cellBordered
        wordWrap
        autoHeight={true}
        data={contracts}
        loading={isLoading}
        rowHeight={36}
      >
        <Column width={90} align="left" fixed sortable>
          <HeaderCell>
            Номер
          </HeaderCell>
          <Cell dataKey="number" />
        </Column>

        <Column width={100} align="left" fixed sortable>
          <HeaderCell>
            Дата
          </HeaderCell>
          <DateCell dataKey="contract_date" />
        </Column>

        <Column width={100} align="left" fixed sortable>
          <HeaderCell>
            Дата завер.
          </HeaderCell>
          <DateCell dataKey="contract_date" />
        </Column>

        <Column width={250} align="left" fixed sortable>
          <HeaderCell>
            Заказчик
          </HeaderCell>
          <Cell dataKey="customer">
            {rowData => rowData.customer.short_name}
          </Cell>
        </Column>

        <Column width={100} align="right" sortable>
          <HeaderCell>
            Баланс
          </HeaderCell>
          <NumberCell dataKey="customer.account.balance" />
        </Column>

        <Column flexGrow={2} align="left" sortable>
          <HeaderCell>
            Объект
          </HeaderCell>
          <Cell dataKey="contract_object" />
        </Column>

        <Column width={100} align="right" sortable>
          <HeaderCell>
            Сумма
          </HeaderCell>
          <NumberCell dataKey="sum" />
        </Column>

        <Column width={100} align="right" sortable>
          <HeaderCell>
            Бюджет
          </HeaderCell>
          <NumberCell dataKey="budget" />
        </Column>

        <Column width={100} sortable>
          <HeaderCell>
            Статус
          </HeaderCell>
          <Cell dataKey="status"/>
        </Column>
      </Table>

      <TablePagination 
        lengthMenu={[
          {
            value: 10,
            label: 10
          },
          {
            value: 50,
            label: 50
          },
          {
            value: 100,
            label: 100
          },
          {
            value: 200,
            label: 200
          },
        ]}
        activePage={page}
        displayLength={pageSize}
        total={contracts.length}
      />

    </div>
  );

  const tableLoading = <Table loading={isLoading} />;

  useEffect(() => {
    dispatch(getContracts())
      .then(
        setLoading(false)
      )
  }, []);

  return (
    <div>
      { isLoading ? tableLoading : contractTable }
    </div>
  );
};
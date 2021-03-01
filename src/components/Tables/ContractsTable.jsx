import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';

import { 
  getContracts,
  setContractsTblPagination,
  setContractsTblSorting,
  setContractsTblDefaultSorting,
  setContractsTblFilters,
} from '../../store/contracts/contractsActions';
import { ContractsFilters } from './ContractsFilters';
import { DateCell, NumberCell } from './cells';

export function ContractsTable() {
  const dispatch = useDispatch();
  const contracts = useSelector(state => state.contracts.contracts);
  const pagination = useSelector(state => state.contracts.tblPagintaion);
  const sorting = useSelector(state => state.contracts.tblSorting);
  const filters = useSelector(state => state.contracts.tblFilters);
  const [isLoading, setLoading] = useState(true);
  const [total, setTotal] = useState(1);

  const getSortOrder = (fieldName) => {
    return sorting.sort_by === fieldName && sorting.order_by + 'end';
  };

  const columns = [
    {
      title: 'Номер',
      dataIndex: 'number',
      width: 80,
      sorter: {},
      defaultSortOrder: getSortOrder('number'),
    },
    {
      title: 'Дата',
      dataIndex: 'contract_date',
      width: 100,
      sorter: {},
      defaultSortOrder: getSortOrder('contract_date'),
      render: (contractDate) => <DateCell value={contractDate} />
    },
    { 
      title: 'Дата зав.',
      dataIndex: 'end_date',
      width: 100,
      sorter: {},
      defaultSortOrder: getSortOrder('end_date'),
      render: (endDate) => <DateCell value={endDate} />
    },
    {
      title: 'Заказчик',
      dataIndex: ['customer', 'short_name'],
      width: 250,
    },
    {
      title: 'Баланс',
      dataIndex: ['customer', 'account', 'balance'],
      width: 90,
      align: 'right',
      render: (balance) => <NumberCell value={balance} />
    },
    {
      title: 'Объект',
      dataIndex: 'contract_object',
    },
    {
      title: 'Сумма',
      dataIndex: 'sum',
      width: 90,
      align: 'right',
      sorter: {},
      defaultSortOrder: getSortOrder('sum'),
      render: (sum) => <NumberCell value={sum} />
    },
    {
      title: 'Бюджет',
      dataIndex: 'budget',
      width: 90,
      align: 'right',
      sorter: {},
      defaultSortOrder: getSortOrder('budget'),
      render: (budget) => <NumberCell value={budget} />
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      sorter: {},
      defaultSortOrder: getSortOrder('status'),
      width: 100,
    },
  ];

  const getPage = (pagination) => (pagination.skip / pagination.take) + 1;
  const calcPagination = (currentPage, pageSize) => {
    return {
      skip: (currentPage - 1) * pageSize,
      take: pageSize
    };
  };

  const tblPagination = {
    current: getPage(pagination),
    pageSize: pagination.take,
    pageSizeOptions: [10, 50, 100, 200, 500],
    position: ['topRight', 'bottomRight'],
    size: 'small',
    showTotal: (total, range) => `${range[0]} - ${range[1]} / ${total}`,
    showQuickJumper: true,
    total: total,
  };

  const tableLoading = (
    <Table 
      rowKey="id"
      columns={columns}
      dataSource={contracts}
      loading={true}
      pagination={tblPagination}
    />
  );

  const contractsTable = (
    <Table
      bordered
      showSorterTooltip={false}
      rowKey="id"
      size="small"
      columns={columns}
      dataSource={contracts}
      pagination={tblPagination}
      onChange={(tblPaging, _, sorter) => {
            dispatch(setContractsTblPagination(
              calcPagination(tblPaging.current, tblPaging.pageSize)
            ));
            if (sorter.field && sorter.order) {
              dispatch(setContractsTblSorting({
                sort_by: sorter.field,
                order_by: sorter.order === 'ascend' ? 'asc' : 'desc'
              }));
            } else {
              dispatch(setContractsTblDefaultSorting());
            }
          }}
    />
  );

  useEffect(() => {
    const queryParams = {
      ...filters,
      ...pagination,
      ...sorting
    }
    dispatch(getContracts(queryParams))
      .then((response) => {
        setLoading(false);
        setTotal(response.count);
    })}, [dispatch, filters, pagination, sorting]
  );

  return (
    <div>
      <ContractsFilters
        values={filters}
        onChange={(_, allValues) => dispatch(setContractsTblFilters(allValues))}
      />
      { isLoading ? tableLoading : contractsTable }
    </div>
  );
};
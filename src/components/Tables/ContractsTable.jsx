import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';

import { 
  getContracts,
  setContractsTblPagination,
  setContractsTblSorting,
  setContractsTblDefaultSorting,
  setContractsTblFilters,
} from 'store/contracts/contractsActions';
import { ContractsFilters } from './ContractsFilters';
import { DateCell, CurrencyCell, StatusCell } from './cells';

export function ContractsTable() {
  const dispatch = useDispatch();
  const contracts = useSelector(state => state.contracts.contracts);
  const pagination = useSelector(state => state.contracts.tblPagintaion);
  const sorting = useSelector(state => state.contracts.tblSorting);
  const filters = useSelector(state => state.contracts.tblFilters);
  const [isLoading, setLoading] = useState(true);
  const [total, setTotal] = useState(1);
  const [totalSum, setTotalSum] = useState(0);

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
      render: (balance) => <CurrencyCell value={balance} />
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
      render: (sum) => <CurrencyCell value={sum} />
    },
    {
      title: 'Бюджет',
      dataIndex: 'budget',
      width: 90,
      align: 'right',
      sorter: {},
      defaultSortOrder: getSortOrder('budget'),
      render: (budget) => <CurrencyCell value={budget} />
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      sorter: {},
      defaultSortOrder: getSortOrder('status'),
      width: 130,
      render: (status, contract) => <StatusCell value={status} contractId={contract.id} />
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
    pageSizeOptions: [15, 50, 100, 200, 500],
    position: ['bottomRight'],
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
      rowKey="id"
      size="small"
      showSorterTooltip={false}
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
    const formFilters = {
      ...filters,
      statuses: [
        filters.new && 'new',
        filters.in_work && 'in_work',
        filters.complete && 'completed',
        filters.cancel && 'canceled',
      ].filter(i => i)
    }

    Object.entries(formFilters).forEach(([key, value]) => {
      if (!value || ['new', 'in_work', 'complete', 'cancel'].includes(key)) {
        delete formFilters[key];
      }
    });

    const queryParams = {
      ...formFilters,
      ...pagination,
      ...sorting
    }
    dispatch(getContracts(queryParams))
      .then((response) => {
        setLoading(false);
        setTotal(response.count);
        setTotalSum(response.total_sum);
    })}, [dispatch, filters, pagination, sorting]
  );

  return (
    <div>
      <ContractsFilters
        values={filters}
        onChange={(changedValue) => dispatch(setContractsTblFilters(changedValue))}
        totalSum={totalSum}
      />
      { isLoading ? tableLoading : contractsTable }
    </div>
  );
};
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';

import { 
  getContracts,
  setContractsTblPage,
  setContractsTblPageSize,
  setContractsTblSorting,
  setContractsTblDefaultSorting,
} from '../../store/contracts/contractsActions';
import { DateCell, NumberCell } from './cells';

export function ContractsTable() {
  const dispatch = useDispatch();
  const contracts = useSelector(state => state.contracts.contracts);
  const page = useSelector(state => state.contracts.tblPage);
  const pageSize = useSelector(state => state.contracts.tblPageSize);
  const sorting = useSelector(state => state.contracts.tblSorting);
  const [isLoading, setLoading] = useState(true);
  const [total, setTotal] = useState(1);

  const columns = [
    {
      title: 'Номер',
      dataIndex: 'number',
      width: 80,
      sorter: {},
    },
    {
      title: 'Дата',
      dataIndex: 'contract_date',
      width: 100,
      sorter: {},
      render: (contractDate) => <DateCell value={contractDate} />
    },
    { 
      title: 'Дата зав.',
      dataIndex: 'end_date',
      width: 100,
      sorter: {},
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
      render: (sum) => <NumberCell value={sum} />
    },
    {
      title: 'Бюджет',
      dataIndex: 'budget',
      width: 90,
      align: 'right',
      sorter: {},
      render: (budget) => <NumberCell value={budget} />
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      sorter: {},
      width: 100,
    },
  ];

  const pagination = {
    current: page,
    pageSize: pageSize,
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
      pagination={pagination}
    />
  );

  const queryParams = (pagination={}, sorter={}) => {
    let params = {};

    if (pagination.pageSize && pagination.current) {
      params.take = pagination.pageSize;
      params.skip = (pagination.current - 1) * pagination.pageSize;
    } else {
      params.take = pageSize;
      params.skip = (page - 1) * pageSize
    }

    if (sorter.field && sorter.order) {
      params.sort_by = sorter.field;
      params.order_by = sorter.order === 'ascend' ? 'asc' : 'desc';
    } else {
      params.sort_by = sorting.sortBy;
      params.order_by = sorting.orderBy;
    }

    return params;
  };

  const contractsTable = (
    <Table
      bordered
      showSorterTooltip={false}
      rowKey="id"
      size="small"
      columns={columns}
      dataSource={contracts}
      pagination={pagination}
      onChange={(pagination,filters, sorter) => {
        let sorting = {};
        if (sorter.field && sorter.order) {
          sorting = {
            sort_by: sorter.field,
            order_by: sorter.order === 'ascend' ? 'asc' : 'desc'
          }
        } else {
          sorting = {}
        }

        const params = {
          ...sorting,
          take: pagination.pageSize,
          skip: (pagination.current - 1) * pagination.pageSize,
        }
        dispatch(getContracts(params))
          .then((data) => {
            setTotal(data.count);
            dispatch(setContractsTblPage(pagination.current));
            dispatch(setContractsTblPageSize(pagination.pageSize));
            if (sorter.field && sorter.order) {
              dispatch(setContractsTblSorting({
                sortBy: sorter.field,
                orderBy: sorter.order === 'ascend' ? 'asc' : 'desc'
              }));
            } else {
              dispatch(setContractsTblDefaultSorting());
            }
          });
      }}
    />
  );

  useEffect(() => {
    dispatch(getContracts(queryParams()))
      .then((response) => {
        setLoading(false);
        setTotal(response.count);
    })}, [dispatch]
  );

  return (
    <div>
      { isLoading ? tableLoading : contractsTable }
    </div>
  );
};
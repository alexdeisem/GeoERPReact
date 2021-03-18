import { Table } from 'antd';
import { CurrencyCell, IntCell, WorkTypesActionsCell } from 'components/Tables/cells';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkTypes } from 'store/workTypes/workTypesActions';

export function WorkTypesTable(props) {
  const dispatch = useDispatch();
  const workTypes = useSelector(state => state.workTypes.workTypes);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (workTypes.length) {
      setLoading(false);
      return;
    }

    dispatch(fetchWorkTypes())
      .then(() => {
        setLoading(false);
      });
  }, [dispatch, workTypes]);

  const columns = [
    {
      title: '№',
      dataIndex: 'id',
      width: 40,
      align: "right",
      render: (id) => <IntCell value={id} />
    },
    {
      title: 'Тип работы',
      dataIndex: 'name',
      width: 400,
    },
    {
      title: 'Текст-подстановка',
      dataIndex: 'subject_text',
    },
    {
      title: 'Сумма',
      dataIndex: 'sum',
      width: 90,
      align: 'right',
      render: (sum) => <CurrencyCell value={sum} />
    },
    {
      title: 'Баланс',
      dataIndex: 'balance',
      width: 90,
      align: 'right',
      render: (balance) => <CurrencyCell value={balance} />
    },
    {
      title: 'Дней',
      dataIndex: 'days',
      width: 90,
      align: 'right',
      render: (days) => <IntCell value={days} />
    },
    {
      title: 'Действия',
      dataIndex: 'deletable',
      width: 90,
      render: (deletable) => <WorkTypesActionsCell deletable={deletable} />
    },
  ]

  return (
    <div>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={workTypes}
        size="small"
        bordered
        loading={loading}
      />
    </div>
  )
};

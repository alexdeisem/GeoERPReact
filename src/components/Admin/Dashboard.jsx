import { Route } from 'react-router-dom';
import { SubMenu } from './SubMenu';
import { ContractsTable } from '../Tables/ContractsTable';
import { 
  CreditCardOutlined, 
  FileAddOutlined, 
  FileWordOutlined, 
  LineChartOutlined, 
  OrderedListOutlined 
} from '@ant-design/icons';
import { ContractCreate } from '../Forms';

const menu = [
  {
    label: 'Договоры',
    url: '/admin/dashboard/contracts',
    icon: <FileWordOutlined />,
  },
  {
    label: 'Новый договор',
    url: '/admin/dashboard/new-contract',
    icon: <FileAddOutlined />,
  },
  {
    label: 'Задачи',
    url: '/admin/dashboard/tasks',
    icon: <OrderedListOutlined />,
  },
  {
    label: 'Статистика',
    url: '/admin/dashboard/statistics',
    icon: <LineChartOutlined />,
  },
  {
    label: 'Операции',
    url: '/admin/dashboard/operations',
    icon: <CreditCardOutlined />,
  },
];

export function Dashboard(props) {

  return (
    <div>
      <SubMenu menu={menu} />
      <div style={{padding: '8px'}}>
        <Route path="/admin/dashboard/contracts">
          <ContractsTable />
        </Route>
        <Route path="/admin/dashboard/new-contract">
          <ContractCreate />
        </Route>
      </div>
    </div>
  )
}
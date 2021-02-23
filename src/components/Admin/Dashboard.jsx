import { SubMenu } from './SubMenu';
import { ContractsTable } from '../Tables/ContractsTable';

const menu = [
  {
    key: 'contracts',
    label: 'Договоры',
    url: '/admin/dashboard/contracts',
    icon: 'file-text',
  },
  {
    key: 'new-contract',
    label: 'Новый договор',
    url: '/admin/dashboard/new-contract',
    icon: 'plus-circle',
  },
  {
    key: 'tasks',
    label: 'Задачи',
    url: '/admin/dashboard/tasks',
    icon: 'task',
  },
  {
    key: 'statistics',
    label: 'Статистика',
    url: '/admin/dashboard/statistics',
    icon: 'line-chart',
  },
  {
    key: 'operations',
    label: 'Операции',
    url: '/admin/dashboard/operations',
    icon: 'credit-card',
  },
]

export function Dashboard(props) {
  return (
    <div>
      <SubMenu menu={menu} />
      <div style={{padding: '8px'}}>
        <ContractsTable />
      </div>
    </div>
  )
}
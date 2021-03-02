import { Button, Dropdown, Menu, Tag } from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  MoreOutlined,
  HistoryOutlined,
  PlusCircleOutlined
} from '@ant-design/icons';

function StatusCell(props) {
  const formats = {
    'новый': {
      icon: <PlusCircleOutlined/>,
      color: 'processing'
    },
    'в работе': {
      icon: <HistoryOutlined/>,
      color: 'warning'
    },
    'выполнен': {
      icon: <CheckCircleOutlined/>,
      color: 'success'
    },
    'отменен': {
      icon: <CloseCircleOutlined/>,
      color: 'error'
    },
  }

  const menu = (
    <Menu>
      {Object.keys(formats).map((status, index) => 
        <Menu.Item key={index} icon={formats[status].icon}>{status}</Menu.Item>
      )}
    </Menu>
  );
  
  const DropdownMenu = () => (
    <Dropdown key="more" overlay={menu} trigger="click" arrow>
      <Button
        style={{
          border: 'none',
          padding: 0,
        }}
      >
        <MoreOutlined
          style={{
            // fontSize: 14,
            verticalAlign: 'center',
          }}
        />
      </Button>
    </Dropdown>
  );

  return (
    <div>
      <Tag
        color={formats[props.value].color}
        icon={formats[props.value].icon}
      >
        {props.value}
      </Tag>
      <DropdownMenu />
    </div>
  )
}

export { StatusCell };

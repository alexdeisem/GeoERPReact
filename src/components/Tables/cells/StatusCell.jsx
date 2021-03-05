import { useDispatch } from 'react-redux';
import { Button, Dropdown, Menu, Tag, Row, Col } from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  MoreOutlined,
  HistoryOutlined,
  PlusCircleOutlined
} from '@ant-design/icons';
import { updateContract } from 'store/contracts/contractsActions';

function StatusCell(props) {
  const dispatch = useDispatch();
  const handleStatusChange = status => {
    dispatch(updateContract({id: props.contractId, status: status}))
  }

  const formats = {
    'new': {
      icon: <PlusCircleOutlined/>,
      color: 'processing',
      label: 'новый',
    },
    'in_work': {
      icon: <HistoryOutlined/>,
      color: 'warning',
      label: 'в работе',
    },
    'completed': {
      icon: <CheckCircleOutlined/>,
      color: 'success',
      label: 'выполнен',
    },
    'canceled': {
      icon: <CloseCircleOutlined/>,
      color: 'error',
      label: 'отменен',
    }
  }

  const menu = (
    <Menu
      onClick={ item => handleStatusChange(item.key) }
    >
      {Object.keys(formats).map((status) => 
        <Menu.Item key={status} icon={formats[status].icon}>{formats[status].label}</Menu.Item>
      )}
    </Menu>
  );
  
  const DropdownMenu = () => (
    <Dropdown key="more" overlay={menu} trigger="click" arrow>
      <Button
        style={{
          border: 'none',
          padding: '2px',
        }}
      >
        <MoreOutlined />
      </Button>
    </Dropdown>
  );

  return (
    <Row wrap={false} align="middle">
      <Col flex="auto">
        <Tag
          color={formats[props.value].color}
          icon={formats[props.value].icon}
        >
          {formats[props.value].label}
        </Tag>
      </Col>
      <Col flex="none">
        <DropdownMenu />
      </Col>
    </Row>
  );
}

export { StatusCell };

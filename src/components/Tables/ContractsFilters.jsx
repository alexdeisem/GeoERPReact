import { Form, Input } from 'antd';
import { CheckOutlined, HistoryOutlined, SearchOutlined } from '@ant-design/icons';
import { WorkTypesSelect } from './WorkTypesSelect';
import { StatusSwitch } from '../StatusSwitch';

export function ContractsFilters(props) {
  return (
    <Form
      colon={false}
      onValuesChange={props.onChange}
      layout="inline"
    >

      <Form.Item
        label="Типы работ"
        name="work_types"
        initialValue={[]}
      >
        <WorkTypesSelect />
      </Form.Item>

      <Form.Item
        label="от"
        name="date_start"
        initialValue={'2007-01-01'}
      >
        <Input
          type="date"
          style={{height: "32px"}}
        />
      </Form.Item>

      <Form.Item
        label="до"
        name="date_end"
        initialValue={new Date().toISOString().slice(0, 10)}
      >
        <Input
          type="date"
          style={{height: "32px"}}
        />
      </Form.Item>

      <Form.Item name="search" initialValue={props.values.search} >
        <Input
          autoComplete="off"
          placeholder="Поиск..."
          allowClear={true}
          prefix={<SearchOutlined />}
        />
      </Form.Item>

      <Form.Item name="new" valuePropName="checked">
        <StatusSwitch
          tooltipLabel="новые"
          icon={<CheckOutlined />}
          defaultChecked={true}
        />
      </Form.Item>

      <Form.Item name="in_work" valuePropName="checked">
        <StatusSwitch
          tooltipLabel="в работе"
          color="orange"
          icon={<HistoryOutlined />}
          defaultChecked={true}
        />
      </Form.Item>
    </Form>
  );
};

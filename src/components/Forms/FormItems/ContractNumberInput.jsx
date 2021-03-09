import { Input } from 'antd';
import { FieldNumberOutlined } from '@ant-design/icons';

export function ContractNumberInput(props) {
  return (
    <Input
      prefix={<FieldNumberOutlined />}
      name='number'
      onChange={props.onChange}
    />
  );
};

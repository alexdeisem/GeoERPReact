import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input } from 'antd';
import { FieldNumberOutlined } from '@ant-design/icons';
import { getNextNumber } from 'store/contracts/contractsActions';
import { CustomerAutocomplete } from './FormItems';

export function ContractCreate() {
  const [form] = Form.useForm();
  const [contractDate, setContractDate] = useState(new Date().toISOString().slice(0, 10));
  const [customer, setCustomer] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNextNumber(contractDate.slice(0, 4)))
      .then(number => {
        form.setFieldsValue({
          number: number
        });
      });
  }, [dispatch, contractDate, form])

  return (
    <Form
      form={form}
      layout="vertical"
      onValuesChange={(changed) => {
        console.log(changed)
        if (changed.contract_date) {
          setContractDate(changed.contract_date);
        } else if (changed.customer && changed.customer.length > 1) {
          if (Array.isArray(changed.customer)) {
            setCustomer(changed.customer[1])
            console.log(customer)
            return;
          }
          setCustomer(changed.customer);
        }
      }}
    >
      <Form.Item
        label="Номер"
        name="number"
      >
        <Input
          prefix={<FieldNumberOutlined />}
        />
      </Form.Item>

      <Form.Item
        label="Дата договора"
        name="contract_date"
        initialValue={contractDate}
      >
        <Input 
          type="date"
        />
      </Form.Item>

      <Form.Item
        label="Заказчик"
        name="customer"
        initialValue={customer}
      >
        <CustomerAutocomplete
          onSelect={(value) => {
            form.setFieldsValue({
              customer: value[1],
              customer_id: value[0]
            });
          }}
          value={customer}
          autoFocus
          defaultOpen
        />
      </Form.Item>

      <Form.Item
        hidden
        name="customer_id"
      >
        <Input />
      </Form.Item>

      {/* <div style={{width: '1800px', height: '900px'}}>
      <iframe title="123" src="https://docs.google.com/gview?url=http://ieee802.org/secmail/docIZSEwEqHFr.doc&embedded=true" style={{width: '1800px', height: '900px'}} />
      </div> */}
      
    </Form>
  );
};

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Row, Col } from 'antd';
import { FieldNumberOutlined } from '@ant-design/icons';
import { getNextNumber } from 'store/contracts/contractsActions';
import { CustomerAutocomplete, OutcomeSelect, UserSelect, WorkTypesSelect } from './FormItems';

const { TextArea } = Input;

export function ContractCreate() {
  const [form] = Form.useForm();
  const [contractDate, setContractDate] = useState(new Date().toISOString().slice(0, 10));
  const [customer, setCustomer] = useState('');
  const [workTypeId, setWorkTypeId] = useState(1);
  const currentUserId = useSelector(state => state.auth.user.id);
  const workTypes = useSelector(state => state.workTypes.workTypes);
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
      onValuesChange={(changed, allValues) => {
        console.log(changed, allValues)
        if (changed.contract_date) {
          setContractDate(changed.contract_date);
        } else if (changed.customer && changed.customer.length > 1) {
          if (Array.isArray(changed.customer)) {
            setCustomer(changed.customer[1])
            console.log(customer)
            return;
          }
          setCustomer(changed.customer);
        } else if (changed.work_type) {
          setWorkTypeId(changed.work_type);
          const currentWorkType = workTypes.filter(work => work.id === changed.work_type)[0];
          console.log(currentWorkType);
          form.setFieldsValue({
            sum: currentWorkType.sum,
            budget: currentWorkType.budget,
            days: currentWorkType.days
          });

        }
      }}
    >
      <Row gutter={[16, 8]}>
        <Col span={12}>
          <Form.Item
            label="Номер"
            name="number"
          >
            <Input
              prefix={<FieldNumberOutlined />}
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Дата договора"
            name="contract_date"
            initialValue={contractDate}
          >
            <Input 
              type="date"
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label="Заказчик"
        name="customer"
        initialValue={customer}
      >
        <CustomerAutocomplete
          onSelect={(value) => {
            form.setFieldsValue({
              customer: value[1],
              customer_id: +value[0]
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

      <Form.Item
        label="Тип работ"
        name="work_type"
        valuePropName="work_type"
        initialValue={workTypeId}
      >
        <WorkTypesSelect />
      </Form.Item>

      <Form.Item
        label="Объект"
        name="contract_object"
      >
        <TextArea rows={5} />
      </Form.Item>

      <Form.Item
        label="Дата начала"
        name="start_date"
        initialValue={contractDate}
      >
        <Input type="date" />
      </Form.Item>

      <Form.Item
        label="Дата окончания"
        name="end_date"
      >
        <Input type="date" />
      </Form.Item>

      <Form.Item
        label="Количество дней"
        name="days"
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item
        label="Сумма"
        name="sum"
      >
        <Input type="number" step={0.01} />
      </Form.Item>

      <Form.Item
        label="Бюджет на объект"
        name="budget"
      >
        <Input type="number" step={0.01} />
      </Form.Item>

      <Form.Item
        label="Аванс"
        name="advance"
      >
        <Input type="number" step={0.01} />
      </Form.Item>

      <Form.Item
        label="Дней на оплату"
        name="days_to_pay"
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item
        label="Источники финансирования"
        name="funding_source"
        initialValue="собственные средства Заказчика"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Передается по итогу:"
        name="outcome[]"
      >
        <OutcomeSelect 
          worktype={workTypeId}
        />
      </Form.Item>

      <Form.Item
        label="Ответственный"
        name="convener_id"
        initialValue={currentUserId}
      >
        <UserSelect />
      </Form.Item>

      <Form.Item
        label="От кого объект"
        name="recommend_by"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Примечание"
        name="note"
      >
        <Input />
      </Form.Item>

      {/* <div style={{width: '1800px', height: '900px'}}>
      <iframe title="123" src="https://docs.google.com/gview?url=http://ieee802.org/secmail/docIZSEwEqHFr.doc&embedded=true" style={{width: '1800px', height: '900px'}} />
      </div> */}
      
    </Form>
  );
};

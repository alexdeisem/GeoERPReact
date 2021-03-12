import { Checkbox, Form, Input, Row, Col } from 'antd';
import {
  CloseCircleOutlined, 
  CheckOutlined, 
  HistoryOutlined, 
  PlusCircleOutlined, 
  SearchOutlined
} from '@ant-design/icons';
import { WorkTypesMultiSelect } from 'components/Forms/FormItems';
import { StatusSwitch } from 'components/StatusSwitch';
import { TotalContractsSum } from './TotalContractsSum';

export function ContractsFilters(props) {
  const statusSwitches = [
    {
      name: 'new',
      label: 'новые',
      color: '#1890ff',
      icon: <PlusCircleOutlined />,
      defaultChecked: props.values.new,
    },
    {
      name: 'in_work',
      label: 'в работе',
      color: '#faad14',
      icon: <HistoryOutlined />,
      defaultChecked: props.values.in_work,
    },
    {
      name: 'complete',
      label: 'выполненные',
      color: '#52c41a',
      icon: <CheckOutlined />,
      defaultChecked: props.values.complete,
    },
    {
      name: 'cancel',
      label: 'отмененные',
      color: '#ff4d4f',
      icon: <CloseCircleOutlined />,
      defaultChecked: props.values.cancel,
    },
  ];

  return (
    <Form
      colon={false}
      onValuesChange={props.onChange}
    >
      <Row gutter={[24, 0]}>
        <Col xxl={5} xl={7} lg={7} md={10} xs={24}>
          <Form.Item
            label="Тип работ"
            name="work_types"
            initialValue={props.values.work_types}
          >
            <WorkTypesMultiSelect initialValues={props.values.work_types}/>
          </Form.Item>
        </Col>

        <Col xxl={5} xl={9} lg={10} md={14} xs={24}>
          <Row gutter={[8, 8]}>
            <Col>
              <Form.Item
                label="от"
                name="date_start"
                initialValue={props.values.date_start}
              >
                <Input
                  type="date"
                  style={{height: "32px", maxWidth: "152px"}}
                />
              </Form.Item>
            </Col>

            <Col>
              <Form.Item
                label="до"
                name="date_end"
                initialValue={props.values.date_end}
              >
                <Input
                  type="date"
                  style={{height: "32px", maxWidth: "152px"}}
                />
              </Form.Item>
            </Col>
          </Row>
        </Col>

        <Col xxl={5} xl={8} lg={7} md={8} xs={24}>
          <Form.Item name="search" initialValue={props.values.search} >
            <Input
              autoComplete="off"
              placeholder="Поиск..."
              allowClear={true}
              prefix={<SearchOutlined />}
            />
          </Form.Item>
        </Col>

        <Col xxl={3} xl={5} lg={6} md={8} xs={24}>
          <Row gutter={[8, 8]}>
          {statusSwitches.map((switcher, key) => 
            <Col key={key}>
              <Form.Item name={switcher.name} valuePropName="checked">
                <StatusSwitch
                  tooltipLabel={switcher.label}
                  icon={switcher.icon}
                  defaultChecked={switcher.defaultChecked}
                  color={switcher.color}
                />
              </Form.Item>
            </Col>
          )}
          </Row>
        </Col>

        <Col xxl={4} xl={5} lg={6} md={8} xs={24}>
          <Row gutter={[8, 8]}>
            <Col>
              <Form.Item name="cnp" valuePropName="checked">
                <Checkbox>Вып. неопл.</Checkbox>
              </Form.Item>
            </Col>

            <Col>
              <Form.Item name="year" valuePropName="checked" initialValue={props.values.year}>
                <Checkbox>Годовые</Checkbox>
              </Form.Item>
            </Col>
          </Row>
        </Col>

        <Col xxl={2} xl={5} lg={6} md={8} xs={24}>
          <Form.Item>
            <TotalContractsSum
              value={props.totalSum}
              style={{fontStyle: "italic", fontWeight: "bold", float: "right"}}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

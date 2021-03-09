import { Row, Col, Typography } from 'antd';

const { Text } = Typography;

export function renderCustomerOption(customer) {
  const individualInfo = (customer) => {
    if (!customer.individual || !customer.individual.pass_number) {
      return '';
    };

    return (
      <small>
        Паспорт: {customer.individual.pass_number}
      </small>
    );
  };

  const legalInfo = (customer) => {
    if (!customer.legal || !customer.legal.unp) {
      return '';
    }

    return (
      <small>
        УНП: {customer.legal.unp}
      </small>
    );
  };

  return ({
    id: customer.customer_id,
    value: [customer.customer_id.toString(), customer.full_name],
    label: (
      <Row>
        <Col flex="auto">
          {customer.type === 'legal' ? customer.short_name : customer.full_name}
        </Col>
        <Col flex="none" style={{minWidth: '125px'}}>
          <Text type="secondary">
            {customer.type === 'legal' ? legalInfo(customer) : individualInfo(customer)}
          </Text>
        </Col>
      </Row>
    )
  });
};

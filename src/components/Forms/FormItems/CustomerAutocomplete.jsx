import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AutoComplete } from 'antd';
import { getCustomers } from  'store/customers/customersActions';
import { renderCustomerOption } from './renderCustomerOption';

export function CustomerAutocomplete(props) {
  const dispatch = useDispatch();
  const [customerOptions, setCustomerOptions] = useState([]);

  const renderOptionsByType = (customers, type) => {
    return customers.filter(c => c.type === type).map(c => renderCustomerOption(c))
  }

  useEffect(() => {
    dispatch(getCustomers({search: props.value}))
      .then(customers => {
        const options =  [
          {
            label: <span>Юридические лица</span>,
            options: renderOptionsByType(customers, 'legal'),
          },
          {
            label: <span>Физические лица</span>,
            options: renderOptionsByType(customers, 'individual'),
          },
        ];

        setCustomerOptions(options.filter(group => group.options.length));
      });
  }, [dispatch, props.value]);

  return (
    <AutoComplete
      allowClear
      options={customerOptions}
      onSelect={props.onSelect}
      onChange={props.onChange}
      notFoundContent={`По запросу "${props.value}" заказчиков не найдено`}
      placeholder="Поиск заказчика..."
      autoFocus={props.autoFocus}
      defaultOpen={props.defaultOpen}
      value={props.value}
    />
  )
}
import { Select } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkTypes } from '../../store/workTypes/workTypesActions';

const { Option } = Select;

export function WorkTypesSelect(props) {
  const [loading, setLoading] = useState(false);
  const workTypes = useSelector(state => state.workTypes.workTypes);
  const [options, setOptions] = useState([]);
  const dispatch = useDispatch();
  const width = props.width || 250;

  const abbrValue = (value) => {
    return value
      .replace('-', ' ')
      .split(' ')
      .map(i => i[0])
      .join('')
      .toUpperCase()
  }

  const handleFocus = () => {
    setLoading(true)
    dispatch(fetchWorkTypes())
      .then(setLoading(false));
  };

  useEffect(() => {
    setOptions(workTypes.map(item => 
      <Option key={item.id} value={item.id} label={abbrValue(item.name)}>
        <small>{item.name}</small>
      </Option>  
    ));
  }, [workTypes]);

  return (
    <Select
      mode="multiple"
      maxTagCount="responsive"
      placeholder="Все..."
      style={{width: width}}
      loading={loading}
      onFocus={handleFocus}
      optionLabelProp="label"
      allowClear={true}
      onChange={props.onChange}
    >
      {options}
    </Select>
  );
};

import { Select } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkTypes } from 'store/workTypes/workTypesActions';

const { Option } = Select;

export function WorkTypesSelect(props) {
  const workTypes = useSelector(state => state.workTypes.workTypes)
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchWorkTypes())
      .then(setLoading(false));
  }, [dispatch]);

  return (
    <Select 
      defaultValue={1}
      loading={loading}
      onChange={props.onChange}
    >
      {workTypes.map(type => <Option key={type.id} value={type.id}>{type.name}</Option>)}
    </Select>
  );
};

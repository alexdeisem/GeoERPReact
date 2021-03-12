import { Select, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from 'store/users/usersActions';

const { Option } = Select;

export function UserSelect(props) {
  const users = useSelector(state => state.users.users);
  const currentUser = useSelector(state => state.auth.user)
  const dispatch = useDispatch();

  const [options, setOptions] = useState(
    <Option value={currentUser.id}>
      {currentUser.last_name} {currentUser.first_name}
    </Option>
  );

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const handleSearch = value => setSearch(value);

  useEffect(() => {
    if (search.length < 2) {
      return;
    }

    setLoading(true);
    dispatch(fetchUsers({search: search}))
      .then(setLoading(false));
  }, [dispatch, search]);

  useEffect(() => {
    setOptions(users.map(user => 
      <Option key={user.id} value={user.id}>
        {user.last_name} {user.first_name}
      </Option>
    ))
  }, [users]);

  return (
    <Select
      showSearch
      defaultValue={currentUser.id}
      onSearch={handleSearch}
      notFoundContent={
        loading
        ? <Spin size="small" />
        : search.length < 2 ? 'Для поиска введите минимум 2 символа' : `По запросу "${search}" пользователей не найдено`
      }
      filterOption={false}
      { ...props}
    >
      {options}
    </Select>
  );
};
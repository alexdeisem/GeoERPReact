import { Switch, Tooltip } from 'antd';
import { useEffect, useState, useRef } from 'react';

export function StatusSwitch(props) {
  const color = props.color || '';
  const [active, setActive] = useState(props.defaultChecked);
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    setActive(props.checked)
  }, [props.checked]);

  return (
    <Tooltip title={props.tooltipLabel}>
      <Switch
        size={props.size}
        defaultChecked={props.defaultChecked}
        checkedChildren={props.icon}
        unCheckedChildren={props.icon}
        onChange={props.onChange}
        style={{background: active ? color : ''}}
      />
    </Tooltip>
  )
};

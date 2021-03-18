import { Tabs } from 'antd';
import { WorkTypesTable } from 'components/Tables';

const { TabPane } = Tabs;

export function Settings(props) {
  const initialPanes = [
    { title: 'Типы работ', content: <WorkTypesTable />, key: '1', closable: false },
  ];

  return (
    <Tabs
      type="editable-card"
    >
      {initialPanes.map(pane => (
        <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
          {pane.content}
        </TabPane>
      ))}
    </Tabs>
  )
};

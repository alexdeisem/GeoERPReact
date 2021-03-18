import { EditOutlined } from "@ant-design/icons";
import { Button } from "antd";

export function WorkTypesActionsCell(props) {
  return (
    <div>
      <Button
        type="link"
        icon={<EditOutlined />}
        size="small"
      >
        Редактировать
      </Button>
    </div>
  );
};

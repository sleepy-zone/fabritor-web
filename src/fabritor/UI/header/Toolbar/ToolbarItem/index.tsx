import { Tooltip } from 'antd';

export default function ToolbarItem (props) {
  const { onClick, title, children } = props;
  return (
    <Tooltip
      placement="bottom"
      title={
        <span style={{ fontSize: 12 }}>{title}</span>
      }
    >
      <span className="fabritor-toolbar-item" onClick={onClick}>
        {children}
      </span>
    </Tooltip>
  )
}
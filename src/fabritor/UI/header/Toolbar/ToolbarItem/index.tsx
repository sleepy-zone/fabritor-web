import { Tooltip } from 'antd';

export default function ToolbarItem (props) {
  const { onClick, title, tooltipProps, children } = props;
  return (
    <Tooltip
      placement="bottom"
      title={
        <span style={{ fontSize: 12 }}>{title}</span>
      }
      {...tooltipProps}
    >
      <span className="fabritor-toolbar-item" onClick={onClick}>
        {children}
      </span>
    </Tooltip>
  )
}
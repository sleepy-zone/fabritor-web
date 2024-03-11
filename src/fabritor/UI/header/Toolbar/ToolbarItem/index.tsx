import { Tooltip } from 'antd';

export default function ToolbarItem (props) {
  const { onClick, title, disabled, tooltipProps, children } = props;

  const handleClick = () => {
    if (!disabled) {
      onClick?.();
    }
  }

  return (
    <Tooltip
      placement="bottom"
      title={
        <span style={{ fontSize: 12 }}>{title}</span>
      }
      {...tooltipProps}
    >
      <span
        className="fabritor-toolbar-item"
        style={{
          color: disabled ? '#cccccc' : 'rgba(0, 0, 0, 0.88)'
        }}
        onClick={handleClick}
      >
        {children}
      </span>
    </Tooltip>
  )
}
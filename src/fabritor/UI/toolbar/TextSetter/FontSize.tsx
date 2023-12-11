import { Popover, Slider } from 'antd';

export default function FontSizeSetter (props) {
  const { value, onChange } = props;

  return (
    <Popover
      content={
        <Slider style={{ width: 200 }} min={1} max={400} step={1} onChange={onChange} value={value} />
      }
      placement="bottom"
      trigger="click"
    >
      <span className="fabritor-toolbar-setter-trigger">
        <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 8H32" stroke="#000000" stroke-width="4" stroke-linecap="square"/><path d="M28 21H44" stroke="#000000" stroke-width="4" stroke-linecap="square"/><path d="M18 42L18 8" stroke="#000000" stroke-width="4" stroke-linecap="square"/><path d="M36 42L36 21" stroke="#000000" stroke-width="4" stroke-linecap="square"/></svg>
      </span>
    </Popover>
  )
}
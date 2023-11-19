import { Radio, Popover } from 'antd';
import { AlignCenterOutlined, AlignLeftOutlined, AlignRightOutlined } from '@ant-design/icons';

const TEXT_ALIGN_LIST = [
  { label: <AlignLeftOutlined />, value: 'left' },
  { label: <AlignCenterOutlined />, value: 'center' },
  { label: <AlignRightOutlined />, value: 'right' }
];

const TEXT_ALIGN_MAP = {
  left: AlignLeftOutlined,
  center: AlignCenterOutlined,
  right: AlignRightOutlined
};

export default function AlignSetter (props) {
  const { value, ...rest } = props;

  const renderTrigger = () => {
    if (!value) return null;
    const Component = TEXT_ALIGN_MAP[value];
    return <Component style={{ fontSize: 22 }} />
  }

  return (
    <Popover
      content={
        <Radio.Group
          value={value}
          {...rest}
          options={TEXT_ALIGN_LIST}
          optionType="button"
          buttonStyle="solid"
        />
      }
      placement="bottom"
      trigger="click"
    >
      <span className="fabritor-toolbar-setter-trigger">
        {renderTrigger()}
      </span>
    </Popover>
  )
}
import { Radio } from 'antd';
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

  return (
    <Radio.Group
      value={value}
      {...rest}
      options={TEXT_ALIGN_LIST}
      optionType="button"
      buttonStyle="solid"
    />
  )
}
import { Radio } from 'antd';
import { AlignCenterOutlined, AlignLeftOutlined, AlignRightOutlined } from '@ant-design/icons';

export const TEXT_ALIGN_LIST = [
  { label: <AlignLeftOutlined />, value: 'left' },
  { label: <AlignCenterOutlined />, value: 'center' },
  { label: <AlignRightOutlined />, value: 'right' }
];

export default function AlignSetter (props) {
  return (
    <Radio.Group
      {...props}
      options={TEXT_ALIGN_LIST}
      optionType="button"
      buttonStyle="solid"
    />
  )
}
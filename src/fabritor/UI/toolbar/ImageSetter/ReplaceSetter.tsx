import { Popover } from 'antd';
import ImageSelector from '@/fabritor/components/ImageSelector';

export default function ReplaceSetter (props) {
  const { onChange } = props;

  return (
    <Popover
      content={
        <ImageSelector onChange={onChange} />
      }
      placement="bottom"
      trigger="click"
    >
      <span className="fabritor-toolbar-setter-trigger">替换图片</span>
    </Popover>
  );
}
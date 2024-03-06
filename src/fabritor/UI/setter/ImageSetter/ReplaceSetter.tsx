import { Popover, Button } from 'antd';
import ImageSelector from '@/fabritor/components/ImageSelector';

export default function ReplaceSetter (props) {
  const { onChange } = props;

  return (
    <Popover
      content={
        <ImageSelector size="middle" type="default" onChange={onChange} />
      }
      placement="bottom"
      trigger="click"
    >
      <Button type="primary" block>替换图片</Button>
    </Popover>
  );
}
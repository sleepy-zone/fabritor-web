import { useState } from 'react';
import { Button, Input, Popover, Space } from 'antd';

export default function RemoteImagePanel (props) {
  const { addImage } = props;
  const [url, setUrl] = useState('');

  const handleClick = () => {
    if (url) {
      addImage({ url });
    }
  }

  return (
    <Popover
      content={
        <Space.Compact>
          <Input value={url} onChange={(e) => { setUrl(e.target.value) }} style={{ width: 260 }} />
          <Button onClick={handleClick}>确认</Button>
        </Space.Compact>
      }
      title="请输入地址："
      trigger="click"
    >
      <Button type="primary" size="large">
        添加远程图片
      </Button>
    </Popover>
  );
}
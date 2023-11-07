import { useRef } from 'react';
import { Button } from 'antd';

export default function LocalImagePanel (props) {
  const { addImage, addSvg } = props;
  const formRef = useRef<HTMLFormElement>();
  const inputRef = useRef<HTMLInputElement>();

  const handleClick = () => {
    inputRef.current?.click?.();
  }

  const handleFileChange = (evt) => {
    const file = evt.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    formRef.current?.reset?.();
    if (file.type === 'image/svg+xml') {
      addSvg?.({ url });
      return;
    }
    addImage?.({ url });
  }

  return (
    <div>
      <Button type="primary" block size="large" onClick={handleClick}>
        添加本地图片
      </Button>

      <form style={{ display: 'none' }} ref={formRef}>
        <input type="file" accept="image/*" ref={inputRef} onChange={handleFileChange}/>
      </form>
    </div>
  );
}
import { useRef } from 'react';
import { Button } from 'antd';
import LocalFileSelector from '@/fabritor/components/LocalFileSelector';

export default function LocalImagePanel (props) {
  const { addImage } = props;
  const localFileSelectorRef = useRef<any>();

  const handleClick = () => {
    localFileSelectorRef.current?.start?.();
  }

  const handleFileChange = (file) => {
    if (file.type === 'image/svg+xml') {
      // const url = URL.createObjectURL(file);
      // addSvg?.({ url });
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (revt) => {
      const img = new Image();
      img.onload = () => {
        localFileSelectorRef.current?.reset?.();
        addImage?.({ img });
      }
      // @ts-ignore
      img.src = revt.target.result;
    }
    reader.readAsDataURL(file);
  }

  return (
    <div>
      <Button type="primary" block size="large" onClick={handleClick}>
        添加本地图片
      </Button>

      <LocalFileSelector accept="image/jpg,image/jpeg,image/png" ref={localFileSelectorRef} onChange={handleFileChange} />
    </div>
  );
}
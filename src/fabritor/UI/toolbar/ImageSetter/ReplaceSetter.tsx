import { useRef } from 'react';
import LocalFileSelector from '@/fabritor/components/LocalFileSelector';

export default function ReplaceSetter (props) {
  const { onChange } = props;
  const localFileSelectorRef = useRef<any>(null);

  const handleClick = () => {
    localFileSelectorRef.current?.start();
  }

  const handleFileChange = (file) => {
    const reader = new FileReader();
    reader.onload = (revt => {
      const img = new Image();
      img.onload = () => {
        localFileSelectorRef.current?.reset();
        onChange && onChange({ img });
      }
      // @ts-ignore
      img.src = revt.target.result;
    });
    reader.readAsDataURL(file);
  }

  return (
    <div>
      <span className="fabritor-toolbar-setter-trigger" onClick={handleClick}>替换图片</span>
      <LocalFileSelector
        accept="image/jpg,image/jpeg,image/png"
        ref={localFileSelectorRef}
        onChange={handleFileChange}
      />
    </div>
  );
}
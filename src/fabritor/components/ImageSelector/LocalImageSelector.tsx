import { useRef } from 'react';
import { Button } from 'antd';
import LocalFileSelector from '../LocalFileSelector';
import { useTranslation } from '@/i18n/utils';

export default function LocalImageSelector (props) {
  const { onChange, ...rest } = props;
  const localFileSelectorRef = useRef<any>();
  const { t } = useTranslation();

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
      onChange?.(revt.target.result);
    }
    reader.readAsDataURL(file);
  }

  return (
    <div>
      <Button type="primary" size="large" onClick={handleClick} {...rest}>
        {t('panel.image.local')}
      </Button>

      <LocalFileSelector accept="image/*" ref={localFileSelectorRef} onChange={handleFileChange} />
    </div>
  );
}
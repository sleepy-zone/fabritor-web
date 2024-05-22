import { useState } from 'react';
import { Button, Input, Popover, Space } from 'antd';
import { useTranslation } from '@/i18n/utils';

export default function RemoteImageSelector (props) {
  const { onChange, ...rest } = props;
  const [url, setUrl] = useState('');
  const { t } = useTranslation();

  const handleClick = () => {
    if (url) {
      onChange?.(url);
    }
  }

  return (
    <Popover
      content={
        <Space.Compact>
          <Input value={url} onChange={(e) => { setUrl(e.target.value) }} style={{ width: 260 }} />
          <Button onClick={handleClick}>{t('common.ok')}</Button>
        </Space.Compact>
      }
      title={t('panel.image.remote_placeholder')}
      trigger="click"
    >
      <Button type="primary" size="large" {...rest}>
        {t('panel.image.remote')}
      </Button>
    </Popover>
  );
}
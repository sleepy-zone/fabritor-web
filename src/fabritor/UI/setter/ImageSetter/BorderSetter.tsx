import { Button } from 'antd';
import { useState } from 'react';
import { BorderOutlined } from '@ant-design/icons'
import MoreConfigWrapper from '../Form/MoreConfigWrapper';
import CommonBorderSetter from '../BorderSetter';
import { useTranslation } from '@/i18n/utils';

export default function BorderSetter (props) {
  const { value, onChange } = props;
  const [showMore, setShowMore] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <Button block icon={<BorderOutlined />} onClick={() => { setShowMore(true) }}>{t('common.border')}</Button>
      <MoreConfigWrapper
        open={showMore}
        setOpen={setShowMore}
        title={t('common.border')}
      >
        <div style={{ marginTop: 24 }}>
          <CommonBorderSetter value={value} onChange={onChange} />
        </div>
      </MoreConfigWrapper>
    </>
  )
}
import { Button } from 'antd';
import { useState } from 'react';
import { BorderOutlined } from '@ant-design/icons'
import MoreConfigWrapper from '../Form/MoreConfigWrapper';
import CommonBorderSetter from '../BorderSetter';

export default function BorderSetter (props) {
  const { value, onChange } = props;
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      <Button block icon={<BorderOutlined />} onClick={() => { setShowMore(true) }}>边框</Button>
      <MoreConfigWrapper
        open={showMore}
        setOpen={setShowMore}
        title="边框"
      >
        <CommonBorderSetter value={value} onChange={onChange} />
      </MoreConfigWrapper>

    </>
  )
}
import { Button, Drawer } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { SETTER_WIDTH } from '@/config';

export default function MoreConfigWrapper (props) {
  const { open, setOpen, title = '', children, ...rest } = props;

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      document.body.scrollTop = 0;
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [open]);

  return (
    <Drawer
      title={null}
      placement="right"
      open={open}
      mask={false}
      maskClosable={false}
      width={SETTER_WIDTH}
      rootStyle={{ top: 50, outline: 'none', }}
      contentWrapperStyle={{ boxShadow: 'none' }}
      bodyStyle={{ padding: 16 }}
      closeIcon={null}
      {...rest}
    >
      <div>
        <Button
          type="link"
          href="javascript:void(0);" 
          size="small"
          onClick={() => { setOpen(false); }}
          icon={<LeftOutlined />}
          style={{ marginLeft: -10 }}
        >
          {title}
        </Button>
        {children}
      </div>
    </Drawer>
  )
}
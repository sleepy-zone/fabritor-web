import { Button } from 'antd';
import { RightOutlined } from '@ant-design/icons';

export default function MoreButton(props) {
  const { onClick, buttonStyle, iconStyle, title = 'More', ...rest } = props;
  
  return (
    <div style={{ textAlign: 'right' }}>
      <Button
        type="link"
        href="javascript:void(0);" 
        size="small"
        style={{
          fontSize: 12,
          lineHeight: '22px',
          ...buttonStyle
        }}
        onClick={onClick}
        {...rest}
      >
        {title}<RightOutlined style={{ marginLeft: 2, fontSize: 12, ...iconStyle }} />
      </Button>
    </div>
  )
}
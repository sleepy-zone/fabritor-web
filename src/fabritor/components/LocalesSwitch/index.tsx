import { Button } from 'antd';
import { useSearchParams } from 'ice';

export default function LocalesSwitch () {
  const [searchParams] = useSearchParams();
  const lng = searchParams.get('lng') || 'en-US';

  const switchLocale = () => {
    window.location.replace(`/?lng=${lng === 'en-US' ? 'zh-CN' : 'en-US'}`);
  }

  return (
    <Button
      shape="circle"
      style={{
        backgroundColor: '#fff', 
        width: 40, 
        height: 40,
        border: 'none',
        boxShadow: '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
        fontSize: 16,
        fontWeight: 'bold'
      }}
      onClick={switchLocale}
    >
      { lng === 'en-US' ? 'En' : '中' }
    </Button>
  )
}
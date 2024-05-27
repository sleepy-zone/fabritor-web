import { Button } from 'antd';
import { useLocale } from 'ice';

export default function LocalesSwitch () {
  const [locale, setLocale] = useLocale();
  console.log('locale111111111111', locale)

  const switchLocale = () => {
    setLocale(locale === 'en-US' ? 'zh-CN' : 'en-US');
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
      { locale === 'en-US' ? 'En' : '中' }
    </Button>
  )
}
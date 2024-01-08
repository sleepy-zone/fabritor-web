import { Space, Typography } from 'antd';
import LocalImageSelector from '@/fabritor/components/ImageSelector/LocalImageSelector';
import { loadGlobalImage } from '@/utils/helper';

const { Text } = Typography;

export default function Blank () {

  const handleLocalImage = (url) => {
    loadGlobalImage(url);
  }

  return (
    <div
      style={{ 
        paddingTop: 200,
        textAlign: 'center'
      }}
    >
      <img style={{ width: 72, height: 72, marginBottom: 8 }} src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent('<svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M39 6H9C7.34315 6 6 7.34315 6 9V39C6 40.6569 7.34315 42 9 42H39C40.6569 42 42 40.6569 42 39V9C42 7.34315 40.6569 6 39 6Z" stroke="#4d4f5a" stroke-width="4" stroke-linecap="square" stroke-linejoin="miter"/><path d="M18 23C20.7614 23 23 20.7614 23 18C23 15.2386 20.7614 13 18 13C15.2386 13 13 15.2386 13 18C13 20.7614 15.2386 23 18 23Z" fill="#4d4f5a" stroke="#4d4f5a" stroke-width="4" stroke-linecap="square" stroke-linejoin="miter"/><path d="M27.7901 26.2194C28.6064 25.1269 30.2528 25.1538 31.0329 26.2725L39.8077 38.8561C40.7322 40.182 39.7835 42.0001 38.1671 42.0001H16L27.7901 26.2194Z" stroke="#4d4f5a" stroke-width="4" stroke-linecap="square" stroke-linejoin="miter"/></svg>')}`} />
      <LocalImageSelector title="加载一幅本地图片" type="link" size="middle" onChange={handleLocalImage} />
      <Space direction="vertical" style={{ marginTop: 8 }}>
        <Text>或者使用快捷键</Text>
        <Space>
          <Text code style={{ fontSize: 14 }}>⌘ + v (Mac)</Text>
          <Text code style={{ fontSize: 14 }}>ctrl + v (Windows)</Text>
        </Space>
        <Text>获取剪贴板图像</Text>
      </Space>
    </div>
  )
}
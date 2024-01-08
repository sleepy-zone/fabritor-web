import { Layout } from 'antd';
import { AlertOutlined, FileTextOutlined, PictureOutlined, BorderOutlined, BulbOutlined, AppstoreOutlined, GithubFilled, PictureFilled, BorderLeftOutlined } from '@ant-design/icons';

const { Sider } = Layout;

const siderStyle: React.CSSProperties = {
  padding: '30px 0',
  height: '100%',
  backgroundColor: '#ffffff',
  textAlign: 'center'
}

const OBJECT_TYPES = [
  {
    label: '重新加载一幅本地图片',
    value: 'image',
    icon: <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M39 6H9C7.34315 6 6 7.34315 6 9V39C6 40.6569 7.34315 42 9 42H39C40.6569 42 42 40.6569 42 39V9C42 7.34315 40.6569 6 39 6Z" stroke="#4d4f5a" stroke-width="4" stroke-linecap="square" stroke-linejoin="miter"/><path d="M18 23C20.7614 23 23 20.7614 23 18C23 15.2386 20.7614 13 18 13C15.2386 13 13 15.2386 13 18C13 20.7614 15.2386 23 18 23Z" fill="#4d4f5a" stroke="#4d4f5a" stroke-width="4" stroke-linecap="square" stroke-linejoin="miter"/><path d="M27.7901 26.2194C28.6064 25.1269 30.2528 25.1538 31.0329 26.2725L39.8077 38.8561C40.7322 40.182 39.7835 42.0001 38.1671 42.0001H16L27.7901 26.2194Z" stroke="#4d4f5a" stroke-width="4" stroke-linecap="square" stroke-linejoin="miter"/></svg>
  },
  {
    label: '文字',
    value: 'text',
    icon: <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="20" fill="#4d4f5a" stroke="#4d4f5a" stroke-width="4"/><path d="M32 16H16" stroke="#FFF" stroke-width="4" stroke-linecap="square" stroke-linejoin="miter"/><path d="M24 34V16" stroke="#FFF" stroke-width="4" stroke-linecap="square" stroke-linejoin="miter"/></svg>
  },
  {
    label: '形状',
    value: 'shape',
    icon: <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M42 8H6C4.89543 8 4 8.89543 4 10V38C4 39.1046 4.89543 40 6 40H42C43.1046 40 44 39.1046 44 38V10C44 8.89543 43.1046 8 42 8Z" fill="#ffffff" stroke="#4d4f5a" stroke-width="4"/></svg>
  },
  {
    label: '线条',
    value: 'line',
    icon: <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M41.9999 24H5.99994" stroke="#4d4f5a" stroke-width="4" stroke-linecap="square" stroke-linejoin="miter"/><path d="M30 12L42 24L30 36" stroke="#4d4f5a" stroke-width="4" stroke-linecap="square" stroke-linejoin="miter"/></svg>
  },
  {
    label: '画笔',
    value: 'paint',
    icon: <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#icon-309fc3b052696ccc)"><path d="M30.9995 8.99902L38.9995 16.999" stroke="#4d4f5a" stroke-width="4" stroke-linecap="square" stroke-linejoin="miter"/><path d="M7.99953 31.999L35.9994 4L43.9995 11.999L15.9995 39.999L5.99951 41.999L7.99953 31.999Z" stroke="#4d4f5a" stroke-width="4" stroke-linecap="square" stroke-linejoin="miter"/><path d="M30.9995 8.99902L38.9995 16.999" stroke="#4d4f5a" stroke-width="4" stroke-linecap="square" stroke-linejoin="miter"/><path d="M8.99951 31.999L15.9995 38.999" stroke="#4d4f5a" stroke-width="4" stroke-linecap="square" stroke-linejoin="miter"/><path d="M12.9995 34.999L34.9995 12.999" stroke="#4d4f5a" stroke-width="4" stroke-linecap="square" stroke-linejoin="miter"/></g><defs><clipPath id="icon-309fc3b052696ccc"><rect width="48" height="48" fill="#FFF"/></clipPath></defs></svg>
  },
  {
    label: '二维码',
    value: 'qrcode',
    icon: <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6H6V18H18V6Z" fill="#4d4f5a" stroke="#4d4f5a" stroke-width="4" stroke-linejoin="miter"/><path d="M18 30H6V42H18V30Z" fill="#4d4f5a" stroke="#4d4f5a" stroke-width="4" stroke-linejoin="miter"/><path d="M42 30H30V42H42V30Z" fill="#4d4f5a" stroke="#4d4f5a" stroke-width="4" stroke-linejoin="miter"/><path d="M42 6H30V18H42V6Z" fill="#4d4f5a" stroke="#4d4f5a" stroke-width="4" stroke-linejoin="miter"/><path d="M24 6V24" stroke="#4d4f5a" stroke-width="4" stroke-linecap="square"/><path d="M24 30V42" stroke="#4d4f5a" stroke-width="4" stroke-linecap="square"/><path d="M24 24L6 24" stroke="#4d4f5a" stroke-width="4" stroke-linecap="square"/><path d="M42 24H30" stroke="#4d4f5a" stroke-width="4" stroke-linecap="square"/></svg>
  },
  {
    label: 'emoji',
    value: 'emoji',
    icon: <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" fill="#4d4f5a" stroke="#4d4f5a" stroke-width="4" stroke-linejoin="miter"/><path d="M31 18V19" stroke="#FFF" stroke-width="4" stroke-linecap="square" stroke-linejoin="miter"/><path d="M17 18V19" stroke="#FFF" stroke-width="4" stroke-linecap="square" stroke-linejoin="miter"/><path d="M31 31C31 31 29 35 24 35C19 35 17 31 17 31" stroke="#FFF" stroke-width="4" stroke-linecap="square" stroke-linejoin="miter"/></svg>
  }
];

export default function Panel () {
  return (
    <Sider style={siderStyle} width={48}>
      {
        OBJECT_TYPES.map(item => (
          <div
            style={{
              marginBottom: 22,
              cursor: 'pointer'
            }}
            title={item.label}
          >
            {item.icon}
          </div>
        ))
      }
    </Sider>
  )
}
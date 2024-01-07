import { FloatButton, Button, Dropdown } from 'antd';
import { ExportOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { getGlobalEditor } from '@/utils/global';
import { downloadFile } from '@/utils';

const items: MenuProps['items'] = [
  {
    key: 'jpg',
    label: '导出为 JPG'
  },
  {
    key: 'png',
    label: '导出为 PNG'
  },
  {
    key: 'copy',
    label: '复制到剪贴板'
  }
]

export default function Export (props) {
  const { type } = props;

  const handleClick = ({ key }) => {
    const editor = getGlobalEditor();
    const { sketch } = editor;
    // @ts-ignore
    const name = sketch.fabritor_desc;
    switch (key) {
      case 'png':
        const png = editor.export2Img({ format: 'png' });
        downloadFile(png, 'png', name);
        break;
      case 'jpg':
        const jpg = editor.export2Img({ format: 'jpg' });
        downloadFile(jpg, 'jpg', name);
        break;
      default:
        break;
    }
  }
  return (
    <Dropdown
      menu={{ items, onClick: handleClick }} 
      arrow={{ pointAtCenter: true }}
      placement="bottom"
    >
      <Button icon={<ExportOutlined />}>导出</Button>
    </Dropdown>
  )
}
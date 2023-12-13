import { Flex, Card } from 'antd';
import Title from '@/fabritor/components/Title';

const PRESET_FONT_LIST = [
  {
    label: <div style={{ fontSize: 30, fontFamily: '胡晓波男神体', fontWeight: 'bold' }}>添加标题</div>,
    key: 'title',
    config: {
      fontFamily: '胡晓波男神体',
      fontWeight: 'bold',
      fontSize: 120,
      text: '添加标题',
      top: 100
    }
  },
  {
    label: <div style={{ fontSize: 24, fontFamily: 'AlibabaPuHuiTi' }}>添加副标题</div>,
    key: 'sub-title',
    config: {
      fontFamily: 'AlibabaPuHuiTi',
      fontWeight: 'bold',
      fontSize: 100,
      text: '添加副标题',
      top: 400
    }
  },
  {
    label: <div style={{ fontSize: 16, fontFamily: 'SourceHanSerif' }}>添加一段正文</div>,
    key: 'content',
    config: {
      fontFamily: 'SourceHanSerif',
      fontSize: 80,
      text: '添加一段正文'
    }
  },
  {
    label: <div style={{ fontSize: 26, fontFamily: '霞鹜文楷', color: '#ffffff' , WebkitTextStroke: '1px rgb(255, 87, 87)' }}>文字边框</div>,
    key: 'content',
    config: {
      fontFamily: '霞鹜文楷',
      fontSize: 100,
      text: '霞鹜文楷',
      fill: '#ffffff',
      stroke: '#ff5757',
      strokeWidth: 12
    }
  }
]

export default function PresetFontPanel (props) {
  const { addTextBox } = props;

  const handleClick = (item) => {
    addTextBox?.(item.config);
  }

  return (
    <Flex vertical gap={8} style={{ marginTop: 16 }}>
      <Title>默认文字样式</Title>
      {
        PRESET_FONT_LIST.map(item => (
          <Card
            key={item.key}
            hoverable
            onClick={() => { handleClick(item) }}
            bodyStyle={{
              padding: '12px 30px'
            }}
          >
            {item.label}
          </Card>
        ))
      }
    </Flex>
  );
}
import { Flex, Card } from 'antd';
import Title from '@/fabritor/components/Title';

const PRESET_FONT_LIST = [
  {
    label: <div style={{ fontSize: 30, fontWeight: 'bold' }}>添加标题</div>,
    key: 'title',
    config: {
      fontFamily: 'Times New Roman',
      fontWeight: 'bold',
      fontSize: 100,
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
      fontSize: 75,
      text: '添加副标题',
      top: 200
    }
  },
  {
    label: <div style={{ fontSize: 16, fontFamily: 'AlibabaPuHuiTi' }}>添加一段正文</div>,
    key: 'content',
    config: {
      fontFamily: 'AlibabaPuHuiTi',
      fontSize: 50,
      text: '添加一段正文'
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
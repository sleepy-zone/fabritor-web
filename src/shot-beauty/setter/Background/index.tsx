import { Button, Drawer, Flex } from 'antd';
import { fabric } from 'fabric';
import { AllPresetColors, IndexPresetColors } from './preset';
import { useState } from 'react';
import { RightOutlined } from '@ant-design/icons';

const BackgroundItem = (props) => {
  const { color, onClick } = props;

  const calcBackgroundCSS = () => {
    if (typeof color === 'string') {
      return color;
    }
    return color.css;
  }

  return (
    <div
      style={{
        background: calcBackgroundCSS(),
        width: 40,
        height: 40,
        borderRadius: 6,
        cursor: 'pointer'
      }}
      onClick={onClick}
    />
  )
}

export default function BackgroundSetter (props) {
  const { value, onChange } = props;
  const [showMore, setShowMore] = useState(false);

  const handleColorChange = (item) => {
    if (typeof item === 'string') {
      onChange?.(item);
      return;
    }
    const { css, ...rest } = item;
    onChange?.(new fabric.Gradient(rest));
  }

  return (
    <div style={{ position: 'relative' }}>
      <Flex gap={8}>
        {
          IndexPresetColors.map((item, index) => (
            <BackgroundItem
              key={index}
              color={item}
              onClick={() => { handleColorChange(item) }}
            />
          ))
        }
      </Flex>
      <Button
        type="text"
        href="javascript:void(0);" 
        size="small"
        style={{
          position: 'absolute',
          right: -12,
          top: -34
        }}
        icon={<RightOutlined />}
      >
        更多
      </Button>
      <Drawer
        title="更多"
        placement="right"
        open={showMore}
        mask={false}
        maskClosable={false}
      >

      </Drawer>
    </div>
  )
}
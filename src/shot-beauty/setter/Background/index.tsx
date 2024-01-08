import { Button, Drawer, Flex } from 'antd';
import { fabric } from 'fabric';
import { AllPresetColors, IndexPresetColors } from './preset';
import { useState } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

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
          right: -10,
          top: -28
        }}
        onClick={() => { setShowMore(true); }}
      >
        更多<RightOutlined style={{ marginLeft: 2, fontSize: 12 }} />
      </Button>
      <Drawer
        title={null}
        placement="right"
        open={showMore}
        mask={false}
        maskClosable={false}
        width={340}
        rootStyle={{ top: 50 }}
        contentWrapperStyle={{ boxShadow: 'none' }}
        closeIcon={null}
      >
        <div>
          <Button
            type="text"
            href="javascript:void(0);" 
            size="small"
            onClick={() => { setShowMore(false); }}
            icon={<LeftOutlined />}
            style={{ marginLeft: -10 }}
          >
            更多背景
          </Button>
          <Flex gap={8} style={{ marginTop: 24 }}>
            {
              AllPresetColors.map((item, index) => (
                <BackgroundItem
                  key={index}
                  color={item}
                  onClick={() => { handleColorChange(item) }}
                />
              ))
            }
          </Flex>
        </div>
      </Drawer>
    </div>
  )
}
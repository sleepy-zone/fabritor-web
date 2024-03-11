import { useContext, useState } from 'react';
import { Modal } from 'antd';
import { GloablStateContext } from '@/context';
import { DRAG_ICON } from '@/assets/icon';
import { ClearOutlined, DragOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { CenterV } from '@/fabritor/components/Center';
import ToolbarItem from './ToolbarItem';

import './index.scss';

export default function Toolbar () {
  const { setActiveObject, editor } = useContext(GloablStateContext);
  const [panEnable, setPanEnable] = useState(false);

  const clearCanvas = () => {
    Modal.confirm({
      title: '确认清空画布，同时清空历史操作记录？',
      icon: <ExclamationCircleFilled />,
      async onOk () {
        await editor.clearCanvas();
        setActiveObject(editor.sketch);
      },
      okText: '确认',
      cancelText: '取消'
    });
  }

  const enablePan = () => {
    const enable = editor.switchEnablePan();
    setPanEnable(enable);
  }

  return (
    <CenterV gap={4} style={{ borderRight: '1px solid #e8e8e8', paddingRight: 12 }}>
      <ToolbarItem onClick={enablePan} title={panEnable ? '选择元素' : '拖拽画布'}>
        {
          panEnable? 
          <DragOutlined style={{ fontSize: 22, color: panEnable ? '#000' : '#ccc' }} /> :
          <img src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(DRAG_ICON)}`} style={{ width: 22, height: 22 }} />
        }
      </ToolbarItem>
      <ToolbarItem onClick={clearCanvas} title="清空画布">
        <ClearOutlined style={{ fontSize: 20 }} />
      </ToolbarItem>
    </CenterV>
  )
}
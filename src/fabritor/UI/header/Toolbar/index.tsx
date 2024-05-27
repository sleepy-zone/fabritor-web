import { useContext, useEffect, useState } from 'react';
import { Modal } from 'antd';
import { GloablStateContext } from '@/context';
import { DRAG_ICON } from '@/assets/icon';
import { ClearOutlined, DragOutlined, ExclamationCircleFilled, UndoOutlined, RedoOutlined } from '@ant-design/icons';
import { CenterV } from '@/fabritor/components/Center';
import ToolbarItem from './ToolbarItem';
import ToolbarDivider from '@/fabritor/components/ToolbarDivider';
import { Trans } from '@/i18n/utils';

import './index.scss';

const i18nKeySuffix = 'header.toolbar';

export default function Toolbar () {
  const { setActiveObject, editor } = useContext(GloablStateContext);
  const [panEnable, setPanEnable] = useState(false);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const clearCanvas = () => {
    Modal.confirm({
      title: <Trans i18nKey={`${i18nKeySuffix}.clear_confirm`} />,
      icon: <ExclamationCircleFilled />,
      async onOk () {
        await editor.clearCanvas();
        setActiveObject(editor.sketch);
        editor.fireCustomModifiedEvent();
      }
    });
  }

  const enablePan = () => {
    const enable = editor.switchEnablePan();
    setPanEnable(enable);
  }

  useEffect(() => {
    if (editor) {
      setCanUndo(editor.fhistory.canUndo());
      setCanRedo(editor.fhistory.canRedo());
    }
  });

  return (
    <CenterV gap={4} style={{ borderRight: '1px solid #e8e8e8', paddingRight: 12 }}>
      <ToolbarItem
        disabled={!canUndo} 
        title={<Trans i18nKey={`${i18nKeySuffix}.undo`} />} 
        onClick={() => { editor.fhistory.undo() }}
      >
        <UndoOutlined style={{ fontSize: 20 }} />
      </ToolbarItem>
      <ToolbarItem
        disabled={!canRedo}
        title={<Trans i18nKey={`${i18nKeySuffix}.redo`} />} 
        onClick={() => { editor.fhistory.redo() }}
      >
        <RedoOutlined style={{ fontSize: 20 }} />
      </ToolbarItem>
      <ToolbarDivider />
      <ToolbarItem
        onClick={enablePan}
        title={panEnable ? <Trans i18nKey={`${i18nKeySuffix}.select`} /> : <Trans i18nKey={`${i18nKeySuffix}.pan`} />}
      >
        {
          panEnable? 
          <DragOutlined style={{ fontSize: 22, color: panEnable ? '#000' : '#ccc' }} /> :
          <img src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(DRAG_ICON)}`} style={{ width: 22, height: 22 }} />
        }
      </ToolbarItem>
      <ToolbarItem onClick={clearCanvas} title={<Trans i18nKey={`${i18nKeySuffix}.clear`} />}>
        <ClearOutlined style={{ fontSize: 20 }} />
      </ToolbarItem>
    </CenterV>
  )
}
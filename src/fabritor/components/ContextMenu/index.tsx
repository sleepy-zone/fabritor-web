import { useImperativeHandle, forwardRef, useState } from 'react';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import { SKETCH_ID } from '@/utils/constants';
import { copyObject, pasteObject, removeObject, groupSelection, ungroup, changeLayerLevel } from '@/utils/helper';
import { getGlobalEditor } from '@/utils/global';

const ContextMenu = (props, ref) => {
  const [open, setOpen] = useState(false);
  const { object, noCareOpen } = props;

  const renderMenuItems = () => {
    if (!object || object.id === SKETCH_ID) {
      return [
        {
          label: '粘贴',
          key: 'paste',
        }
      ]
    }

    const menuItems: MenuProps['items']  = [
      {
        label: '复制',
        key: 'copy',
      },
      {
        label: '粘贴',
        key: 'paste',
      },
      {
        label: '创建副本',
        key: 'copy&paste',
      },
      {
        label: '删除',
        key: 'del',
      },
    ]

    if (object.type === 'activeSelection') {
      menuItems.push({
        type: 'divider',
      });
      menuItems.push({
        label: '建组',
        key: 'group',
      });
    }

    if (object.type === 'group' && !object.sub_type) {
      menuItems.push({
        type: 'divider',
      });
      menuItems.push({
        label: '取消建组',
        key: 'ungroup',
      });
    }

    if (object.type !== 'activeSelection') {
      menuItems.push({
        type: 'divider',
      });
      menuItems.push({
        label: '图层',
        key: 'layer',
        children: [
          {
            label: '上移',
            key: 'layer-up',
          },
          {
            label: '置顶',
            key: 'layer-top',
          },
          {
            label: '下移',
            key: 'layer-down',
          },
          {
            label: '置底',
            key: 'layer-bottom'
          }
        ]
      });
    }
    
    return menuItems;
  }

  const handleClick = async ({ key }) => {
    const editor = getGlobalEditor();
    switch (key) {
      case 'copy':
        await copyObject(editor.canvas, object);
        break;
      case 'paste':
        pasteObject(editor.canvas);
        break;
      case 'copy&paste':
        await copyObject(editor.canvas, object);
        await pasteObject(editor.canvas);
        break;
      case 'del':
        removeObject(object, editor.canvas);
        break;
      case 'group':
        groupSelection(editor.canvas, object);
        break;
      case 'ungroup':
        ungroup(editor.canvas, object);
        break;
      case 'layer-up':
      case 'layer-top':
      case 'layer-down':
      case 'layer-bottom':
        changeLayerLevel(key, editor, object);
      default:
        break; 
    }
    setOpen(false);
  } 

  useImperativeHandle(ref, () => ({
    show: () => setOpen(true),
    hide: () => setOpen(false),
  }));

  return (
    <Dropdown
      menu={{ items: renderMenuItems(), onClick: handleClick }} 
      trigger={['contextMenu']}
      open={noCareOpen ? undefined : open}
    >
      {props.children}
    </Dropdown>
  )
}

export default forwardRef(ContextMenu);
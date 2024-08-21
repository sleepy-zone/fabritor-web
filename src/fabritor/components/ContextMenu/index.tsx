import { useImperativeHandle, forwardRef, useState, useContext } from 'react';
import type { MenuProps } from 'antd';
import { Dropdown, Flex } from 'antd';
import { SKETCH_ID } from '@/utils/constants';
import { copyObject, pasteObject, removeObject, groupSelection, ungroup, changeLayerLevel } from '@/utils/helper';
import { GlobalStateContext } from '@/context';
import { useTranslation } from '@/i18n/utils';

// ⌘ C
const ContextMenuItem = (props) => {
  const { label, keyboard, cmdKey = false } = props;
  const { t } = useTranslation();
  const isMac = navigator.userAgent.indexOf('Mac OS X') > -1;

  const getCmdkey = () => {
    if (cmdKey) {
      if (isMac) return '⌘';
      return 'Ctrl'
    }
    return '';
  }

  return (
    <Flex gap={68} justify="space-between">
      <span>{label}</span>
      <span>{`${getCmdkey()} ${keyboard}`}</span>
    </Flex>
  )
}

const ContextMenu = (props, ref) => {
  const { object, noCareOpen } = props;
  const [open, setOpen] = useState(false);
  const { editor } = useContext(GlobalStateContext);
  const { t } = useTranslation();

  const renderMenuItems = () => {
    if (!object || object.id === SKETCH_ID) {
      return [
        {
          label: <ContextMenuItem label={t('setter.common.paste')} keyboard="V" cmdKey />,
          key: 'paste',
        }
      ]
    }

    const menuItems: MenuProps['items']  = [
      {
        label: <ContextMenuItem label={t('setter.common.copy')} keyboard="C" cmdKey />,
        key: 'copy',
      },
      {
        label: <ContextMenuItem label={t('setter.common.paste')} keyboard="V" cmdKey />,
        key: 'paste',
      },
      {
        label: <span>{t('setter.common.create_a_copy')}</span>,
        key: 'copy&paste',
      },
      {
        label: <ContextMenuItem label={t('setter.common.del')} keyboard="DEL" />,
        key: 'del',
      },
    ]

    if (object.type === 'activeSelection') {
      menuItems.push({
        type: 'divider',
      });
      menuItems.push({
        label: t('setter.group.g'),
        key: 'group',
      });
    }

    if (object.type === 'group' && !object.sub_type) {
      menuItems.push({
        type: 'divider',
      });
      menuItems.push({
        label: t('setter.group.ung'),
        key: 'ungroup',
      });
    }

    if (object.type !== 'activeSelection') {
      menuItems.push({
        type: 'divider',
      });
      menuItems.push({
        label: t('setter.common.layer'),
        key: 'layer',
        children: [
          {
            label: t('setter.common.layer_up'),
            key: 'layer-up',
          },
          {
            label:  t('setter.common.layer_top'),
            key: 'layer-top',
          },
          {
            label:  t('setter.common.layer_down'),
            key: 'layer-down',
          },
          {
            label:  t('setter.common.layer_bottom'),
            key: 'layer-bottom'
          }
        ]
      });
    }
    
    return menuItems;
  }

  const handleClick = async ({ key }) => {
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
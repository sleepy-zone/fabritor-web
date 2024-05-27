import { useContext } from 'react';
import { Divider, Layout, Typography } from 'antd';
import { GloablStateContext } from '@/context';
import { SKETCH_ID } from '@/utils/constants';
import SketchSetter from './SketchSetter';
import TextSetter from './TextSetter';
import ImageSetter from './ImageSetter';
import { LineSetter, ShapeSetter } from './ShapeSetter';
import { CenterV } from '@/fabritor/components/Center';
import CommonSetter from './CommonSetter';
import GroupSetter from './GroupSetter';
import PathSetter from './PathSetter';
import RoughSetter from './RoughSetter';
import { SETTER_WIDTH } from '@/config';
import { useTranslation } from '@/i18n/utils';

const { Sider } = Layout;
const { Title } = Typography;

const siderStyle: React.CSSProperties = {
  position: 'relative',
  backgroundColor: '#fff',
  borderLeft: '1px solid #e8e8e8'
};

export default function Setter () {
  const { object, isReady } = useContext(GloablStateContext);
  const { t } = useTranslation();

  const objectType = object?.get?.('type') || '';
  console.log('objectType', objectType, object);

  const getRenderSetter = () => {
    if (!isReady) return null;
    if (!object || object.id === SKETCH_ID) return <SketchSetter />;
    switch (objectType) {
      case 'textbox':
      case 'f-text':
        return <TextSetter />;
      case 'rect':
      case 'circle':
      case 'triangle':
      case 'polygon':
      case 'ellipse':  
        return <ShapeSetter />;
      case 'f-line':
      case 'f-arrow':
      case 'f-tri-arrow':
        return <LineSetter />;
      case 'f-image':
        return <ImageSetter />;
      case 'path':
        if (object?.sub_type === 'rough') {
          return <RoughSetter />
        }
        return <PathSetter />;
      case 'group':
        if (object?.sub_type === 'rough') {
          return <RoughSetter />
        }
        return <GroupSetter />;
      case 'activeSelection':
        return <GroupSetter />;
      default:
        return null;
    }
  }

  const renderSetter = () => {
    const Setter = getRenderSetter();
    if (Setter) {
      return (
        <>
        {Setter}
        <Divider />
        </>
      )
    }
    return null;
  }

  const getSetterTitle = () => {
    if (!isReady) return null;
    if (!object || object.id === SKETCH_ID) return t('setter.sketch.title');
    switch (objectType) {
      case 'textbox':
      case 'f-text':
        return t('panel.text.title');
      case 'rect':
      case 'circle':
      case 'triangle':
      case 'polygon':
      case 'ellipse':  
        return t('panel.material.shape');
      case 'line':
      case 'f-line':
      case 'f-arrow':
      case 'f-tri-arrow':
        return t('panel.material.line');
      case 'f-image':
      case 'image':
        return t('panel.image.title');
      case 'path':
        if (object?.sub_type) {
          if (object?.sub_type === 'rough') {
            return t('panel.material.hand_drawn');
          }
          return t('panel.material.shape');
        }
        return t('panel.paint.title');
      case 'group':
        if (object?.sub_type === 'rough') {
          return t('panel.material.hand_drawn');
        }
        return t('setter.group.title');
      case 'activeSelection':
        return t('setter.group.title')
      default:
        return t('setter.sketch.title')
    }
  }

  const renderSetterTitle = () => {
    const title = getSetterTitle();
    if (!title) {
      return null;
    }
    return (
      <CenterV style={{ borderBottom: '1px solid #e8e8e8', paddingLeft: 16 }}>
        <Title level={5}>
          {getSetterTitle()}
        </Title>
      </CenterV>
    )
  }

  return (
    <Sider
      style={siderStyle}
      width={SETTER_WIDTH}
      className="fabritor-sider"
    >
      {renderSetterTitle()}
      <div
        style={{ padding: 16 }}
      >
        {renderSetter()}
        <CommonSetter />
      </div>
    </Sider>
  )
}
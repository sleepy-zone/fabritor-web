import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import TemplatePanel from '../TemplatePanel';
import Layer from './Layer';
import { useState } from 'react';

export default function DesignPanel (props) {
  const [activeKey, setActiveKey] = useState(props.defaultKey);
  const items: TabsProps['items'] = [
    {
      key: 'layers',
      label: '图层',
      children: <Layer />
    },
    {
      key: 'template',
      label: '模板库',
      children: (
        <TemplatePanel
          onLoadTpl={() => { 
            setActiveKey('layers');
          }} 
        />
      )
    }
  ];

  return (
    <div className="fabritor-panel-wrapper" style={{ padding: 0 }}>
      <Tabs
        activeKey={activeKey}
        onChange={setActiveKey}
        items={items}
        centered
      />
    </div>
  );
}
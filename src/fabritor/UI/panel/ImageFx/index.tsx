import { fabric } from 'fabric';
import { useEffect, useContext } from 'react';
import { GloablStateContext } from '@/context';
import { Slider, Form } from 'antd';
import Title from '@/fabritor/components/Title';
import RadioImageGroup from '@/fabritor/components/RadioImageGroup';

const { Item: FormItem } = Form;

const COLOR_FILTER_LIST = [
  {
    label: '古典',
    value: 'Vintage',
    src: 'https://cdn.pixabay.com/photo/2023/12/07/11/11/girl-8435340_1280.png'
  },
  {
    label: '胶片',
    value: 'Kodachrome',
    src: 'https://cdn.pixabay.com/photo/2023/12/07/11/11/girl-8435340_1280.png'
  }
];

const FILTER_INDEX = ['Vintage', 'Kodachrome'];

export default function ImageFx () {
  const { object, setFxType } = useContext(GloablStateContext);
  const [form] = Form.useForm();

  const handleFxValueChange = (values) => {
    console.log(values);
    if (values.colorFilter) {
      object.applyFilter(new fabric.Image.filters[values.colorFilter]());
      object.canvas.requestRenderAll();
    }
  }

  const initImageFx = () => {
    form.setFieldsValue({
      
    })
  }

  useEffect(() => {
    if (!object || object.type !== 'f-image') {
      setFxType('');
    } else {
      initImageFx();
    }
  }, [object]);

  return (
    <div className="fabritor-setter-panel">
      <Form
        form={form}
        onValuesChange={handleFxValueChange}
        style={{ padding: '0 16px' }}
      >
        <Title>温暖</Title>
        <FormItem name="colorFilter">
          <RadioImageGroup options={COLOR_FILTER_LIST} />
        </FormItem>
      </Form>
    </div>
  )
}
import { fabric } from 'fabric';
import { useEffect, useContext } from 'react';
import { GlobalStateContext } from '@/context';
import { Form } from 'antd';
import FilterGroup from './FilterGroup';

const { Item: FormItem } = Form;

const handleFilterValue = (filter) => {
  if (!filter) return { type: 'none' };
  const { type } = filter;
  if (type === 'Blur') {
    return { type, param: filter.blur }
  }
  if (type === 'Pixelate') {
    return { type, param: filter.blocksize }
  }
  if (type === 'HueRotation') {
    return { type, param: filter.rotation }
  }
  return { type };
}

export default function ImageFx () {
  const { object, editor } = useContext(GlobalStateContext);
  const [form] = Form.useForm();

  const handleFxValueChange = (values) => {
    if (values.filter) {
      const { type, param } = values.filter;
      let filter;
      if (type === 'Emboss') {
        filter = new fabric.Image.filters.Convolute({
          matrix:  [ 1,   1,  1,
                     1, 0.7, -1,
                    -1,  -1, -1 ]
        });
      } else if (type === 'none') {
        filter = null;
      } else {
        filter = new fabric.Image.filters[type]();
      }
      if (type === 'Blur') {
        filter.blur = param == undefined ? 0.2 : param;
      }
      if (type === 'Pixelate') {
        filter.blocksize = param == undefined ? 4 : param;
      }
      if (type === 'HueRotation') {
        filter.rotation = param == undefined ? 0 : param;
      }
      object.applyFilter(filter);
      object.canvas.requestRenderAll();
      editor.fireCustomModifiedEvent();
    }
  }

  const initImageFx = () => {
    const filter = object.getFilter();
    console.log(filter);
    form.setFieldsValue({
      filter: handleFilterValue(filter)
    });
  }

  useEffect(() => {
    if (object && object.type === 'f-image') {
      initImageFx();
    }
  }, [object]);

  return (
    <Form
      form={form}
      onValuesChange={handleFxValueChange}
    >
      <FormItem name="filter">
        <FilterGroup />
      </FormItem>
    </Form>
  )
}
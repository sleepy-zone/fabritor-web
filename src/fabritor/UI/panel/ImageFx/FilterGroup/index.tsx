import { Slider } from 'antd';
import './index.scss';

const COLOR_FILTER_LIST = [
  {
    label: '无',
    value: 'none',
    src: 'https://cdn.pixabay.com/photo/2017/02/15/13/18/girl-2068638_1280.jpg'
  },
  {
    label: '复古',
    value: 'Sepia',
    src: 'https://raw.githubusercontent.com/sleepy-zone/fabritor-assets/main/images/复古.png'
  },
  {
    label: '胶片',
    value: 'Kodachrome',
    src: 'https://raw.githubusercontent.com/sleepy-zone/fabritor-assets/main/images/胶片.png'
  },
  {
    label: '老照片',
    value: 'Vintage',
    src: 'https://raw.githubusercontent.com/sleepy-zone/fabritor-assets/main/images/老照片.png'
  },
  {
    label: '宝丽来',
    value: 'Polaroid',
    src: 'https://raw.githubusercontent.com/sleepy-zone/fabritor-assets/main/images/宝丽来.png'
  },
  {
    label: '模糊',
    value: 'Blur',
    src: 'https://raw.githubusercontent.com/sleepy-zone/fabritor-assets/main/images/模糊.png'
  },
  {
    label: '浮雕',
    value: 'Emboss',
    src: 'https://raw.githubusercontent.com/sleepy-zone/fabritor-assets/main/images/浮雕.png'
  },
  {
    label: '像素',
    value: 'Pixelate',
    src: 'https://raw.githubusercontent.com/sleepy-zone/fabritor-assets/main/images/像素.png'
  },
  {
    label: '黑白',
    value: 'Grayscale',
    src: 'https://raw.githubusercontent.com/sleepy-zone/fabritor-assets/main/images/黑白.png'
  },
  {
    label: '调色',
    value: 'HueRotation',
    src: 'https://raw.githubusercontent.com/sleepy-zone/fabritor-assets/main/images/调色.png'
  }
];

export default function RadioImageGroup (props) {
  const { value, onChange } = props;

  const handleChange = (v, key) => {
    onChange?.({
      ...value,
      [key]: v
    });
  }

  return (
    <div className="fabritor-radio-image-group">
      {
        COLOR_FILTER_LIST.map(option => (
          <div
            className="fabritor-radio-image-group-item"
            onClick={() => { handleChange(option.value, 'type') }}
          >
            <div
              className="fabritor-radio-image-group-img"
              style={{ borderColor: value?.type === option.value ? '#ff2222' : '#eeeeee' }}
            >
              <img src={option.src} style={{ width: '100%' }} />
            </div>
            <span>{option.label}</span>
            {
              option.value === 'Blur' && value?.type === 'Blur' ?
              <Slider
                min={0} 
                max={1}
                step={0.01}
                value={value?.param == undefined ? 0.2 : value?.param}
                onChange={(v) => { handleChange(v, 'param') }} 
              /> : null
            }
            {
              option.value === 'Pixelate' && value?.type === 'Pixelate' ?
              <Slider
                min={2} 
                max={20}
                step={0.01}
                value={value?.param == undefined ? 4 : value?.param}
                onChange={(v) => { handleChange(v, 'param') }} 
              /> : null
            }
            {
              option.value === 'HueRotation' && value?.type === 'HueRotation' ?
              <Slider
                min={-2} 
                max={2}
                step={0.002}
                value={value?.param == undefined ? 0 : value?.param}
                onChange={(v) => { handleChange(v, 'param') }} 
              /> : null
            }
          </div>
        ))
      }
    </div>
  )
}
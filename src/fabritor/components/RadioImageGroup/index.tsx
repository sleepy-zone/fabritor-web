import './index.scss';

export default function RadioImageGroup (props) {
  const { value, options, onChange } = props;

  return (
    <div className="fabritor-radio-image-group">
      {
        options.map(option => (
          <div
            className="fabritor-radio-image-group-item"
            onClick={() => { onChange?.(option.value) }}
          >
            <div
              className="fabritor-radio-image-group-img"
              style={{ borderColor: value === option.value ? '#ff2222' : '#eeeeee' }}
            >
              <img src={option.src} style={{ width: '100%' }} />
            </div>
            <span>{option.label}</span>
          </div>
        ))
      }
    </div>
  )
}
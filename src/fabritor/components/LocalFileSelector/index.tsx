import { useRef, forwardRef, useImperativeHandle } from 'react';

function LocalFileSelector (props, ref) {
  const { onChange, accept } = props;
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = (evt) => {
    const file = evt.target.files[0];
    if (!file) return;
    onChange && onChange(evt.target.files[0]);
    formRef.current?.reset?.();
  }
  useImperativeHandle(ref, () => ({
    start: () => {
      inputRef.current?.click?.();
    },
    reset: () => {
      formRef.current?.reset?.();
    }
  }))
  return (
    <form style={{ display: 'none' }} ref={formRef}>
      <input type="file" accept={accept || 'image/*'} ref={inputRef} onChange={handleFileChange}/>
    </form>
  )
}
export default forwardRef(LocalFileSelector);
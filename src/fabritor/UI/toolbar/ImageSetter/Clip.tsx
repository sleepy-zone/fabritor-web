import Cropper from 'cropperjs';
import { useRef, useState, useEffect } from 'react';
import { Button, Space } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

import 'cropperjs/dist/cropper.css';

export default function ClipSetter (props) {  
  const { object } = props;
  const imgRef = useRef<HTMLImageElement>();
  const cropperRef = useRef<Cropper | null>(null);
  const [showCrop, setShowCrop] = useState(false);
  const [imgInfo, setImgInfo] = useState<any>({});

  const startCrop = () => {
    setShowCrop(true);
    const boundingRect = object.getBoundingRect();
    setImgInfo({
      src: object.getSrc(),
      width: boundingRect.width,
      height: boundingRect.height,
      left: boundingRect.left + 420, // 420 is panel width
      top: boundingRect.top + 50 // 50 is setter toolbar height
    });
    setTimeout(() => {
      cropperRef.current = new Cropper(imgRef.current, {
        scalable: false,
        autoCropArea: 1,
        viewMode: 3,
        toggleDragModeOnDblclick: false
      });
      object.set('hasControls', false);
      object.canvas.requestRenderAll();
    }, 66);
  }

  const handleCrop = () => {
    if (cropperRef.current) {
      const newImage = cropperRef.current.getCroppedCanvas().toDataURL();
      object.setSrc(newImage, () => {
        object.set('hasControls', true);
        if (object.group) {
          object.group.addWithUpdate();
        }
        object.canvas.requestRenderAll();
        object.setCoords();
      });
      setShowCrop(false);
    }
  }

  const changeRatio = (r) => {
    if (cropperRef.current) {
      cropperRef.current.setAspectRatio(r);
    }
  }

  const cancel = () => {
    setShowCrop(false);
    object.set('hasControls', true);
    object.canvas.requestRenderAll();
  }

  useEffect(() => {
    return () => {
      if (cropperRef.current) {
        cropperRef.current.destroy();
        cropperRef.current = null;
      }
    }
  }, []);

  return (
    <div>
      <span className="fabritor-toolbar-setter-trigger" onClick={startCrop}>裁剪</span>

      {
        showCrop ?
        <div
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,.65)',
            zIndex: 1000
          }}
          className="fabritor-crop-wrapper"
        >
          <div
            style={{
            position: 'absolute',
            zIndex: 1001,
            left: imgInfo.left,
            top: imgInfo.top - 38
          }}
          >
            <Space.Compact block>
              <Button onClick={() => { changeRatio(1/1) }}>1:1</Button>
              <Button onClick={() => { changeRatio(4/3) }}>4:3</Button>
              <Button onClick={() => { changeRatio(3/4) }}>3:4</Button>
              <Button onClick={() => { changeRatio(16/9) }}>16:9</Button>
              <Button onClick={() => { changeRatio(9/16) }}>9:16</Button>
              <Button icon={<CloseOutlined />} onClick={cancel} />
              <Button icon={<CheckOutlined />} onClick={handleCrop} />
            </Space.Compact>
          </div>
          <div
            style={{
              width: imgInfo.width,
              height: imgInfo.height,
              position: 'absolute',
              zIndex: 1001,
              left: imgInfo.left,
              top: imgInfo.top
            }}
            onDoubleClick={handleCrop}
          >
            <img ref={imgRef} src={imgInfo.src} style={{ display: 'block', maxWidth: '100%' }} />
          </div> 
        </div> : null
      }
    </div>
  )
}
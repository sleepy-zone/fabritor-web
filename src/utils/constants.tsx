export const APP_NAME = 'fabritor';
export const LOG_PREFIX = `${APP_NAME}_log：`;

export const OBJECT_DEFAULT_CONFIG = {
  // controls
  borderColor: '#FF2222',
  borderScaleFactor: 2,
  cornerStrokeColor: '#2222',
  cornerColor: '#FF2222',
  cornerSize: 12,
  cornerStyle: 'circle',
  transparentCorners: false,
  padding: 0,
  centeredScaling: false,
}

export const TEXTBOX_DEFAULT_CONFIG = {
  // styles
  fill: '#000000',
  fontWeight: 'normal',
  fontSize: 50,
  lineHeight: 1.30,
  textAlign: 'center',
  fontFamily: 'AlibabaPuHuiTi',
  // size
  width: 500,
  // 中文处理
  splitByGrapheme: true
}

export const FONT_PRESET_FAMILY_LIST = [
  { 
    label: <span style={{ fontFamily: 'AlibabaPuHuiTi', fontSize: 16 }}>阿里巴巴普惠体</span>, 
    value: 'AlibabaPuHuiTi'
  },
  { 
    label: <span style={{ fontFamily: 'SourceHanSans', fontSize: 16 }}>思源黑体</span>, 
    value: 'SourceHanSans' 
  },
  { 
    label: <span style={{ fontFamily: 'SourceHanSerif', fontSize: 16 }}>思源宋体</span>, 
    value: 'SourceHanSerif' 
  },
  { 
    label: <span style={{ fontFamily: '方正楷体', fontSize: 16 }}>方正楷体</span>, 
    value: '方正楷体' 
  },
  { 
    label: <span style={{ fontFamily: '包图小白体', fontSize: 16 }}>包图小白体</span>, 
    value: '包图小白体' 
  },
  { 
    label: <span style={{ fontFamily: '沐瑶软笔手写体', fontSize: 16 }}>沐瑶软笔手写体</span>, 
    value: '沐瑶软笔手写体' 
  },
  { 
    label: <span style={{ fontFamily: '站酷高端黑', fontSize: 16 }}>站酷高端黑</span>, 
    value: '站酷高端黑' 
  },
  { 
    label: <span style={{ fontFamily: '手写杂字体', fontSize: 16 }}>手写杂字体</span>, 
    value: '手写杂字体' 
  },
  { 
    label: <span style={{ fontFamily: '胡晓波男神体', fontSize: 16 }}>胡晓波男神体</span>, 
    value: '胡晓波男神体' 
  },
  { 
    label: <span style={{ fontFamily: '胡晓波骚包体', fontSize: 16 }}>胡晓波骚包体</span>, 
    value: '胡晓波骚包体' 
  },
  { 
    label: <span style={{ fontFamily: '沐瑶随心手写体', fontSize: 16 }}>沐瑶随心手写体</span>, 
    value: '沐瑶随心手写体' 
  },
  { 
    label: <span style={{ fontFamily: '清松手寫體', fontSize: 16 }}>清松手寫體</span>, 
    value: '清松手寫體' 
  },
  { 
    label: <span style={{ fontFamily: '站酷酷黑体', fontSize: 16 }}>站酷酷黑体</span>, 
    value: '站酷酷黑体' 
  },
  { 
    label: <span style={{ fontFamily: '站酷快乐体', fontSize: 16 }}>站酷快乐体</span>, 
    value: '站酷快乐体' 
  },
  { 
    label: <span style={{ fontFamily: '站酷文艺体', fontSize: 16 }}>站酷文艺体</span>, 
    value: '站酷文艺体' 
  },
  { 
    label: <span style={{ fontFamily: '站酷小薇LOGO体', fontSize: 16 }}>站酷小薇LOGO体</span>, 
    value: '站酷小薇LOGO体' 
  },
]

export const SKETCH_ID = 'fabritor-sketch';

export const FABRITOR_CUSTOM_PROPS = ['id', 'fabritor_desc', 'selectable', 'hasControls'];
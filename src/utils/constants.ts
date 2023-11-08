export const APP_NAME = 'fabritor';
export const LOG_PREFIX = `${APP_NAME}_log：`;

export const OBJECT_DEFAULT_CONFIG = {
  // controls
  borderColor: '#FF6666',
  borderScaleFactor: 2,
  cornerStrokeColor: '#FF6666',
  cornerColor: '#FF6666',
  cornerSize: 12,
  cornerStyle: 'circle',
  transparentCorners: false,
  padding: 4,
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
  // controls
  ...OBJECT_DEFAULT_CONFIG,
  // 中文处理
  splitByGrapheme: true
}

export const IMAGE_DEFAULT_CONFIG = {
  ...OBJECT_DEFAULT_CONFIG,
  padding: 0
}

export const FONT_PRESET_FAMILY_LIST = [
  { label: '阿里巴巴普惠体', value: 'AlibabaPuHuiTi' }
]
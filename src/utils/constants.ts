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
  fontWeight: 500,
  fontSize: 40,
  lineHeight: 1.3,
  textAlign: 'center',
  fontFamily: 'AlibabaPuHuiTi',
  // size
  width: 240,
  // controls
  ...OBJECT_DEFAULT_CONFIG,
  // 中文处理
  splitByGrapheme: true
}
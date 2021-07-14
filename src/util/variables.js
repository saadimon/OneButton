const getSize = size => size;
const variables = {
  /** Fonts */
  fontWeight_normal: '400',
  fontWeight_bold: '700',
  font_Archivo_Black: 'Archivo-Black',
  font_Archivo: 'Archivo',
  font_Roboto_Regular: 'Roboto-Regular',

  /** Sizes */
  getSize,

  /**Colors */
  colorPrimary: 'rgba(51, 0,255,1)',
  colorWhite: 'rgba(255,255,255,1)',
  colorPurple: 'rgba(166, 21, 189, 1)',
  colorCard: 'rgba(242, 242, 242, 1)',

  /** Styling */
  padding: getSize(12),
  paddingLarge: getSize(30),
  marginHorizontalAuthPages: getSize(35),
};

export default variables;

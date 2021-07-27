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
  colorPurpleLight: 'rgba(166, 21, 189, 1)',
  colorPurpleMedium: 'rgba(85, 47, 134, 1)',
  colorPurpleDark: 'rgba(61, 0, 138, 1)',
  colorPurpleDark2: '#2A005F',
  colorCard: 'rgba(242, 242, 242, 1)',
  colorBackgroundDarken: '#00000033',

  /** Styling */
  padding: getSize(12),
  paddingLarge: getSize(30),
  marginHorizontalAuthPages: getSize(35),
  modalViewWidth: '70%',
};

export default variables;

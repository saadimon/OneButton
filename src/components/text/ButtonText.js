import React from 'react';
import variables from '../../util/variables';
import H4 from './H4';
function ButtonText({children, style, buttonFilled, ...props}) {
  return (
    <H4
      {...props}
      style={{
        margin: 0,
        color: buttonFilled ? variables.colorWhite : variables.colorPrimary,
        ...style,
      }}>
      {children}
    </H4>
  );
}

export default ButtonText;

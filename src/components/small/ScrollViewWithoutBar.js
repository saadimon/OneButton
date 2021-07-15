import React from 'react';
import {ScrollView} from 'react-native';

function ScrollViewWithoutBar({children, ...props}) {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      {...props}>
      {children}
    </ScrollView>
  );
}

export default ScrollViewWithoutBar;

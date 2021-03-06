import React from 'react';
import {
  Text,
  TextProps,
} from 'react-native-ui-kitten';
import { textStyle } from '@src/components/common';

type TextElement = React.ReactElement<TextProps>;

export const S2Text = (): TextElement => {
  return (
    <Text
      style={textStyle.subtitle}
      category='s2'>
      Sample Text
    </Text>
  );
};

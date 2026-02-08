import React from 'react';
import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleSheet,
  TextStyle,
} from 'react-native';
import useTheme from '../hooks/useTheme';

export interface ITextProps extends RNTextProps {
  // styling
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h5?: boolean;
  p?: boolean;
  bold?: boolean;
  semibold?: boolean;
  weight?: TextStyle['fontWeight'];
  
  // colors
  primary?: boolean;
  secondary?: boolean;
  tertiary?: boolean;
  black?: boolean;
  white?: boolean;
  gray?: boolean;
  danger?: boolean;
  warning?: boolean;
  success?: boolean;
  info?: boolean;
  color?: string;
  
  // text transforms
  transform?: TextStyle['textTransform'];
  align?: TextStyle['textAlign'];
  
  // spacing
  marginBottom?: number;
  marginTop?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  margin?: number;
}

const Text = (props: ITextProps) => {
  const {colors, sizes} = useTheme();
  
  const {
    children,
    style,
    h1,
    h2,
    h3,
    h4,
    h5,
    p,
    bold,
    semibold,
    weight,
    primary,
    secondary,
    tertiary,
    black,
    white,
    gray,
    danger,
    warning,
    success,
    info,
    color,
    transform,
    align,
    marginBottom,
    marginTop,
    marginHorizontal,
    marginVertical,
    margin,
    ...rest
  } = props;

  const textStyle = StyleSheet.flatten([
    {
      color: colors.text,
      fontSize: sizes.p,
    },
    h1 && {fontSize: sizes.h1, fontWeight: 'bold'},
    h2 && {fontSize: sizes.h2, fontWeight: 'bold'},
    h3 && {fontSize: sizes.h3, fontWeight: 'bold'},
    h4 && {fontSize: sizes.h4, fontWeight: 'bold'},
    h5 && {fontSize: sizes.h5, fontWeight: '600'},
    p && {fontSize: sizes.p},
    bold && {fontWeight: 'bold'},
    semibold && {fontWeight: '600'},
    weight && {fontWeight: weight},
    primary && {color: colors.primary},
    secondary && {color: colors.secondary},
    tertiary && {color: colors.tertiary},
    black && {color: colors.black},
    white && {color: colors.white},
    gray && {color: colors.gray},
    danger && {color: colors.danger},
    warning && {color: colors.warning},
    success && {color: colors.success},
    info && {color: colors.info},
    color && {color},
    transform && {textTransform: transform},
    align && {textAlign: align},
    marginBottom && {marginBottom},
    marginTop && {marginTop},
    marginHorizontal && {marginHorizontal},
    marginVertical && {marginVertical},
    margin && {margin},
    style,
  ]) as TextStyle;

  return (
    <RNText {...rest} style={textStyle}>
      {children}
    </RNText>
  );
};

export default Text;

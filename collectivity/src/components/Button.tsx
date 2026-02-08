import React from 'react';
import {TouchableOpacity, ActivityIndicator, StyleSheet, ViewStyle} from 'react-native';
import {Text} from 'react-native';
import useTheme from '../hooks/useTheme';

export type ButtonProps = {
  children?: React.ReactNode;
  bgColor?: string;
  color?: string;
  hoverBgColor?: string;
  hoverColor?: string;
  isLoading?: boolean;
  disabled?: boolean;
  title?: string;
  style?: any;
  onPress?: () => any;
  marginTop?: number;
  marginBottom?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  margin?: number;
};

const Button = (props: ButtonProps) => {
  const {
    children,
    bgColor,
    color,
    hoverBgColor,
    hoverColor,
    isLoading,
    disabled,
    title,
    onPress,
    style,
    marginTop,
    marginBottom,
    marginHorizontal,
    marginVertical,
    margin,
    ...restProps
  } = props;

  const { colors, sizes } = useTheme();

  const buttonStyle = StyleSheet.flatten([
    {
      backgroundColor: bgColor || color || colors.primary,
      borderRadius: sizes.buttonRadius || 8,
      alignItems: 'center',
      justifyContent: 'center',
      padding: sizes.padding || 16,
      minHeight: 50,
    },
    disabled && {
      backgroundColor: colors.gray,
      opacity: 0.6,
    },
    marginTop && { marginTop },
    marginBottom && { marginBottom },
    marginHorizontal && { marginHorizontal },
    marginVertical && { marginVertical },
    margin && { margin },
    style,
  ]) as ViewStyle;

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || isLoading}
      {...restProps}>
      {isLoading ? (
        <ActivityIndicator color={colors.white} />
      ) : children ? (
        children
      ) : (
        <Text style={{ color: colors.white, fontWeight: 'bold' }}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;

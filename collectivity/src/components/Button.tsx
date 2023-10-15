import {TouchableOpacity} from 'react-native';
import {Text, StyleSheet} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

export type ButtonProps = {
  bgColor?: string;
  color?: string;
  hoverBgColor?: string;
  hoverColor?: string;
  isLoading?: boolean;
  title?: string;
  style?: any;
  onPress?: () => any;
};

const Button = (props: ButtonProps) => {
  const {
    bgColor,
    color,
    hoverBgColor,
    hoverColor,
    isLoading,
    title,
    onPress,
    style,
    ...restProps
  } = props;

  const styles = StyleSheet.create({
    button: {
      backgroundColor: bgColor,
      color: color,
      boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
      borderRadius: 15,
      textAlign: 'center',
      justifyContent: 'center',
    },
    button_hover: {
      backgroundColor: hoverBgColor,
      color: hoverColor,
      boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
      borderRadius: 15,
      textAlign: 'center',
      justifyContent: 'center',
    },
  });

  return (
    <TouchableOpacity
      style={[style, styles.button]}
      onPress={onPress}
      {...restProps}>
      {!isLoading && <Text>{title}</Text>}
      {isLoading && <Spinner color="#ffffff" />}
    </TouchableOpacity>
  );
};

export default Button;

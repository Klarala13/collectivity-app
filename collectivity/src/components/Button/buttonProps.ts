import {ViewStyle, StyleProp} from 'react-native';
import {useTheme} from '../../hooks';

export type ButtonProps = {
  variant: 'primary' | 'secondary' | 'outline' | 'text';
  isFullWidth?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  title?: string;
  textColor?: any;
  testID?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

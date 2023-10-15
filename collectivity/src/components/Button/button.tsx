import {TouchableOpacity} from 'react-native';
import {Text} from 'react-native';
import {ButtonProps} from '../Button/buttonProps';
import Spinner from 'react-native-loading-spinner-overlay';

const Button = (props: ButtonProps) => {
  const {
    title,
    onPress,
    isDisabled,
    isLoading,
    textColor,
    variant,
    style,
    ...restProps
  } = props;

  return (
    <TouchableOpacity
      style={[style]}
      onPress={onPress}
      disabled={isDisabled || isLoading}
      testID="button"
      {...restProps}>
      {!isLoading && (
        <Text
          color={'' || 'neutral-00'}
          size="sm"
          weight={variant === 'text' ? 400 : 600}
          numberOfLines={1}
          adjustsFontSizeToFit={true}>
          {title}
        </Text>
      )}
      {isLoading && <Spinner color="#ffffff" />}
    </TouchableOpacity>
  );
};

export default Button;

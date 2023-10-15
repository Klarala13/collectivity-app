import React from 'react';
import dayjs from 'dayjs';
import {TouchableWithoutFeedback} from 'react-native';

import {Text} from 'react-native';
import Block from './Block';
import Image from './Image';
import {useTheme} from '../hooks';
import {IArticle} from '../constants/types';

const Article = ({
  title,
  description,
  image,
  category,
  rating,
  location,
  timestamp,
  user,
  onPress,
}: any) => {
  const {colors, gradients, icons, sizes} = useTheme();

  // render card for Newest & Fashion
  if (category?.id !== 1) {
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <Block card padding={sizes.sm} marginTop={sizes.sm}>
          <Image height={170} resizeMode="cover" source={{uri: image}} />
          {/* article category */}
          {category?.name && <Text>{category?.name}</Text>}

          {/* article description */}
          {description && <Text>{description}</Text>}

          {/* user details */}
          {user?.name && (
            <Block row marginLeft={sizes.xs} marginBottom={sizes.xs}>
              <Image
                radius={sizes.s}
                width={sizes.xl}
                height={sizes.xl}
                source={{uri: user?.avatar}}
                style={{backgroundColor: colors.white}}
              />
              <Block justify="center" marginLeft={sizes.s}>
                <Text>{user?.name}</Text>
                <Text></Text>
              </Block>
            </Block>
          )}

          {/* location & rating */}
          {(Boolean(location) || Boolean(rating)) && (
            <Block row align="center">
              <Image source={icons.location} marginRight={sizes.s} />
              <Text>
                {location?.city}, {location?.country}
              </Text>
              <Text>•</Text>
              <Image source={icons.star} marginRight={sizes.s} />
              <Text>{rating}/5</Text>
            </Block>
          )}
        </Block>
      </TouchableWithoutFeedback>
    );
  }

  // render card for Popular
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Block card white padding={0} marginTop={sizes.sm}>
        <Image
          background
          resizeMode="cover"
          radius={sizes.cardRadius}
          source={{uri: image}}>
          <Block color={colors.overlay} padding={sizes.padding}>
            <Text>{title}</Text>
            <Text>{description}</Text>
            {/* user details */}
            <Block row marginTop={sizes.xxl}>
              <Image
                radius={sizes.s}
                width={sizes.xl}
                height={sizes.xl}
                source={{uri: user?.avatar}}
                style={{backgroundColor: colors.white}}
              />
              <Block justify="center" marginLeft={sizes.s}>
                <Text>{user?.name}</Text>
                <Text>{user?.department}</Text>
              </Block>
            </Block>
          </Block>
        </Image>
      </Block>
    </TouchableWithoutFeedback>
  );
};

export default Article;

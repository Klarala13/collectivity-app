import React from 'react';
import Block from './Block';
import Image from './Image';
import {useTheme} from '../hooks/';

const Item = ({image, type}: any) => {
  //should display the details of the product

  const {sizes} = useTheme();
  const isHorizontal = type !== 'vertical';
  const CARD_WIDTH = (sizes.width - sizes.padding * 2 - sizes.sm) / 2;

  return (
    <Block
      card
      flex={0}
      row={isHorizontal}
      marginBottom={sizes.sm}
      width={isHorizontal ? CARD_WIDTH * 2 + sizes.sm : CARD_WIDTH}>
      <Image
        resizeMode="cover"
        source={{uri: image}}
        style={{
          height: isHorizontal ? 114 : 110,
          width: !isHorizontal ? '100%' : sizes.width / 2.435,
        }}
      />
    </Block>
  );
};

export default Item;

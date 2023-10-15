import React from 'react';
import {FlatList} from 'react-native';

import {Block, Product} from '.';
import {Text} from 'react-native';

const ItemsList = () => {
  //Get list of current items
  //Iterate through the items, each item should have a name, a description and the name of the person sharing it
  //If you click on the item, you go to the Item´s detail page
  //If you click on the name of the person sharing it, you go to the messaging page

  return (
    <Block>
      {/* categories list */}

      {/* Items list */}
      <FlatList
        data={items}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => `${item?.id}`}
        renderItem={({item}) => <Product {...item} />}
      />
    </Block>
  );
};

export default ItemsList;

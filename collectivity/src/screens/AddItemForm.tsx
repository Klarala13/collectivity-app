import {Text} from 'react-native';
import Container from '../components/Container';
import React, {useCallback, useEffect, useState} from 'react';

import {useTheme} from '../hooks';
import {Input} from '../components';

const AddItemForm = () => {
  const {assets, colors, sizes} = useTheme();
  //Should display a form for adding an item
  //Should make call to backend to add that item to DB
  //Should have fields for item name, user´s name, item description, item picture and a you can choose wheather you want to give away the item or share it.
  //If you want to share the item, you should be able to choose if it´s for one day, one week or one month.
  return (
    <Container>
      <Text>Share item</Text>
      <Input
        autoCapitalize="none"
        marginBottom={sizes.m}
        label="Item name"
        placeholder="Item name"
      />
      <Input
        autoCapitalize="none"
        marginBottom={sizes.m}
        label="Category"
        placeholder="Category"
      />
    </Container>
  );
};

export default AddItemForm;

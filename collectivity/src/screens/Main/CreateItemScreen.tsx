import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '../../hooks';
import { Block, Button, Input, Text } from '../../components';

const CreateItemScreen = () => {
  const { colors, sizes } = useTheme();
  const [itemType, setItemType] = useState<'item' | 'offer'>('item');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = () => {
    if (!title || !description || !category) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    Alert.alert(
      'Success',
      `Your ${itemType === 'item' ? 'item' : 'time offer'} has been created!`,
      [{ text: 'OK', onPress: () => resetForm() }]
    );
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setCategory('');
  };

  return (
    <Block flex={1} color={colors.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Block paddingHorizontal={sizes.padding}>
          {/* Header */}
          <Block marginTop={sizes.xxl} marginBottom={sizes.m}>
            <Text h3 semibold color={colors.text as string}>
              Create New
            </Text>
          </Block>

          {/* Type Selector */}
          <Block row marginBottom={sizes.m}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                itemType === 'item' && { backgroundColor: colors.primary },
              ]}
              onPress={() => setItemType('item')}
            >
              <Text
                p
                semibold
                color={(itemType === 'item' ? colors.white : colors.gray) as string}
              >
                Share Item
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.typeButton,
                itemType === 'offer' && { backgroundColor: colors.primary },
              ]}
              onPress={() => setItemType('offer')}
            >
              <Text
                p
                semibold
                color={(itemType === 'offer' ? colors.white : colors.gray) as string}
              >
                Offer Time
              </Text>
            </TouchableOpacity>
          </Block>

          {/* Title Input */}
          <Input
            label="Title"
            placeholder={itemType === 'item' ? 'e.g. Vintage Chair' : 'e.g. Guitar Lessons'}
            value={title}
            onChangeText={setTitle}
            marginBottom={sizes.m}
          />

          {/* Description Input */}
          <Input
            label="Description"
            placeholder="Describe your item or service..."
            value={description}
            onChangeText={setDescription}
            marginBottom={sizes.m}
            multiline
            style={{ height: 100, textAlignVertical: 'top' }}
          />

          {/* Category Input */}
          <Input
            label="Category"
            placeholder="e.g. Furniture, Education, etc."
            value={category}
            onChangeText={setCategory}
            marginBottom={sizes.m}
          />

          {/* Image Upload Placeholder */}
          <Block
            color={colors.light}
            style={styles.imagePlaceholder}
            center
            align="center"
            justify="center"
            marginBottom={sizes.m}
          >
            <Text p color={colors.gray as string}>
              Tap to add image
            </Text>
            <Text p color={colors.gray as string} marginTop={sizes.xs}>
              (Coming soon)
            </Text>
          </Block>

          {/* Submit Button */}
          <Button onPress={handleSubmit} marginTop={sizes.sm}>
            <Text bold white transform="uppercase">
              Create {itemType === 'item' ? 'Item' : 'Offer'}
            </Text>
          </Button>
        </Block>
      </ScrollView>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 4,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#E9ECEF',
  },
  imagePlaceholder: {
    height: 150,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#CCC',
    borderStyle: 'dashed',
  },
});

export default CreateItemScreen;

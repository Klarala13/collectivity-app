import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useTheme } from '../../hooks';
import { Block, Text, Image } from '../../components';

const BrowseScreen = () => {
  const { colors, sizes } = useTheme();
  const [activeTab, setActiveTab] = useState<'items' | 'offers'>('items');

  // Mock data for display
  const mockItems = [
    { id: 1, title: 'Vintage Chair', category: 'Furniture', image: null },
    { id: 2, title: 'Books Collection', category: 'Books', image: null },
    { id: 3, title: 'Kitchen Appliances', category: 'Home', image: null },
  ];

  const mockOffers = [
    { id: 1, title: 'Guitar Lessons', category: 'Education', image: null },
    { id: 2, title: 'Dog Walking', category: 'Pets', image: null },
    { id: 3, title: 'Gardening Help', category: 'Home', image: null },
  ];

  const data = activeTab === 'items' ? mockItems : mockOffers;

  const renderItem = ({ item }: any) => (
    <Block
      card
      marginBottom={sizes.sm}
      padding={sizes.sm}
      color={colors.card}
      style={styles.itemCard}
    >
      <Block
        color={colors.light}
        style={styles.imagePlaceholder}
        center
        align="center"
        justify="center"
      >
        <Text p color={colors.gray as string}>
          No Image
        </Text>
      </Block>
      <Block marginTop={sizes.s}>
        <Text h5 semibold color={colors.text as string}>
          {item.title}
        </Text>
        <Block
          marginTop={sizes.xs}
          paddingHorizontal={sizes.s}
          paddingVertical={4}
          color={colors.secondary}
          style={styles.badge}
        >
          <Text p white>
            {item.category}
          </Text>
        </Block>
      </Block>
    </Block>
  );

  return (
    <Block flex={1} color={colors.background}>
      {/* Header */}
      <Block
        color={colors.card}
        paddingHorizontal={sizes.padding}
        paddingTop={sizes.xxl}
        paddingBottom={sizes.sm}
      >
        <Text h3 semibold color={colors.text as string}>
          Browse
        </Text>

        {/* Tab Selector */}
        <Block row marginTop={sizes.sm}>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'items' && { borderBottomColor: colors.primary },
            ]}
            onPress={() => setActiveTab('items')}
          >
            <Text
              p
              semibold
              color={(activeTab === 'items' ? colors.primary : colors.gray) as string}
            >
              Items
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'offers' && { borderBottomColor: colors.primary },
            ]}
            onPress={() => setActiveTab('offers')}
          >
            <Text
              p
              semibold
              color={(activeTab === 'offers' ? colors.primary : colors.gray) as string}
            >
              Time Offers
            </Text>
          </TouchableOpacity>
        </Block>
      </Block>

      {/* Content */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </Block>
  );
};

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    alignItems: 'center',
  },
  listContent: {
    padding: 20,
  },
  itemCard: {
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imagePlaceholder: {
    height: 150,
    borderRadius: 8,
  },
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 12,
  },
});

export default BrowseScreen;

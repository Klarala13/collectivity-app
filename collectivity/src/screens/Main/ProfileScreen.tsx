import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useTheme } from '../../hooks';
import { useAuthStore } from '../../stores/authStore';
import { Block, Button, Text } from '../../components';

const ProfileScreen = () => {
  const { colors, sizes } = useTheme();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [activeTab, setActiveTab] = useState<'items' | 'offers'>('items');

  // Mock user items
  const mockItems = [
    { id: 1, title: 'Vintage Chair', status: 'Available' },
    { id: 2, title: 'Books Collection', status: 'Reserved' },
  ];

  const mockOffers = [
    { id: 1, title: 'Guitar Lessons', status: 'Active' },
  ];

  const data = activeTab === 'items' ? mockItems : mockOffers;

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: () => logout(), style: 'destructive' },
      ]
    );
  };

  const renderItem = ({ item }: any) => (
    <Block
      row
      align="center"
      justify="space-between"
      padding={sizes.sm}
      marginBottom={sizes.xs}
      color={colors.card}
      style={styles.itemCard}
    >
      <Block flex={1}>
        <Text p semibold color={colors.text as string}>
          {item.title}
        </Text>
        <Text p color={colors.gray as string} marginTop={4}>
          {item.status}
        </Text>
      </Block>
      <TouchableOpacity>
        <Text p color={colors.primary as string}>
          Edit
        </Text>
      </TouchableOpacity>
    </Block>
  );

  return (
    <Block flex={1} color={colors.background}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Block
          color={colors.primary}
          paddingHorizontal={sizes.padding}
          paddingTop={sizes.xxl}
          paddingBottom={sizes.xl}
        >
          {/* Avatar */}
          <Block center>
            <Block
              color={colors.secondary}
              style={styles.avatar}
              center
              align="center"
              justify="center"
            >
              <Text h2 white semibold>
                {user?.name?.charAt(0) || 'U'}
              </Text>
            </Block>
            <Text h4 white semibold marginTop={sizes.sm}>
              {user?.name || 'User'}
            </Text>
            <Text p white marginTop={sizes.xs}>
              {user?.email || 'user@example.com'}
            </Text>
          </Block>
        </Block>

        {/* Content */}
        <Block paddingHorizontal={sizes.padding} marginTop={sizes.m}>
          {/* Tab Selector */}
          <Block row marginBottom={sizes.sm}>
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
                My Items
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
                My Offers
              </Text>
            </TouchableOpacity>
          </Block>

          {/* Items/Offers List */}
          {data.length > 0 ? (
            data.map((item) => (
              <Block key={item.id}>
                {renderItem({ item })}
              </Block>
            ))
          ) : (
            <Block center align="center" justify="center" padding={sizes.xl}>
              <Text p color={colors.gray as string}>
                No {activeTab} yet
              </Text>
            </Block>
          )}

          {/* Edit Profile Button */}
          <Button
            onPress={() => Alert.alert('Edit Profile', 'Coming soon!')}
            marginTop={sizes.m}
            bgColor={colors.light as string}
          >
            <Text semibold color={colors.primary as string}>
              Edit Profile
            </Text>
          </Button>

          {/* Logout Button */}
          <Button
            onPress={handleLogout}
            marginTop={sizes.sm}
            marginBottom={sizes.xl}
            bgColor={colors.danger as string}
          >
            <Text bold white>
              Logout
            </Text>
          </Button>
        </Block>
      </ScrollView>
    </Block>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    alignItems: 'center',
  },
  itemCard: {
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default ProfileScreen;

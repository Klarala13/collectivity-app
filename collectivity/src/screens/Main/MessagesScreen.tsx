import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../hooks';
import { Block, Text } from '../../components';

const MessagesScreen = () => {
  const { colors, sizes } = useTheme();

  // Mock conversation data
  const mockConversations = [
    {
      id: 1,
      userName: 'John Doe',
      lastMessage: 'Thanks for the chair!',
      timestamp: '2h ago',
      unread: true,
    },
    {
      id: 2,
      userName: 'Jane Smith',
      lastMessage: 'Is the item still available?',
      timestamp: '5h ago',
      unread: false,
    },
    {
      id: 3,
      userName: 'Mike Johnson',
      lastMessage: 'When can we meet?',
      timestamp: '1d ago',
      unread: false,
    },
  ];

  const renderConversation = ({ item }: any) => (
    <TouchableOpacity>
      <Block
        row
        align="center"
        padding={sizes.sm}
        marginBottom={sizes.xs}
        color={colors.card}
        style={styles.conversationCard}
      >
        {/* Avatar Placeholder */}
        <Block
          color={colors.primary}
          style={styles.avatar}
          center
          align="center"
          justify="center"
        >
          <Text h5 white semibold>
            {item.userName.charAt(0)}
          </Text>
        </Block>

        {/* Message Content */}
        <Block flex={1} marginLeft={sizes.sm}>
          <Block row justify="space-between" align="center">
            <Text p semibold color={colors.text as string}>
              {item.userName}
            </Text>
            <Text p color={colors.gray as string} style={styles.timestamp}>
              {item.timestamp}
            </Text>
          </Block>
          <Text p color={colors.gray as string} marginTop={4} numberOfLines={1}>
            {item.lastMessage}
          </Text>
        </Block>

        {/* Unread Indicator */}
        {item.unread && (
          <Block
            color={colors.primary}
            style={styles.unreadBadge}
          />
        )}
      </Block>
    </TouchableOpacity>
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
          Messages
        </Text>
      </Block>

      {/* Conversations List */}
      {mockConversations.length > 0 ? (
        <FlatList
          data={mockConversations}
          renderItem={renderConversation}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Block flex={1} center align="center" justify="center">
          <Text p color={colors.gray as string}>
            No messages yet
          </Text>
        </Block>
      )}
    </Block>
  );
};

const styles = StyleSheet.create({
  listContent: {
    padding: 20,
  },
  conversationCard: {
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  timestamp: {
    fontSize: 12,
  },
  unreadBadge: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 8,
  },
});

export default MessagesScreen;

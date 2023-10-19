import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  Text,
} from 'react-native';
import axios from 'axios';
import Container from '../components/Container';
import {Poppins_400Regular} from '@expo-google-fonts/poppins';

const UserItemsList = ({id}: {id: string}) => {
  //Add a button inside each item to contact the user who has it
  //Should have two filters: one by category and one by location

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const styles = StyleSheet.create({
    items: {
      margin: 'auto',
      padding: 10,
      fontFamily: Poppins_400Regular,
      fontSize: 12,
    },
    safeArea: {
      flex: 1,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/user/${id}`);
        setItems(response.data.message.freebies);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {items && (
        <Container>
          <FlatList
            data={items}
            keyExtractor={(item) => item['item_id']}
            renderItem={({item}) => (
              <View style={{padding: 16}}>
                <Text style={{fontSize: 14, fontWeight: '600'}}>
                  {item['item']}
                </Text>
                <Image
                  source={{uri: item['image']}}
                  style={{width: 100, height: 100}}
                />
                <Text>Category: {item['category']}</Text>
                <Text>Description: {item['description']}</Text>
                <Text>Location: {item['location']}</Text>
                <Text>ZIP: {item['zip_code']}</Text>
              </View>
            )}
          />
        </Container>
      )}
    </SafeAreaView>
  );
};

export default UserItemsList;

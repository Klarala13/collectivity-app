import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import Container from '../components/Container';
import {Poppins_400Regular} from '@expo-google-fonts/poppins';
import UserItemsList from './UserItemsList';

//Send user id to request so we get single user
//Get user´s freebies and display under profile info

const Profile = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const styles = StyleSheet.create({
    text: {
      margin: 'auto',
      padding: 10,
      fontFamily: Poppins_400Regular,
      fontSize: 12,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/user');
        setUsers(response.data.message.users);
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
    <SafeAreaView style={{flex: 1}}>
      <Container>
        <FlatList
          data={users}
          keyExtractor={(item) => item['user_id']}
          renderItem={({item}) => (
            <View style={styles.text}>
              <Image
                source={{uri: item['image']}}
                style={{
                  width: 120,
                  height: 120,
                  alignSelf: 'center',
                  marginBottom: 10,
                }}
              />
              <Text>
                Name: {item['first_name']} {item['last_name']}
              </Text>
              <Text>Email: {item['email']}</Text>
              <Text>City: {item['city']}</Text>
              <Text>Zip Code: {item['zip_code']}</Text>
              {/* <UserItemsList id={item['user_id'] ? item['user_id'] : ''} /> */}
            </View>
          )}
        />
      </Container>
    </SafeAreaView>
  );
};

export default Profile;

import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  View,
  Text,
  Image,
  SafeAreaView,
} from 'react-native';
import axios from 'axios';
import Container from '../components/Container';

const Profile = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/user');
        console.log(response.data.message.users);
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
            <View style={{padding: 16}}>
              <Image
                source={{uri: item['image']}}
                style={{width: 100, height: 100}}
              />
              <Text>
                Name: {item['first_name']} {item['last_name']}
              </Text>
              <Text>Email: {item['email']}</Text>
              <Text>City: {item['city']}</Text>
              <Text>Zip Code: {item['zip_code']}</Text>
              <Text>Registration Date: {item['registration_date']}</Text>
              <Text>Rating: {item['rating']}</Text>
            </View>
          )}
        />
      </Container>
    </SafeAreaView>
  );
};

export default Profile;

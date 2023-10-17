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
import Container from './Container';
import {Poppins_400Regular} from '@expo-google-fonts/poppins';

const ItemsList = () => {
  //Get list of current items
  //Iterate through the items, each item should have a name, a description and the name of the person sharing it
  //If you click on the item, you go to the Item´s detail page
  //If you click on the name of the person sharing it, you go to the messaging page
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
        const response = await axios.get('http://localhost:4000/listItems');
        setItems(response.data.message.items);
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
    <SafeAreaView style={styles.safeArea}></SafeAreaView>
    //   <Container>
    //     <FlatList
    //       data={items}
    //       keyExtractor={(item) => item['user_id']}
    //       renderItem={({item}) => (
    //         <View style={{padding: 16}}>
    //           <Image
    //             source={{uri: item['image']}}
    //             style={{width: 100, height: 100}}
    //           />
    //           <Text>Item: {item}</Text>
    //           <Text>Description: {item['description']}</Text>
    //           {/* <Link> */}
    //           <Text>City: {item['user']}</Text>
    //           {/* </Link> */}
    //         </View>
    //       )}
    //     />
    //   </Container> */}
  );
};

export default ItemsList;

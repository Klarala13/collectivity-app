import React from "react";
import { View, Text, FlatList} from "react-native";
//import items from backend

const list = [
    {
        "id": 1,
      "name": "Molecule Man",
      "age": 29,
      "secretIdentity": "Dan Jukes",
      "powers": ["Radiation resistance", "Turning tiny", "Radiation blast"]
    },
    {
        "id": 2,
      "name": "Madame Uppercut",
      "age": 39,
      "secretIdentity": "Jane Wilson",
      "powers": [
        "Million tonne punch",
        "Damage resistance",
        "Superhuman reflexes"
      ]
    },
    {
        "id": 3,
      "name": "Eternal Flame",
      "age": 1000000,
      "secretIdentity": "Unknown",
      "powers": [
        "Immortality",
        "Heat Immunity",
        "Inferno",
        "Teleportation",
        "Interdimensional travel"
      ]
    }
  ]

const ItemsList = () =>  {
    return (
        <View>
            <Text>Item´s list</Text>
            <FlatList 
                data={list}
                ItemSeparatorComponent={() => <Text></Text>}
                renderItem={({list: list}) => (
                    <View key={list.id} style={{padding: 20}}>
                        <Text>id: {list.id}</Text>
                        <Text>name: {list.name}</Text>
                    </View>
                )}/>
            
        </View>
    )
}

export default ItemsList;
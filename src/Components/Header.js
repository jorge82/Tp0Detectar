
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
export default function Header({ name, openDrawer }) {
  return(
      <View style={styles.header}>
        <TouchableOpacity onPress={() => openDrawer()}>
          <Ionicons name="ios-menu" size={32} />
        </TouchableOpacity>
        <Text >{name}</Text>
        <Text style={{ width: 50 }}></Text>
      </View>
      )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop:40,
    alignItems:"center",
    flex:1

  },
  listItem:{
      height:60,
      alignItems:"center",
      flexDirection:"row",
  },
  title:{
      fontSize:20,
      marginLeft:20,
     
  },
  header:{
    width:"100%",
    height:60,
    flexDirection:"row",
    justifyContent: 'flex-start',
    paddingHorizontal:20
  },
  profileImg:{
    width:80,
    height:80,
    borderRadius:40,
    marginTop:5,
    color:'red'
  },
  sidebarDivider:{
    height:1,
    width:"80 %",
    backgroundColor:"lightgray",
    marginVertical:10
  }
});
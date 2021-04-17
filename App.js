import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import { createDrawerNavigator } from '@react-navigation/drawer'
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from "react-navigation-stack"
import { createAppContainer } from "react-navigation";

import Map from './src/screens/Map'

import { Ionicons, MaterialCommunityIcons,Foundation,FontAwesome5,FontAwesome,AntDesign,Entypo  } from '@expo/vector-icons';



const profileData={
  name: "Edson Justo",
  photo:'./assets/ed.png',
  email: 'justo.edson@gmail.com'
}

const Header =({name, openDrawer})=> (
  <View style={styles.header}>
    <TouchableOpacity onPress={()=>openDrawer()}>
      <Ionicons name="ios-menu" size={32} />
    </TouchableOpacity>
    <Text>{name}</Text>
    <Text style={{width:50}}></Text>
  </View>
)





function Item({ item, navigate }) {
  return (
    <TouchableOpacity style={styles.listItem} onPress={()=>navigate(item.name)}>
      {/* <Ionicons name={item.icon} size={32} /> */}
      {item.icon}
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );
}

class Sidebar extends React.Component {
  state = {
      routes:[
        {
          name:"Map",
          icon:<FontAwesome name="map" size={32} color="red" />
        },
    
        
      ]
  }

  
  render(){
      return (
          <View style={styles.container}>
              <TouchableOpacity onPress={()=>this.props.navigation.navigate('Profile')}>
              <Image source={require("./assets/ed.png")} style={styles.profileImg} resizeMode="contain"/>
              </TouchableOpacity>
              <Text style={{fontWeight:"bold",fontSize:16,marginTop:10}}>{profileData.name}</Text>
              <Text style={{color:"gray",marginBottom:10}}>{profileData.email}</Text>
              <View style={styles.sidebarDivider}></View>
              <FlatList
                  style={{width:"100%",marginLeft:30}}
                  data={this.state.routes}
                  renderItem={({ item }) => <Item  item={item} navigate={this.props.navigation.navigate}/>}
                  keyExtractor={item => item.name}
              />
          </View>
      )
  }
}

const Drawer = createDrawerNavigator(
  {
    
 
    Map:{screen:Map},

  },
  {
    initialRouteName: "Map",
    unmountInactiveRoutes: true,
    headerMode: "none",
    contentComponent: props => <Sidebar {...props} />
  }
)

const AppNavigator = createStackNavigator(
  {
    Drawer : {screen: Drawer,
      navigationOptions: {
        headerShown: false
    }},

  },
  {
    initialRouteName: "Drawer",
    unmountInactiveRoutes: true,
  
  }
)

const AppContainer = createAppContainer(AppNavigator);
export default function App() {
  return (
   

    <AppContainer />


  );
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
      fontSize:18,
      marginLeft:20
  },
  header:{
    width:"80",
    height:60,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    paddingHorizontal:20
  },
  profileImg:{
    width:80,
    height:80,
    borderRadius:40,
    marginTop:5,
  },
  sidebarDivider:{
    height:1,
    width:"80 %",
    backgroundColor:"lightgray",
    marginVertical:10
  }
});
import React from 'react';
import { StyleSheet, Text, View , Dimensions, Image,Button, TextInput,ScrollView, TouchableOpacity, requireNativeComponent, Alert} from 'react-native';
import  MapView, { Marker ,Callout,Polygon, Circle} from 'react-native-maps';
import * as Location from 'expo-location';
import Expo from 'expo'


//import Carousel from 'react-native-snap-carousel';
import {CENTROS} from '../DB/CentrosDetectar.js';
// import { Rating, AirbnbRating } from 'react-native-ratings';
import Slider from '@react-native-community/slider';
var UbicacionMarker = require ('../../assets/youAreHere.png');
import { Animated } from 'react-native';

import Header from '../Components/Header';
const initialRegion={
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
  
}

const minimunDistance=5000;
const maximumDistance=10000;
const colors =['darkred','darkblue','green', 'yellow', 'hotpink','cyan', 'darkgreen','gold','darkviolet','dodgerblue', 'indigo','mediumseagreen']



const current_location={coords:{latitude:-34.61745 , longitude:-58.36795}};


function array_move(arr, old_index, new_index) {
  if (new_index >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) {
          arr.push(undefined);
      }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr; // for testing
};
export default class  Map extends React.Component {

      state={
                location:null,
                places:[],
                poligono:[],
                originData:[],
                distance:2000,
                selectedCenter:{}
            
            
      }
      
      
  componentDidMount(){

    this.getLocationLongLatAsync();
    let poligonoData;
    if(this.props.selectedCenter){
      var index = CENTROS.findIndex(x => x.id ===this.props.selectedCenter.id);
    poligonoData=array_move(CENTROS,index,0);
    }else{
      poligonoData=CENTROS;
      poligonoData=poligonoData.map((item, index)=>{
        item.distance=this.calculateDistance(item.coordinates[1], item.coordinates[0],current_location.coords.latitude,current_location.coords.longitude)
        return item
      })
    }
    let newPlaces= CENTROS.map(item=>{
      return item.name
    })
  
   
    this.setState({places:newPlaces, poligono:poligonoData , originData:poligonoData})

    
  }

  getLocationLongLatAsync= async ()=>{

    try{
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');   
      return
    }
    let location = await Location.getCurrentPositionAsync({});
  
    
    this.setState({location:location})

 
  }catch(e){
      console.log("Error",e)
  }
  }
  calculateDistance=(lat1, lon1, lat2,lon2)=>{
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI/180; // φ, λ in radians
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;
    
    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    
    const d = R * c;
    return Math.round(d); // in metre
  }
  


  // renderCarrouselItem= ({item})=>(
   
  //   <View style={styles.cardContainer}>
  //     <View style={{flex:1, flexDirection:'row'}}>
  //       <View>
  //         <Text style={styles.title}> {item.name} </Text>
  //         <Rating defaultRating={item.rating} imageSize={15} ratingColor='#f1c40a' ratingBackgroundColor='red'/>
  //       </View>
        
  //       <View>
  //         <TouchableOpacity style={{height:50,width:50, justifyContent:"center",alignItems:"center"}} onPress={()=>this.goToDogWalkerProfile(item)}>
  //           <Text style={styles.hire} >Hire</Text>
  //         </TouchableOpacity>
  //         </View>
  //     </View>  
  //     <Image style={styles.image} source={{uri:item.photo}} ></Image>
      
  //   </View>

  // )


  // onCarouselItemChange = (index) =>{
  //   let location = this.state.poligono[index];
  //   this._map.animateToRegion( {latitude: location.latitude,
  //                             longitude: location.longitude,
  //                             latitudeDelta: 0.0722,
  //                             longitudeDelta: 0.0721,});


  // }

  onMarkerPressed= ( latitude,longitude, index) => {
    this._map.animateToRegion( {latitude: latitude,
                                longitude:longitude,
                                latitudeDelta: 0.0722,
                                longitudeDelta: 0.0721,});


  
      // this._carousel.snapToItem(index)


  }
  changeDistance=(maxDist)=>{
  
    var data=this.state.originData.filter(item=>item.distance<=maxDist)
    this.setState({ distance:maxDist , poligono:data})
  }
  render(){


    // si no se pudo encontrar la ubicacion 
    if (!this.state.location || !this.state.places){
     return( <View/>);
     }else{
    return (
   
       <ScrollView style={{marginTop:20}}>
        <Header name="Map" openDrawer={this.props.navigation.openDrawer}/>
        
           <>
                  <View style={StyleSheet.containerAll}>
                    <MapView style={styles.mapStyle}  ref={map => this._map = map}
                              initialRegion={{
                        
                          latitude: this.state.location.coords.latitude,
                          longitude: this.state.location.coords.longitude,
                          latitudeDelta: 0.0922,
                          longitudeDelta: 0.0921,
                        }} > 
                {/* <Polygon  coordinates={this.state.poligono} 
                    fillColor={'rgba(200,200,2,0.2)'} strokeColor={'red'} strokeWidth={3} tappable={true}></Polygon> */}
                
                <Circle center={this.state.location.coords}  radius={this.state.distance}  fillColor={'rgba(200,100,2,0.2)'} strokeColor={'red'} strokeWidth={3}></Circle>

                <Marker  key={100} title ='here you are' coordinate={this.state.location.coords}
                  pinColor='blue'
                  image={require('../../assets/youAreHere.png')}
                  >
                
                </Marker>
                {this.state.poligono.map((place,index)=>(
                  <Marker key={index} title ={place.lugar} coordinate={{ latitude : place.coordinates[1] , longitude : place.coordinates[0] }}
                  pinColor={colors[index]}  onPress={()=>this.onMarkerPressed(place.coordinates[1], place.coordinates[0],index)}
                >
                 <Callout>
                <View>
                  <Text>{place.lugar} </Text>
                  <Text>{place.direccion} </Text>
                  <Text>{place.comuna} </Text>
                </View>
            </Callout>
             
                </Marker> 

                ))} 
              
              
                </MapView>
          
                {/* <Carousel
                        ref={(c) => { this._carousel = c; }}
                        data={this.state.poligono}
                        renderItem={this.renderCarrouselItem}
                        containerCustomStyle={styles.carousel}
                        sliderWidth={Dimensions.get('window').width}
                        onSnapToItem={(index)=>this.onCarouselItemChange(index)}
                        initialNumToRender={this.state.poligono.length}
                        itemWidth={200}
                      /> */}
                      
            
            </View>
              <View style={styles.container}>
                    <Text>
                      Set max distance
                    </Text>
                          <Slider
                                minimumTrackTintColor='#13a9d6'
                                trackStyle={{ height: 40, backgroundColor: 'transparent' }}
                                thumbStyle={{ height: 60, width: 20, backgroundColor: 'transparent' }}
                                thumbTintColor='#0c6692'
                                style={{ height: 40}}
                                minimumValue={ minimunDistance}
                                step={100}
                                maximumValue={ maximumDistance}
                                thumbTouchSize={{width:40, height:40}}
                                value={this.state.distance}
                                onValueChange={distance => 
                                //this.setState({ distance })
                                this.changeDistance(distance)
                                }
                                thumbProps={{
                                            Component: Animated.Image,
                                    source:'../../assets/thumb.png'  }}
                              />
                          <View style={styles.textCon}>
                              <Text >{minimunDistance} m</Text>
                              <Text style={styles.colorBlue}>
                                  {this.state.distance + 'm'}
                              </Text>
                              <Text >{maximumDistance} m</Text>
                          </View>
                </View>
           </>
       
        
        
  </ScrollView>
 
       
  );}
  }
}
const styles = StyleSheet.create({
    container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: "stretch",
    justifyContent: "center"
     
    },
    mapStyle: {
     // ...StyleSheet.absoluteFillObject,
     width: Dimensions.get('window').width,
      height: Dimensions.get('window').height-200,
      
     
    },
    containerAll:{
      ...StyleSheet.absoluteFillObject
      
    },
    carousel:{
      position:'absolute',
      bottom:0,
     marginBottom:20
      
    },
    cardContainer:{
      backgroundColor:'rgba(0,0,0,0.6)',
      height:150,
      width:200,
      padding:10,
      borderRadius:30

    },
    title:{
      color:'white',
      fontSize:16,
      alignSelf:'center'

    },
    hire:{
      color:'yellow',
      fontSize:25,
      alignSelf:'center'

    },
    image:{
      height:80,
      width:200,
      bottom:0,
      position:'absolute',
      borderBottomLeftRadius:30,
      borderBottomRightRadius:30

    },
      thumb: {
    width: 50,
    height: 100,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 1,
  },
    textCon: {
        width: 320,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    colorGrey: {
        color: '#d3d3d3'
    },
    colorBlue: {
        color: '#3632a8'
    }

  
  });

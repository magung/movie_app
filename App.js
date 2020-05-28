
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from './src/screens/Home'
import DetailsScreen from './src/screens/DetailItem'
import MovieScreen from './src/screens/Movie'
import TVScreen from './src/screens/TV'
import SearchScreen from './src/screens/Search'
import ListScreen from './src/screens/List'
import CreateList from './src/screens/CreateList'
import VideoScreen from './src/screens/Video'
import PlayVideo from './src/screens/PlayVideo'
import DetailList from './src/screens/DetailList'
import AddItemList from './src/screens/AddItemList'

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function Home() {
  return(
    <Stack.Navigator initialRouteName="Home" headerMode="none">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Video" component={VideoScreen} />
        <Stack.Screen name="PlayVideo" component={PlayVideo} />
        <Stack.Screen name="AddItemList" component={AddItemList} />
        <Stack.Screen name="List" component={ListScreen} />
        <Stack.Screen name="DetailList" component={DetailList} />
    </Stack.Navigator>
  )
}

function Movie() {
  return(
    <Stack.Navigator initialRouteName="Movie" headerMode="none">
        <Stack.Screen name="Movie" component={MovieScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="AddItemList" component={AddItemList} />
        <Stack.Screen name="List" component={ListScreen} />
        <Stack.Screen name="DetailList" component={DetailList} />
    </Stack.Navigator>
  )
}

function Tv() {
  return(
    <Stack.Navigator initialRouteName="Tv" headerMode="none">
        <Stack.Screen name="Tv" component={TVScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="AddItemList" component={AddItemList} />
        <Stack.Screen name="List" component={ListScreen} />
        <Stack.Screen name="DetailList" component={DetailList} />
    </Stack.Navigator>
  )
}

function List() {
  return(
    <Stack.Navigator initialRouteName="List" headerMode="none">
        <Stack.Screen name="List" component={ListScreen} />
        <Stack.Screen name="CreateList" component={CreateList} />
        <Stack.Screen name="DetailList" component={DetailList} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="AddItemList" component={AddItemList} />
    </Stack.Navigator>
  )
}

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home" 
        drawerStyle={{backgroundColor: '#FF7314', opacity: 0.9}}
        drawerContentOptions={{activeBackgroundColor: '#393534', activeTintColor: '#FFFFFF', inactiveBackgroundColor: '#FF8319', inactiveTintColor: '#393534', labelStyle:{fontWeight: 'bold'}}}>
        <Drawer.Screen name="Home" component={Home}/>
        <Drawer.Screen name="Lists" component={List} />
        <Drawer.Screen name="Movie" component={Movie} />
        <Drawer.Screen name="Tv" component={Tv} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
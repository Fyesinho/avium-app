import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StatusBar} from "react-native";

import Login from "./src/components/views/Login/Login";
import Home from "./src/components/views/Home/Home";
import AddVisit from "./src/components/views/AddVisit/AddVisit";
import ShowVisit from "./src/components/views/ShowVisit/ShowVisit";
import SyncVisit from "./src/components/views/SyncVisit/SyncVisit";
import AllVisits from "./src/components/views/AllVisits/AllVisits";
import Menu from "./src/components/views/Menu/Menu";
import EditVisit from "./src/components/views/EditVisit/EditVisit";

import store from './src/state/store';

const Stack = createStackNavigator();

export default function App() {
    return (
        <Provider store={store}>
            <StatusBar hidden={true}/>
            <NavigationContainer>
                <Stack.Navigator initialRouteName={'Login'} screenOptions={{headerShown: false}}>
                    <Stack.Screen name="Login" component={Login}/>
                    <Stack.Screen name="Home" component={Home}/>
                    <Stack.Screen name="AddVisit" component={AddVisit}/>
                    <Stack.Screen name="EditVisit" component={EditVisit}/>
                    <Stack.Screen name="ShowVisit" component={ShowVisit}/>
                    <Stack.Screen name="SyncVisit" component={SyncVisit}/>
                    <Stack.Screen name="AllVisits" component={AllVisits}/>
                    <Stack.Screen name="Menu" component={Menu}/>
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}



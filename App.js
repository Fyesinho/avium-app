import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NativeRouter, Link, Route} from 'react-router-native';
import Login from "./src/components/views/Login/Login";



export default function App() {
    return (
        <NativeRouter>
            <Route path={'/'} component={Login}/>
        </NativeRouter>
    );
}



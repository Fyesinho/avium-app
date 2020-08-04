import React, {useEffect, useRef, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Camera} from 'expo-camera';
import {useNavigation, useRoute} from '@react-navigation/native';
import {AntDesign, FontAwesome, Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker";

export default function CameraComponent() {
    const route = useRoute();
    const camera = useRef(null);
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);

    useEffect(() => {
        (async () => {
            const {status} = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleCameraType = () => {
        setCameraType(cameraType === Camera.Constants.Type.back
            ? Camera.Constants.Type.front
            : Camera.Constants.Type.back)
    }

    const takePicture = async () => {
        if (camera) {
            let photo = await camera.current.takePictureAsync();
            route.params.onChangeImage(photo.uri);
            navigation.goBack();
        }
    }

    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("Es necesario otorgar permiso para la galería");
            return;
        }
        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        if (pickerResult.cancelled === true) {
            return;
        }
        route.params.onChangeImage(pickerResult.uri);
        navigation.goBack();
    }


    if (hasPermission === null) {
        return <View/>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    const navigation = useNavigation();

    return (
        <View style={{flex: 1}}>
            <Camera style={{flex: 1}} type={cameraType} ref={camera}>
                <View
                    style={{flexDirection: "row", alignItems: "flex-start", margin: 20, justifyContent: 'flex-start'}}>
                    <TouchableOpacity
                        style={{
                            alignSelf: 'flex-end',
                            alignItems: 'center',
                            backgroundColor: 'transparent',
                        }}
                        onPress={() => navigation.goBack()}
                    >
                        <AntDesign name="arrowleft" size={40} color="white"/>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1, flexDirection: "row", justifyContent: "space-between", margin: 40}}>
                    <TouchableOpacity
                        onPress={openImagePickerAsync}
                        style={{
                            alignSelf: 'flex-end',
                            alignItems: 'center',
                            backgroundColor: 'transparent',
                        }}>
                        <Ionicons
                            name="ios-photos"
                            style={{color: "#fff", fontSize: 40}}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={takePicture}
                        style={{
                            alignSelf: 'flex-end',
                            alignItems: 'center',
                            backgroundColor: 'transparent',
                        }}>
                        <FontAwesome
                            name="camera"
                            style={{color: "#fff", fontSize: 40}}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleCameraType()}
                        style={{
                            alignSelf: 'flex-end',
                            alignItems: 'center',
                            backgroundColor: 'transparent',
                        }}>
                        <MaterialCommunityIcons
                            name="camera-switch"
                            style={{color: "#fff", fontSize: 40}}
                        />
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    );
}
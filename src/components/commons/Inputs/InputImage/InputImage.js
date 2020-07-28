import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View, Dimensions} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {useFonts} from "@use-expo/font";
import {textRegular} from "../../../../utils/const/style";
import Loading from "../../../views/Loading/Loading";

const win = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        paddingTop: 15,
        paddingBottom: 15,
        // alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#f1f1f1',
        padding: 20,
        height: 100,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ACACAC',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 20,
        color: '#000',
    },
    labelView: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingBottom: 15
    },
    label: {
        fontFamily: 'Regular-text',
        fontSize: 12,
        textTransform: 'uppercase'
    },
    thumbnail: {
        width: win.width - 80,
        height: 100,
        resizeMode: 'cover',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ACACAC',
    },
});

const InputImage = ({label, value, onChangeImage}) => {
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
        onChangeImage(pickerResult.uri);
    }

    let [fontsLoaded] = useFonts(textRegular);
    if (!fontsLoaded) {
        return <Loading/>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.labelView}>
                <Text style={styles.label}>{label}</Text>
            </View>
            <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
                {
                    value !== '' ?
                        <View style={styles.container}>
                            <Image source={{uri: value}} style={styles.thumbnail}/>
                        </View> :
                        <Text style={styles.buttonText}>+</Text>
                }
            </TouchableOpacity>
        </View>
    );
}

export default InputImage;
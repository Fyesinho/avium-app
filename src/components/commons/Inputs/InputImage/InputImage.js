import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {useFonts} from "@use-expo/font";
import {textRegular} from "../../../../utils/const/style";

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
    }
});

const InputImage = ({label}) => {
    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        console.log(pickerResult);
    }

    let [fontsLoaded] = useFonts(textRegular);
    if (!fontsLoaded) {
        return <View>
            <Text>
                Cargando...
            </Text>
        </View>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.labelView}>
                <Text style={styles.label}>{label}</Text>
            </View>
            <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
                <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

export default InputImage;
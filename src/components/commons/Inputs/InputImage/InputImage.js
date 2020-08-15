import React from 'react';
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useFonts} from "@use-expo/font";
import {textRegular} from "../../../../utils/const/style";
import Loading from "../../../views/Loading/Loading";
import {useNavigation} from '@react-navigation/native';

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

const InputImage = ({label, value, onChangeImage, isError}) => {
    const navigation = useNavigation();

    let [fontsLoaded] = useFonts(textRegular);
    if (!fontsLoaded) {
        return <Loading/>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.labelView}>
                <Text style={styles.label}>{label}</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.push('Camera', {onChangeImage: onChangeImage})} style={{
                ...styles.button,
                borderColor: isError ? 'red' : '#ACACAC'
            }}>
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
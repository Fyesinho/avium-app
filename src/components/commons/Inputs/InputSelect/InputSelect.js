import React from 'react';
import {Picker, StyleSheet, Text, View} from "react-native";
import {useFonts} from '@use-expo/font';
import {textItalic, textRegular} from "../../../../utils/const/style";
import {capitalize} from "../../../../utils/const/functions";
import Loading from "../../../views/Loading/Loading";

const styles = StyleSheet.create({
    inputView: {
        flex: 0.2,
        justifyContent: 'flex-start',
        paddingBottom: 15,
    },
    viewPicker: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ACACAC',
        overflow: 'hidden',
        backgroundColor: '#F5F5F5'
    },
    picker: {
        height: 50,
        borderColor: 'black',
        // backgroundColor: '#F5F5F5',
        borderRadius: 10,
        paddingLeft: 20,
        fontSize: 12
    },
    pickerItem: {
        fontFamily: 'Italic-text'
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

const InputSelect = ({placeholder, label, onValueChange, items, value}) => {
    let [fontsLoaded] = useFonts(textRegular);
    let [fontsLoaded2] = useFonts(textItalic);
    if (!fontsLoaded || !fontsLoaded2) {
        return <Loading/>;
    }
    // items.push({label: `${capitalize(label)}...`, value: 0})
    return (
        <View style={styles.inputView}>
            <View style={styles.labelView}>
                <Text style={styles.label}>{label}</Text>
            </View>
            <View style={styles.viewPicker}>
                <Picker
                    selectedValue={value}
                    mode="dropdown"
                    placeholder={'test'}
                    style={styles.picker}
                    onValueChange={onValueChange}
                >
                    <Picker.Item key={-1} label={`${capitalize(label)}...`} value={0}/>
                    {
                        items && items.map((item, index) => {
                            return <Picker.Item key={index} label={item.label} value={item.value}/>
                        })
                    }
                </Picker>
            </View>
        </View>
    );
};

export default InputSelect;
import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import HeaderShort from "../../commons/Headers/HeaderShort/HeaderShort";
import Title from "../../commons/Title/Title";
import InputSelect from "../../commons/Inputs/InputSelect/InputSelect";
import Hr from "../../commons/Hr/Hr";
import InputTextArea from "../../commons/Inputs/InputTextArea/InputTextArea";
import InputImage from "../../commons/Inputs/InputImage/InputImage";
import ButtonAvium from "../../commons/Button/ButtonAvium";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import ButtonLabor from "../../commons/ButtonLabor/ButtonLabor";

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    body: {
        width: '100%',
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 15,
        paddingBottom: 15,
    },
    title: {},
    form: {
        paddingTop: 15
    }
});

const iconAdd = <MaterialCommunityIcons name="file-document-box-plus" size={20} color="white"/>;

const AddVisit = ({navigation}) => {
    const initialLabor = {
        labor: -1,
        comment: '',
        image: ''
    };
    const [producer, setProducer] = useState(-1);
    const [field, setField] = useState(-1);
    const [quarter, setQuarter] = useState(-1);
    const [labors, setLabors] = useState([initialLabor]);

    const optionsProducer = [
        {label: 'Productor 1', value: 1},
        {label: 'Productor 2', value: 2},
        {label: 'Productor 3', value: 3},
    ]

    const optionField = [
        {label: 'Campo 1', value: 1},
        {label: 'Campo 2', value: 2},
        {label: 'Campo 3', value: 3},
    ]

    const optionsQuarter = [
        {label: 'Cuartel 1', value: 1},
        {label: 'Cuartel 2', value: 2},
        {label: 'Cuartel 3', value: 3},
    ]

    const optionsLabor = [
        {label: 'Labor 1', value: 1},
        {label: 'Labor 2', value: 2},
        {label: 'Labor 3', value: 3},
    ]

    const isValidForm = () => {
        if (producer === -1) {
            return false;
        }
        if (field === -1) {
            return false;
        }
        let bool = true;
        labors.forEach(labor => {
            if (labor.image === '') {
                bool = false;
            }
            if (labor.comment === '') {
                bool = false;
            }
            if (labor.labor === -1) {
                bool = false;
            }
        })
        if (bool === false) {
            return false
        }
        return quarter !== -1;
    }

    const handlerOnPress = async () => {
        const id = Date.now();
        const structureResponse = {
            producer: optionsProducer.find(object => object.value === producer),
            field: optionField.find(object => object.value === field),
            quarter: optionsQuarter.find(object => object.value === quarter),
            labors,
            id,
            userId: 11,
            stateSync: 0
        }
        try {
            const jsonValue = JSON.stringify(structureResponse)
            await AsyncStorage.setItem(`@visit-${id}`, jsonValue)
            navigation.navigate('ShowVisit', {isSyncr: false, id})
        } catch (e) {
            alert('No se guardó la visita')
        }
    }

    const handlerLabor = (value, idx, field) => {
        setLabors(labors.map((labor, index) => {
            if(index === idx) {
                return {...labor, [field]: field === 'labor' ? optionsLabor.find(object => object.value === value) : value}
            }
            return {...labor};
        }));
    }

    return (
        <ScrollView style={styles.container}>
            <HeaderShort/>
            <View style={styles.body}>
                <Title flex={styles.title}>
                    REGISTRAR VISITA
                </Title>
                <View style={styles.form}>
                    <InputSelect
                        label={'Seleccionar productor'}
                        items={optionsProducer}
                        value={producer}
                        onValueChange={id => setProducer(id)}
                    />
                    <InputSelect
                        label={'Seleccionar Campo'}
                        items={optionField}
                        value={field}
                        onValueChange={id => setField(id)}
                    />
                    <InputSelect
                        label={'Seleccionar cuartel'}
                        items={optionsQuarter}
                        value={quarter}
                        onValueChange={id => setQuarter(id)}
                    />
                    {
                        labors.map((labor, index) => <View key={index}>
                            <Hr/>
                            <InputSelect
                                label={'Seleccionar labor'}
                                items={optionsLabor}
                                value={labor.labor.value}
                                onValueChange={id => handlerLabor(id, index, 'labor')}
                            />
                            <InputTextArea
                                label={'Comentario'}
                                value={labor.comment}
                                onChangeText={text => handlerLabor(text, index, 'comment')}
                            />
                            <InputImage
                                label={'Agregar imagen'}
                                value={labor.image}
                                onChangeImage={image => handlerLabor(image, index, 'image')}
                            />
                        </View>)
                    }
                    <ButtonLabor onPress={() => setLabors(labors.concat(initialLabor))}>
                        AGREGAR LABOR
                    </ButtonLabor>
                    <ButtonAvium onPress={() => handlerOnPress()}
                                 icon={iconAdd}
                                 type={!isValidForm() ? 'disabled' : ''}
                                 disabled={!isValidForm()}
                    >
                        Ingresar visita
                    </ButtonAvium>
                </View>
            </View>
        </ScrollView>
    );
}

export default AddVisit;
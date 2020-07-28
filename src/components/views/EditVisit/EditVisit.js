import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {ScrollView, StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useScrollToTop } from '@react-navigation/native';

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

const EditVisit = ({navigation, route, optionsProducer, optionsField, optionsLabor, optionsQuarter}) => {
    const ref = React.useRef(null);

    useScrollToTop(ref);

    const id = route.params && route.params.id;

    const initialLabor = {
        labor: -1,
        comment: '',
        image: ''
    };

    const [visit, setVisit] = useState({});
    const [producer, setProducer] = useState(-1);
    const [field, setField] = useState(-1);
    const [quarter, setQuarter] = useState(-1);
    const [labors, setLabors] = useState([]);

    useEffect(() => {
        (async function () {
            try {
                const value = await AsyncStorage.getItem(`@visit-${id}`)
                const visit = JSON.parse(value);
                setVisit(visit)
                setProducer(visit.producer.value)
                setField(visit.field.value)
                setQuarter(visit.quarter.value)
                setLabors(visit.labors);
            } catch (e) {
                console.error(e);
            }
        })();
    }, [])

    if (visit === {}) {
        return
    }

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
        const structureResponse = {
            producer: optionsProducer.find(object => object.value === producer),
            field: optionsField.find(object => object.value === field),
            quarter: optionsQuarter.find(object => object.value === quarter),
            labors,
            id,
        }
        try {
            await AsyncStorage.removeItem(`@visit-${id}`);
        }
        catch(e) {
            alert('La visita no existe')
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
        <ScrollView ref={ref} style={styles.container}>
            <HeaderShort/>
            <View style={styles.body}>
                <Title flex={styles.title}>
                    EDITAR VISITA
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
                        items={optionsField}
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
                        Guardar visita
                    </ButtonAvium>
                </View>
            </View>
        </ScrollView>
    );
}

const mapStateToProps = state => ({
    optionsProducer: state.producers.producersData,
    optionsField: state.field.fieldData,
    optionsLabor: state.labor.laborData,
    optionsQuarter: state.quarter.quarterData,
});

export default  connect(mapStateToProps)(EditVisit);
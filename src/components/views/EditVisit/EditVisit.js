import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useScrollToTop} from '@react-navigation/native';

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

const EditVisit = ({navigation, route}) => {
    const [optionsProducer, setOptionsProducer] = useState([]);
    const [optionsField, setOptionsField] = useState([]);
    const [optionsLabor, setOptionsLabor] = useState([]);
    const [optionsQuarter, setOptionsQuarter] = useState([]);

    const ref = React.useRef(null);

    useScrollToTop(ref);

    const id = route.params && route.params.id;

    const initialLabor = {
        labor: -1,
        comment: '',
        image: ''
    };

    const [trys , setTry] = useState(1);

    const [visit, setVisit] = useState({});
    const [producer, setProducer] = useState(-1);
    const [field, setField] = useState(-1);
    const [quarter, setQuarter] = useState(-1);
    const [labors, setLabors] = useState([]);

    const [producerError, setProducerError] = useState(false);
    const [fieldError, setFieldError] = useState(false);

    useEffect(() => {
        (async function () {
            try {
                const value = await AsyncStorage.getItem(`@visit-${id}`)
                const visit = JSON.parse(value);
                setVisit(visit)
                await handlerProducer(visit.producer.value)
                await handlerFields(visit.field.value)
                setLabors(visit.labors);

                const producers = await AsyncStorage.getItem(`@producers`);
                setOptionsProducer(JSON.parse(producers))
                const laborsOptions = await AsyncStorage.getItem(`@labors`);
                setOptionsLabor(JSON.parse(laborsOptions))
            } catch (e) {
                console.error(e);
            }
        })();
    }, [])

    if (visit === {}) {
        return
    }

    const isValidForm = () => {
        let boolFinal = true;
        if (producer === -1 || producer === 0 || producer === undefined) {
            setProducerError(true)
            boolFinal =  false;
        }
        if (field === -1 || field === 0 || field === undefined) {
            setFieldError(true)
            boolFinal = false;
        }
        let bool = true;
        for (const labor of labors) {
            if (labor.image === '') {
                labor.errorImage = true;
                bool = false;
            }
            if (labor.comment === '') {
                labor.errorComment = true;
                bool = false;
            }
            if (labor.labor === -1 || labor.labor === undefined) {
                labor.errorLabor = true;
                bool = false;
            }
            if (labor.quarter === -1 || labor.quarter === undefined) {
                labor.errorQuarter = true;
                bool = false;
            }
        }
        if (bool === false) {
            boolFinal = false
        }
        return boolFinal
    }

    const handlerOnPress = async () => {
        if(isValidForm()) {
            const structureResponse = {
                producer: optionsProducer.find(object => object.value === producer),
                field: optionsField.find(object => object.value === field),
                labors,
                id,
            }
            try {
                await AsyncStorage.removeItem(`@visit-${id}`);
            } catch (e) {
                alert('La visita no existe')
            }
            try {
                const jsonValue = JSON.stringify(structureResponse)
                await AsyncStorage.setItem(`@visit-${id}`, jsonValue)
                navigation.push('ShowVisit', {isSyncr: false, id, noBack: true})
            } catch (e) {
                alert('No se guardó la visita')
            }
        } else {
            setTry(trys + 1);
            Alert.alert('Error al guardar','Faltan datos para completar la visita. Se encuentran resaltados en el formulario')
        }
    }

    const handlerProducer = async id => {
        setProducerError(false)
        setProducer(id);
        setField(-1);
        setQuarter(-1);
        const fields = await AsyncStorage.getItem(`@fields`);
        const parsedFields = JSON.parse(fields);
        setOptionsField(parsedFields.filter(field => field.parentId === id))
    }

    const handlerFields = async id => {
        setFieldError(false)
        setField(id);
        setQuarter(-1);
        const quarters = await AsyncStorage.getItem(`@quarters`);
        const parsedQuarters = JSON.parse(quarters);
        setOptionsQuarter(parsedQuarters.filter(field => field.parentId === id))
    }

    const handlerLabor = (value, idx, field) => {
        setLabors(labors.map((labor, index) => {
            if(field === 'labor') {
                labor.errorLabor = false
            }
            if(field === 'image') {
                labor.errorImage = false
            }
            if(field === 'comment') {
                labor.errorComment = false
            }
            if(field === 'quarter') {
                labor.errorQuarter = false
            }
            if (index === idx) {
                let response;
                if (field === 'labor') {
                    response = optionsLabor.find(object => object.value === value);
                } else if (field === 'quarter') {
                    response = optionsQuarter.find(object => object.value === value);
                } else {
                    response = value;
                }
                return {
                    ...labor,
                    [field]: response
                }
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
                        isError={producerError}
                        label={'Seleccionar productor'}
                        items={optionsProducer}
                        value={producer}
                        onValueChange={id => handlerProducer(id)}
                    />
                    <InputSelect
                        isError={fieldError}
                        label={'Seleccionar Campo'}
                        items={optionsField}
                        value={field}
                        onValueChange={id => handlerFields(id)}
                    />
                    {
                        labors.map((labor, index) => <View
                            key={index}
                            style={{
                                backgroundColor: index % 2 === 0 ? '#f3f3f3' : 'white',
                                marginLeft: -40,
                                marginRight: -40
                            }}>
                            <Hr/>
                            <View style={{paddingLeft: 40, paddingRight: 40}}>
                                {labors.length > 1 &&
                                <ButtonLabor
                                    onPress={() => setLabors(labors.filter((laborI, indexI) => index !== indexI))}>
                                    ELIMINAR LABOR
                                </ButtonLabor>}
                                <InputSelect
                                    isError={labor.errorLabor}
                                    label={'Seleccionar labor'}
                                    items={optionsLabor}
                                    value={labor.labor && labor.labor.value}
                                    onValueChange={id => handlerLabor(id, index, 'labor')}
                                />
                                <InputSelect
                                    isError={labor.errorQuarter}
                                    label={'Seleccionar cuartel'}
                                    items={optionsQuarter}
                                    value={labor.quarter && labor.quarter.value}
                                    onValueChange={id => handlerLabor(id, index, 'quarter')}
                                />
                                <InputTextArea
                                    isError={labor.errorComment}
                                    label={'Comentario'}
                                    value={labor.comment}
                                    onChangeText={text => handlerLabor(text, index, 'comment')}
                                />
                                <InputImage
                                    isError={labor.errorImage}
                                    label={'Agregar imagen'}
                                    value={labor.image}
                                    onChangeImage={image => handlerLabor(image, index, 'image')}
                                />
                            </View>
                        </View>)
                    }
                    <ButtonLabor onPress={() => setLabors(labors.concat(initialLabor))}>
                        AGREGAR LABOR
                    </ButtonLabor>
                    <ButtonAvium onPress={() => handlerOnPress()}
                                 icon={iconAdd}
                                 type={'primary'}
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

export default connect(mapStateToProps)(EditVisit);
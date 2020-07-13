import React, {Component} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

import HeaderShort from "../../commons/Headers/HeaderShort/HeaderShort";
import Title from "../../commons/Title/Title";
import InputDisabled from "../../commons/Inputs/InputDisabled/InputDisabled";
import InputImageDisabled from "../../commons/Inputs/InputImageDisabled/InputImageDisabled";
import ButtonAvium from "../../commons/Button/ButtonAvium";
import {primaryColor, secondaryColor} from "../../../utils/const/style";


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

const bd = {
    producer: 'Yo',
    field: 'Campo 2',
    quarter: 'Cuartel 2',
    labors: [
        {
            name: 'Labor 1',
            comment: 'Algun comentario que tenga las suficientes líneas para poder probar que esto se puede comportar como un textarea o simplemente cortara el texto en algún momento no indicado',
            image: 'https://reactnative.dev/img/tiny_logo.png'
        },
        {name: 'Labor 2', comment: 'Algun comentario', image: 'https://reactnative.dev/img/tiny_logo.png'},
        {name: 'Labor 3', comment: 'Algun comentario', image: 'https://reactnative.dev/img/tiny_logo.png'}
    ]
};

const iconSync = <AntDesign name="sync" size={15} color={secondaryColor} />;
const iconEdit = <MaterialIcons name="edit" size={18} color={primaryColor} />;

class ShowVisit extends Component {
    render() {
        // console.log(this.props.route.params.isSyncr)
        return (
            <ScrollView style={styles.container}>
                <HeaderShort/>
                <View style={styles.body}>
                    <Title flex={styles.title}>
                        DETALLE VISITA
                    </Title>
                    <View style={styles.form}>
                        <InputDisabled label={'Productor'} value={bd.producer}/>
                        <InputDisabled label={'Campo'} value={bd.field}/>
                        <InputDisabled label={'Cuartel'} value={bd.quarter}/>
                        {
                            bd.labors && bd.labors.map((labor, index) => {
                                return <>
                                    <InputDisabled label={'Labor'} value={labor.name}/>
                                    <InputDisabled label={'Comentarios'} value={labor.comment}/>
                                    <InputImageDisabled label={'Imagen labor'} uri={labor.image}/>
                                </>
                            })
                        }
                        {!this.props.route.params.isSyncr && <View style={{paddingBottom: 20}}>
                            <ButtonAvium type={'secondary'} onPress={() => this.props.navigation.goBack()} icon={iconEdit}>
                                editar visita
                            </ButtonAvium>
                        </View> }
                        {!this.props.route.params.isSyncr && <ButtonAvium onPress={() => this.props.navigation.navigate('SyncVisit')} icon={iconSync}>
                            sincronizar visita
                        </ButtonAvium> }
                    </View>
                </View>
            </ScrollView>
        );
    }
}

export default ShowVisit;
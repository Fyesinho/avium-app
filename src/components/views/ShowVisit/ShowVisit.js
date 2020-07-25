import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView, StyleSheet, View} from 'react-native';
import {AntDesign, MaterialIcons} from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

import HeaderShort from "../../commons/Headers/HeaderShort/HeaderShort";
import Title from "../../commons/Title/Title";
import InputDisabled from "../../commons/Inputs/InputDisabled/InputDisabled";
import InputImageDisabled from "../../commons/Inputs/InputImageDisabled/InputImageDisabled";
import ButtonAvium from "../../commons/Button/ButtonAvium";
import {primaryColor, secondaryColor} from "../../../utils/const/style";
import {postVisit} from "../../../state/visit/actions";

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

const iconSync = <AntDesign name="sync" size={15} color={secondaryColor}/>;
const iconEdit = <MaterialIcons name="edit" size={18} color={primaryColor}/>;

class ShowVisit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visit: {}
        };
    }

    async componentDidMount() {
        const id = this.props.route.params && this.props.route.params.id;
        try {
            const value = await AsyncStorage.getItem(`@visit-${id}`)
            this.setState({
                visit: JSON.parse(value)
            })
        } catch (e) {
            // error reading value
        }
    }

    handlerOnSync = async () => {
        const id = this.props.route.params && this.props.route.params.id;
        try {
            await this.props.postVisit(this.state.visit, id)
            this.props.navigation.navigate('SyncVisit')
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        const {visit} = this.state;
        return (
            <ScrollView style={styles.container}>
                <HeaderShort/>
                <View style={styles.body}>
                    <Title flex={styles.title}>
                        DETALLE VISITA
                    </Title>
                    <View style={styles.form}>
                        <InputDisabled label={'Productor'} value={visit.producer && visit.producer.label}/>
                        <InputDisabled label={'Campo'} value={visit.field && visit.field.label}/>
                        <InputDisabled label={'Cuartel'} value={visit.quarter && visit.quarter.label}/>
                        {
                            visit.labors && visit.labors.map((labor, index) => {
                                return <View key={index}>
                                    <InputDisabled label={'Labor'} value={labor.labor && labor.labor.label}/>
                                    <InputDisabled label={'Comentarios'} value={labor.comment}/>
                                    <InputImageDisabled label={'Imagen labor'} uri={labor.image}/>
                                </View>
                            })
                        }
                        {!this.props.route.params.isSyncr && <View style={{paddingBottom: 20}}>
                            <ButtonAvium type={'secondary'}
                                         onPress={() => this.props.navigation.navigate('EditVisit', {id: visit.id})}
                                         icon={iconEdit}>
                                editar visita
                            </ButtonAvium>
                        </View>}
                        {!this.props.route.params.isSyncr &&
                        <ButtonAvium onPress={this.handlerOnSync} icon={iconSync}>
                            sincronizar visita
                        </ButtonAvium>}
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    postVisit: payload => dispatch(postVisit(payload))
});

export default connect(null, mapDispatchToProps)(ShowVisit);
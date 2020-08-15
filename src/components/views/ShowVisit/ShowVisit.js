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
import {getVisit, postVisit} from "../../../state/visit/actions";
import {reducerCurrentVisit} from "../../../state/visit/reducerFunction";

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    body: {
        width: '100%',
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 15,
    },
    title: {},
    form: {
        paddingTop: 15
    }
});

const iconSync = <AntDesign name="sync" size={15} color={secondaryColor}/>;
const iconEdit = <MaterialIcons name="edit" size={18} color={primaryColor}/>;

class ShowVisit extends Component {
    state = {
        visit: {}
    }

    async componentDidMount() {
        const id = this.props.route.params && this.props.route.params.id;
        const isSyncr = this.props.route.params && this.props.route.params.isSyncr;
        try {
            if (isSyncr) {
                const idRemote = this.props.route.params && this.props.route.params.idRemote;
                const response = await this.props.getVisit(idRemote);
                this.setState({
                    visit: reducerCurrentVisit(response)
                })
            } else {
                const value = await AsyncStorage.getItem(`@visit-${id}`)
                this.setState({
                    visit: JSON.parse(value)
                })
            }
        } catch (e) {
            // error reading value
        }
    }

    handlerOnSync = async () => {
        const id = this.props.route.params && this.props.route.params.id;
        try {
            const response = await this.props.postVisit(this.state.visit, id);
            this.props.navigation.push('SyncVisit', {visit: this.state.visit, idRemote: response})
            await AsyncStorage.removeItem(`@visit-${id}`);
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        const {visit} = this.state;
        if (visit) {
            return (
                <>
                    <ScrollView
                        style={{...styles.container}}>
                        <HeaderShort noBack={this.props.route.params.noBack}/>
                        <View style={{...styles.body, paddingBottom: this.props.route.params.isSyncr ? 10 : 150}}>
                            <Title flex={styles.title}>
                                DETALLE VISITA
                            </Title>
                            <View style={styles.form}>
                                <InputDisabled label={'Productor'} value={visit.producer && visit.producer.label}/>
                                <InputDisabled label={'Campo'} value={visit.field && visit.field.label}/>
                                {/*<InputDisabled label={'Cuartel'} value={visit.quarter && visit.quarter.label}/>*/}
                                {
                                    visit.labors && visit.labors.map((labor, index) => {
                                        return <View key={index}>
                                            <InputDisabled label={'Labor'} value={labor.labor && labor.labor.label}/>
                                            <InputDisabled label={'Cuartel'} value={labor.quarter && labor.quarter.label}/>
                                            <InputDisabled label={'Comentarios'} value={labor.comment}/>
                                            <InputImageDisabled label={'Imagen labor'} uri={labor.image}/>
                                        </View>
                                    })
                                }
                            </View>
                        </View>
                    </ScrollView>
                    {!this.props.route.params.isSyncr &&
                    <View style={{
                        alignSelf: 'center',
                        position: 'absolute',
                        justifyContent: 'center',
                        flex: 1,
                        backgroundColor: '#fafafa',
                        width: '100%',
                        paddingLeft: 40,
                        paddingRight: 40,
                        paddingTop: 20,
                        paddingBottom: 20,
                        bottom: 0,
                        borderTopWidth: 1,
                        borderTopColor: 'lightgray'
                    }}>
                        {!this.props.route.params.isSyncr && <View style={{paddingBottom: 20}}>
                            <ButtonAvium type={'secondary'}
                                         onPress={() => this.props.navigation.push('EditVisit', {id: visit.id})}
                                         icon={iconEdit}>
                                editar visita
                            </ButtonAvium>
                        </View>}
                        {!this.props.route.params.isSyncr &&
                        <ButtonAvium onPress={this.handlerOnSync} icon={iconSync}>
                            sincronizar visita
                        </ButtonAvium>}
                    </View>
                    }
                </>
            );
        }
        return null
    }
}

const mapDispatchToProps = dispatch => ({
    postVisit: payload => dispatch(postVisit(payload)),
    getVisit: payload => dispatch(getVisit(payload))
});

export default connect(null, mapDispatchToProps)(ShowVisit);
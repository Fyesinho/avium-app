import React, {Component} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
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

const Labor = ({optionsProducer}) => {
    return <>
        <Hr/>
        <InputSelect
            label={'Seleccionar labor'}
            items={optionsProducer}
        />
        <InputTextArea
            label={'Comentario'}
        />
        <InputImage
            label={'Agregar imagen'}
        />
    </>
}

class AddVisit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            laborCount: 1
        }
    }

    handlerCount = () => {
        this.setState({
            laborCount: this.state.laborCount + 1
        })
    }

    render() {
        const optionsProducer = [
            {label: 'Java', value: 'java'},
            {label: 'PHP', value: 'php'},
            {label: 'JavaScript', value: 'js'},
        ]

        const {laborCount} = this.state;

        const labors = [];

        for (let i = 1; i <= laborCount; i++) {
            labors.push(<Labor key={i} optionsProducer={optionsProducer}/>)
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
                        />
                        <InputSelect
                            label={'Seleccionar Campo'}
                            items={optionsProducer}
                        />
                        <InputSelect
                            label={'Seleccionar cuartel'}
                            items={optionsProducer}
                        />
                        {labors}
                        <ButtonLabor onPress={this.handlerCount}>
                            AGREGAR LABOR
                        </ButtonLabor>
                        <ButtonAvium onPress={() => this.props.navigation.navigate('ShowVisit', {isSyncr: false})} icon={iconAdd}>
                            Ingresar visita
                        </ButtonAvium>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

export default AddVisit;
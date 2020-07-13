import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import HeaderLarge from "../../commons/Headers/HeaderLarge/HeaderLarge";
import ButtonAvium from "../../commons/Button/ButtonAvium";
import {useFonts} from "@use-expo/font";
import {textBold, textRegular} from "../../../utils/const/style";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    bodyHome: {
        flex: 0.75,
        width: '100%',
        alignItems: 'center',
        paddingLeft: 40,
        paddingRight: 40,
        borderWidth: 1
    },
    tinyLogo: {
        marginTop: -30,
        width: 100,
        height: 100,
        borderWidth: 5,
        borderRadius: 5,
        borderColor: 'lightgray',
    },
    viewButtons: {
        flex: 0.3,
        width: '100%',
        justifyContent: 'space-between'
    },
    space: {
        flex: 0.5,
        alignItems: 'center'
    },
    textName: {
        fontFamily: 'Bold-text',
        fontSize: 16,
        color: '#444444'
    },
    textJob: {
        fontFamily: 'Regular-text',
        fontSize: 16,
        color: '#A9A9A9'
    }
});

const Home = ({navigation}) => {
    let [fontsLoaded] = useFonts(textBold);
    if (!fontsLoaded) {
        return <View>
            <Text>
                Cargando...
            </Text>
        </View>;
    }

    const iconAdd = <MaterialCommunityIcons name="file-document-box-plus" size={20} color="white" />;
    const iconSearch = <MaterialCommunityIcons name="file-document-box-search" size={20} color="white" />;

    return (
        <View style={styles.container}>
            <HeaderLarge/>
            <View style={styles.bodyHome}>
                <View style={styles.space}>
                    <Image
                        style={styles.tinyLogo}
                        source={{
                            uri: 'https://reactnative.dev/img/tiny_logo.png',
                        }}
                    />
                    <Text style={styles.textName}>
                        Rodrigo Gonzalez
                    </Text>
                    <Text style={styles.textJob}>
                        Supervisor
                    </Text>
                </View>
                <View style={styles.viewButtons}>
                    <ButtonAvium icon={iconAdd} onPress={() => navigation.navigate('AddVisit')}>
                        Registrar visita
                    </ButtonAvium>
                    <ButtonAvium icon={iconSearch} onPress={() => navigation.navigate('AllVisits')}>
                        Ver mis visitas
                    </ButtonAvium>
                </View>

            </View>
        </View>
    );
}

export default Home;
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import AsyncStorage from "@react-native-community/async-storage";
import {ScrollView, StyleSheet, View} from "react-native";
import HeaderShort from "../../commons/Headers/HeaderShort/HeaderShort";
import Title from "../../commons/Title/Title";
import Filter from "../../commons/Filter/Filter";
import {getVisits} from "../../../state/visit/actions";

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

const AllVisits = ({visits, getVisits}) => {
    let [noSyncList, setNoSyncList] = useState([]);
    useEffect(() => {
        (async function () {
            // AsyncStorage.clear()
            try {
                //Call Async Visits
                const keys = await AsyncStorage.getAllKeys();
                const filterKeys = keys.filter(key => key.includes('visit'));
                const result = await AsyncStorage.multiGet(filterKeys);
                const response = result.map((result, i, store) => ({...JSON.parse(store[i][1])}))
                setNoSyncList(response)

                //Call Sync Visits
                await getVisits();
            } catch (e) {
                console.error(e);
            }
        })();
    }, [])
    console.log('visist', visits)
    return (
        <ScrollView style={styles.container}>
            <HeaderShort/>
            <View style={styles.body}>
                <Title flex={styles.title}>
                    TODAS MIS VISITAS
                </Title>
                <Filter noSyncList={noSyncList} syncList={visits}/>
            </View>
        </ScrollView>
    );
};

const mapStateToProps = state => ({
    visits: state.visit.visitGetData
});

const mapDispatchToProps = dispatch => ({
    getVisits: () => dispatch(getVisits())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllVisits);
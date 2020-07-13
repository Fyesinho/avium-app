import React from 'react';
import {ScrollView, StyleSheet, View} from "react-native";
import HeaderShort from "../../commons/Headers/HeaderShort/HeaderShort";
import Title from "../../commons/Title/Title";
import Filter from "../../commons/Filter/Filter";

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

const AllVisits = () => {
    return (
        <ScrollView style={styles.container}>
            <HeaderShort/>
            <View style={styles.body}>
                <Title flex={styles.title}>
                    TODAS MIS VISITAS
                </Title>
                <Filter/>
            </View>
        </ScrollView>
    );
};

export default AllVisits;
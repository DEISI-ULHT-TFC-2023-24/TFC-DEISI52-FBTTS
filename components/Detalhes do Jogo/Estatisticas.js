import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import oviedoData from '../../JSON/oviedo.json';

const Estatisticas = ({}) => {
    const homeStats = oviedoData.homeStats;
    const awayStats = oviedoData.awayStats;

    const renderStatBar = (label, value1, value2) => {
        const total = parseFloat(value1.value) + parseFloat(value2.value);
        const percent1 = total === 0 ? 0 : (parseFloat(value1.value) / total) * 100;
        const percent2 = total === 0 ? 0 : (parseFloat(value2.value) / total) * 100;

        return (
            <View style={styles.statContainer} key={label}>
                <Text style={styles.statLabel}>{label}</Text>
                <View style={[styles.barContainer, { backgroundColor: 'lightgray' }]}>
                    <View style={[styles.bar, { width: `${percent1}%`, backgroundColor: '#2196f3' }]}>
                        <Text style={styles.barText}>{value1.value}</Text>
                    </View>
                    <View style={[styles.bar, { width: `${percent2}%`, backgroundColor: '#ff6258' }]}>
                        <Text style={styles.barText}>{value2.value}</Text>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>Estatísticas</Text>

                {Object.entries(homeStats).map(([key, value]) => {
                    return renderStatBar(value.type, value, awayStats[key]);
                })}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        padding: 16,
        backgroundColor: '#ffffff',
        borderRadius: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    statContainer: {
        marginBottom: 16,
    },
    statLabel: {
        marginBottom: 8,
    },
    barContainer: {
        borderRadius: 2,
        flexDirection: 'row',
        height: 20,
        marginBottom: 4,
    },
    bar: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    barText: {
        color: 'white',
        paddingHorizontal: 4,
    },
});

export default Estatisticas;

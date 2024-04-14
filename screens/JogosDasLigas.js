import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Image, Modal } from "react-native";
import DatePicker from "@react-native-community/datetimepicker";
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Importando os dados do JSON
import jsonData from "../JSON/matches.json";

const Jogos = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [data, setData] = useState([]);
    const navigation = useNavigation();

    // Carregar dados do JSON quando o componente montar
    useEffect(() => {
        setData(jsonData.filter(item => isSameDay(new Date(item.date), selectedDate)));
    }, [selectedDate]);

    const showSelectedDate = () => {
        setShowDatePicker(true);
    };

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        setSelectedDate(selectedDate || new Date());
    };

    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const renderItem = ({ item }) => {
        let flagSource;
        switch (item.country) {
            case 'England':
                flagSource = require('../assets/gb.png');
                break;
            case 'Brazil':
                flagSource = require('../assets/br.png');
                break;
            case 'Portugal':
                flagSource = require('../assets/pt.png');
                break;
            case 'Spain':
                flagSource = require('../assets/es.png');
                break;
            case 'Germany':
                flagSource = require('../assets/de.png');
                break;
            case 'France':
                flagSource = require('../assets/fr.png');
                break;
            case 'Italy':
                flagSource = require('../assets/it.png');
                break;
            default:
                break;
        }

        return (
            <TouchableOpacity
                style={styles.card}
                onPress={() => {
                    navigation.navigate('JogoDetalhe', { gameId: item.id });
                }}
            >
                <View style={styles.listItem}>
                    <View style={styles.column}>
                        <Image style={styles.flag} source={flagSource} />
                        <Text>{item.country}</Text>
                    </View>
                    <View style={[styles.column, { justifyContent: 'center' }]}>
                        <Text>{item.match}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const incrementarData = () => {
        const nextDate = new Date(selectedDate);
        nextDate.setDate(selectedDate.getDate() + 1);
        setSelectedDate(nextDate);
    };

    const decrementarData = () => {
        const prevDate = new Date(selectedDate);
        prevDate.setDate(selectedDate.getDate() - 1);
        setSelectedDate(prevDate);
    };

    const isSameDay = (date1, date2) => {
        return (
            date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear()
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.container2}>
                <View style={styles.header}>
                    <Text style={[styles.headerText, { flex: 1, textAlign: 'center' }]}>País</Text>
                    <Text style={[styles.headerText, { flex: 1, textAlign: 'center' }]}>Jogo</Text>
                </View>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                />
                <View style={styles.header}>
                    <TouchableOpacity style={styles.datePickerButton} onPress={decrementarData}>
                        <FontAwesome5 name="chevron-left" size={16} color="#2196F3" />
                    </TouchableOpacity>
                    <View style={styles.dateContainer}>
                        <TouchableOpacity onPress={showSelectedDate} style={styles.datePickerButtonTextContainer}>
                            <Text style={styles.datePickerButtonText}>{formatDate(selectedDate)}</Text>
                        </TouchableOpacity>
                        {showDatePicker && (
                            <DatePicker
                                value={selectedDate}
                                mode="date"
                                display="calendar"
                                onChange={handleDateChange}
                            />
                        )}
                    </View>
                    <TouchableOpacity style={styles.datePickerButton} onPress={incrementarData}>
                        <FontAwesome5 name="chevron-right" size={16} color="#2196F3" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#ffffff",
    },
    container2: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
        paddingHorizontal: 2,
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    card: {
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        padding: 12,
        marginBottom: 8,
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    column: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    flag: {
        width: 30,
        height: 20,
        marginRight: 8,
    },
    datePickerButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    datePickerButton: {
        backgroundColor: "#DDE4EB",
        opacity: 0.75,
        borderRadius: 4,
        padding: 10,
        marginHorizontal: 8,
    },
    datePickerButtonTextContainer: {
        backgroundColor: "#DDE4EB",
        borderRadius: 4,
        paddingHorizontal: 8,
    },
    datePickerButtonText: {
        color: "#000000",
        paddingVertical: 8,
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default Jogos;

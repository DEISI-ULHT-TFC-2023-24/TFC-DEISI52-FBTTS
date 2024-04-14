import React from 'react';
import { View, Text } from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
import oviedoData from '../../JSON/match.json';

export default class TimelineJogo extends React.Component {
    constructor(props) {
        super(props);
        this.renderDetail = this.renderDetail.bind(this);
    }

    renderDetail(rowData, sectionID, rowID) {
        let title = <Text style={[styles.title, { color: rowData.color }]}>{rowData.title}</Text>;
        let desc = null;
        if (rowData.description) {
            desc = (
                <View style={styles.descriptionContainer}>
                    <Text style={styles.textDescription}>{rowData.description}</Text>
                </View>
            );
        }

        return (
            <View style={styles.detailContainer}>
                <View style={rowData.position === 'left' ? styles.detailLeft : styles.detailRight}>
                    {title}
                    {desc}
                </View>
            </View>
        );
    }

    render() {
        const { homeEvents, awayEvents, home, away } = oviedoData;

        // Combine os eventos em uma única matriz
        const allEvents = [...homeEvents, ...awayEvents];

        // Ordene os eventos com base no tempo
        allEvents.sort((a, b) => a.time - b.time);

        // Mapeie os eventos ordenados para o formato esperado pelo componente Timeline
        const timelineData = allEvents.map(event => ({
            time: `${event.time}'`,
            title: this.getEventTitle(event),
            description: this.getEventDescription(event, home, away),
            icon: this.getEventIcon(event),
            position: homeEvents.includes(event) ? 'left' : 'right', // Define a posição com base na equipe
            color: homeEvents.includes(event) ? '#2196f3' : '#ff6258', // Define a cor com base na equipe
        }));

        return (
            <View style={styles.container}>
                <Timeline
                    style={styles.timeline}
                    data={timelineData}
                    circleSize={20}
                    circleColor='rgba(0,0,0,0)'
                    lineColor='rgb(45,156,219)'
                    timeContainerStyle={{ minWidth: 52, marginTop: -5 }}
                    timeStyle={{ textAlign: 'center', backgroundColor: '#2196f3', color: 'white', padding: 5, borderRadius: 13 }}
                    descriptionStyle={{ color: 'gray', marginLeft: 10, marginTop: -10 }}
                    options={{ style: { paddingTop: 5 } }}
                    innerCircle={'icon'}
                    renderDetail={this.renderDetail}
                />
            </View>
        );
    }

    getEventTitle(event) {
        switch (event.image) {
            case 'goal':
                return 'Golo';
            case 'yellow':
                return 'Cartão Amarelo';
            case 'red':
                return 'Cartão Vermelho';
            default:
                return 'Evento';
        }
    }

    getEventDescription(event, home, away) {
        let teamName = home.name; // Começa com o nome da equipe da casa por padrão

        // Verifica se o evento está na lista de eventos da equipe visitante
        if (oviedoData.awayEvents && oviedoData.awayEvents.find(e => e.time === event.time)) {
            teamName = away.name; // Se sim, atualiza o nome da equipe para a equipe visitante
        }

        // Constrói a descrição usando o nome da equipe
        switch (event.image) {
            case 'goal':
                return `${teamName}: Golo marcado`;
            case 'yellow':
                return `${teamName}: Cartão amarelo dado`;
            case 'red':
                return `${teamName}: Cartão vermelho dado`;
            default:
                return `${teamName}: Descrição do evento`;
        }
    }


    getEventIcon(event) {
        switch (event.image) {
            case 'goal':
                return require('../../assets/golo.png');
            case 'yellow':
                return require('../../assets/cartao-amarelo.png');
            case 'red':
                return require('../../assets/cartao-vermelho.png');
            default:
                return null;
        }
    }
}

const styles = {
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#ffffff',
    },
    timeline: {
        flex: 1,
    },
    detailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailLeft: {
        flex: 1,
        marginRight: 10,
    },
    detailRight: {
        flex: 1,
        marginLeft: 10,
    },
    icon: {
        width: 20,
        height: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
    },
    descriptionContainer: {
        marginBottom: 5,
    },
    textDescription: {
        fontSize: 14,
    },
};

import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import GameInfo from '../components/Detalhes do Jogo/InfoJogo';
import TimelineJogo from "../components/Detalhes do Jogo/timelineJogo";
import Estatisticas from "../components/Detalhes do Jogo/Estatisticas";
import ConfrontosDiretos from "../components/Detalhes do Jogo/H2h";
import EstatisticasGolosListaJogos from "../components/Detalhes do Jogo/EstatisticasGolosListaJogos";

const JogoDetalhe = ({ route }) => {
    const { gameData } = route.params;

    return (
        <FlatList
            data={[{ key: 'gameInfo' }, { key: 'timelineJogo' }, { key: 'estatisticas' }, { key: 'listaJogos' }, { key: 'confrontosDiretos' }, { key: 'estatisticasGolos' }]}
            renderItem={({ item }) => {
                switch (item.key) {
                    case 'gameInfo':
                        return <GameInfo gameData={gameData} />;
                    case 'timelineJogo':
                        return <TimelineJogo gameData={gameData} />;
                    case 'estatisticas':
                        return <Estatisticas gameData={gameData} />;
                    case 'listaJogos':
                        return <EstatisticasGolosListaJogos gameData={gameData} />;
                    case 'confrontosDiretos':
                        return <ConfrontosDiretos gameData={gameData} />;
                    default:
                        return null;
                }
            }}
            keyExtractor={(item) => item.key}
            style={styles.container}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
});

export default JogoDetalhe;

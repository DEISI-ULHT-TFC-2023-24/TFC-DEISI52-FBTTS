import React, { useState } from 'react';
import { View, Text, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import CustomTextBox from "../components/Geral/customTextBox";
import BotaoSubmeter from "../components/Geral/botaoSubmeter";
import VoltarButton from "../components/Geral/botaoVoltar";

const Suporte = () => {
    const [assunto, setAssunto] = useState('');
    const [comentarios, setComentarios] = useState('');

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <Text style={styles.header}>Contacto</Text>
                <Text style={styles.paragraph}>
                    Estamos aqui para ajudar. Por favor indica o assunto de contacto e os teus comentários.
                </Text>
                <Text style={styles.header2}>Assunto</Text>
                <CustomTextBox
                    placeholder={"Escreve aqui o assunto do problema encontrado."}
                    value={assunto}
                    onChangeText={setAssunto}
                    height={50}
                />
                <Text style={styles.header2}>Comentários</Text>
                <CustomTextBox
                    placeholder={"Escreve aqui os comentários acerca do problema observado."}
                    value={comentarios}
                    onChangeText={setComentarios}
                    height={150}
                />
                <View style={styles.buttonContainer}>
                    <View style={styles.botaoSubmeter}>
                        <BotaoSubmeter />
                    </View>
                    <View style={styles.botaoVoltar}>
                        <VoltarButton />
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 16,
        paddingTop: 20,
    },
    header: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 7,
    },
    header2: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'normal',
        marginBottom: 7,
    },
    paragraph: {
        fontSize: 14,
        lineHeight: 20,
        color: '#3c3c3c',
        textAlign: 'justify',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Align buttons horizontally with space between them
    },
    botaoSubmeter: {
        width: '45%', // Set width to 45%
    },
    botaoVoltar: {
        width: '45%', // Set width to 45%
    },
});

export default Suporte;

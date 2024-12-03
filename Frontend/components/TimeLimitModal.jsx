import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Modal } from 'react-native';

const TimeLimitModal = ({ isVisible, onClose, message }) => {
    const [buttonColor, setButtonColor] = useState('rgba(221, 221, 221, 0.2)');

    const handlePressIn = () => {
        setButtonColor('#B8B3D3'); 
    };

    const handlePressOut = () => {
        setButtonColor('rgba(221, 221, 221, 0.2)');
    };

    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>Restricción de tiempo</Text>
                    <Text style={styles.modalMessage}>
                        {message}
                    </Text>
                    <Pressable
                        style={[styles.button, { backgroundColor: buttonColor }]} 
                        onPress={onClose}
                        onPressIn={handlePressIn} 
                        onPressOut={handlePressOut} 
                    >
                        <Text style={styles.acceptText}>Aceptar</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

export default TimeLimitModal;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    },
    modalView: {
        width: '85%',
        backgroundColor: 'white',
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    modalMessage: {
        fontSize: 14,
        color: 'black',
        textAlign: 'center',
        marginBottom: 20,    
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    acceptText: {
        color: 'black',
        fontWeight: 'bold',
    },
});

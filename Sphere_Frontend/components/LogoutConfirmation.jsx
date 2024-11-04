import React, { useState, useEffect } from "react";
import { View, Text, Pressable, StyleSheet, Modal } from "react-native";

const LogoutConfirmation = ({ isVisible, onClose, onConfirm }) => {
    const [buttonColor, setButtonColor] = useState("rgba(221, 221, 221, 0.2)");
    const [buttonColorLogout, setButtonColorLogout] = useState("rgba(221, 221, 221, 0.2)");

    useEffect(() => {
        // Reiniciar colores de los botones cuando el modal se cierra
        if (!isVisible) {
            setButtonColor("rgba(221, 221, 221, 0.2)");
            setButtonColorLogout("rgba(221, 221, 221, 0.2)");
        }
    }, [isVisible]);

    const handlePressIn = () => {
        setButtonColor("#B8B3D3");
    };

    const handlePressOut = () => {
        setButtonColor("rgba(221, 221, 221, 0.2)"); 
    };

    const handleLogoutPressIn = () => {
        setButtonColorLogout('#B8B3D3'); 
    };

    const handleLogoutPressOut = () => {
        setButtonColorLogout('rgba(221, 221, 221, 0.2)'); 
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
                    <Text style={styles.modalTitle}>Cerrar Sesión</Text>
                    <Text style={styles.modalMessage}>
                        ¿Estás seguro?
                    </Text>
                    <View style={styles.buttonContainer}>
                        <Pressable
                            style={[styles.button, { backgroundColor: buttonColor }]}
                            onPress={onClose}
                            onPressIn={handlePressIn}
                            onPressOut={handlePressOut}
                        >
                            <Text style={styles.cancelText}>Cancelar</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, { backgroundColor: buttonColorLogout }]}
                            onPress={onConfirm}
                            onPressIn={handleLogoutPressIn} 
                            onPressOut={handleLogoutPressOut}               
                        >
                            <Text style={styles.confirmText}>Cerrar Sesión</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default LogoutConfirmation;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalView: {
        width: "85%",
        backgroundColor: "white",
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
    },
    modalMessage: {
        fontSize: 14,
        color: "black",
        textAlign: "center",
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: "center",
        flex: 1,
        marginHorizontal: 5,
        borderRadius: 5,
    },
    cancelText: {
        color: "black",
        fontWeight: "bold",
    },
    confirmText: {
        color: "black",
        fontWeight: "bold",
    },
});

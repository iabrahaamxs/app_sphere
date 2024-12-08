import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Modal, ActivityIndicator } from 'react-native';
import { getItem } from "../utils/AsyncStorage"; // Para obtener el JWT
import { PostApi } from "../api/postsApi";  // Lógica de la API

const DeletePost = ({ isVisible, onCancel, onDelete, postId }) => {
    const [cancelButtonColor, setCancelButtonColor] = useState('rgba(221, 221, 221, 0.2)');
    const [deleteButtonColor, setDeleteButtonColor] = useState('rgba(221, 221, 221, 0.2)');
    const [sending, setSending] = useState(false);

    const handleCancelPressIn = () => setCancelButtonColor('#B8B3D3');
    const handleCancelPressOut = () => setCancelButtonColor('rgba(221, 221, 221, 0.2)');

    const handleDeletePressIn = () => setDeleteButtonColor('#B8B3D3');
    const handleDeletePressOut = () => setDeleteButtonColor('rgba(221, 221, 221, 0.2)');

    const handleDelete = async () => {
        setSending(true);
        try {
            const jwt = await getItem("jwt");
            if (!jwt) {
                throw new Error("No se encontró JWT");
            }

            const deleteResponse = await PostApi.deletePost(jwt, postId); 
            if (deleteResponse.ok) {
                onDelete(); 
            } else {
                console.error("Error al eliminar el post:", deleteResponse.message);
            }
        } catch (error) {
            console.error("Error al eliminar la publicación:", error);
        } finally {
            setSending(false);
        }
    };

    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={isVisible}
            onRequestClose={onCancel}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>¿Eliminar esta publicación?</Text>
                    <Text style={styles.modalMessage}>
                        Si lo haces, se eliminará esta {"\n"}publicación de forma permanente.
                    </Text>
                    <View style={styles.buttonContainer}>
                        <Pressable
                            style={[styles.button, { backgroundColor: cancelButtonColor }]}
                            onPress={onCancel}
                            onPressIn={handleCancelPressIn}
                            onPressOut={handleCancelPressOut}
                        >
                            <Text style={styles.cancelText}>Cancelar</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, { backgroundColor: deleteButtonColor }]}
                            onPress={handleDelete}
                            onPressIn={handleDeletePressIn}
                            onPressOut={handleDeletePressOut}
                        >
                            {sending ? (
                                <ActivityIndicator color={"black"} />
                            ) : (
                                <Text style={styles.deleteText}>Eliminar</Text>
                            )}
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default DeletePost;

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
        height: 180,
        padding: 20,
        alignItems: 'flex-start',
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
        textAlign: 'left',
    },
    modalMessage: {
        fontSize: 14,
        color: 'black',
        textAlign: 'center',
        marginBottom: 20,
        textAlign: 'left',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingTop: 10,
        paddingLeft: 18,
    },
    button: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    cancelButton: {
        backgroundColor: 'rgba(221, 221, 221, 0.2)',
    },
    deleteButton: {
        backgroundColor: 'rgba(221, 221, 221, 0.2)',
    },
    cancelText: {
        color: 'black',
        fontWeight: 'bold',
    },
    deleteText: {
        color: 'black',
        fontWeight: 'bold',
    },
});

import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native';
import DeletePost from './DeletePost';
import Feather from '@expo/vector-icons/Feather';

const PostOptionsMenu = ({ isVisible, onEdit, onCancel }) => {
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

    // Función para abrir el modal de eliminación
    const handleDeletePress = () => {
        setIsDeleteModalVisible(true);
    };

    // Función para cancelar la eliminación
    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
    };

    // Función para eliminar la publicación
    const handleDeletePost = () => {
        // Agregar funcionalidad de eliminación aquí
        setIsDeleteModalVisible(false);
        console.log("Publicación eliminada");
    };

    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={isVisible}
            onRequestClose={onCancel}
        >
            <TouchableWithoutFeedback onPress={onCancel}>
                <View style={styles.centeredView}>
                    <TouchableWithoutFeedback>                        
                        <View style={styles.menuViewTop}>                            
                            <Pressable style={styles.optionButton} onPress={handleDeletePress}>
                                <View style={styles.iconContainer}>
                                    <Feather 
                                        name="trash-2" 
                                        size={24} 
                                        color="black" // Color del ícono
                                    />
                                </View>
                                <Text style={styles.optionText}>Eliminar</Text>
                                <DeletePost
                                    isVisible={isDeleteModalVisible}
                                    onCancel={handleCancelDelete}
                                    onDelete={handleDeletePost}
                                />
                            </Pressable>
                            <View style={styles.verticalLine} />
                            <Pressable style={[styles.optionButton, { marginLeft: 10 }]} onPress={onEdit}>
                                <View style={styles.iconContainer}>
                                    <Feather 
                                        name="edit" 
                                        size={24} 
                                        color="black" // Color del ícono
                                    />
                                </View>
                                <Text style={styles.optionText}>Editar</Text>
                            </Pressable>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default PostOptionsMenu;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)', 
    },
    menuViewTop: {
        flexDirection: 'row',
        backgroundColor: 'white',
        width: '100%',
        padding: 20,
        justifyContent: 'space-around',
        borderTopLeftRadius: 20, 
        borderTopRightRadius: 20,                
    },
    verticalLine: {
        width: 2, 
        height: '95%', 
        backgroundColor: 'black', 
        marginHorizontal: 10, 
    },
    optionButton: {
        padding: 10,
        alignItems: 'center',
        flexDirection: 'row', 
        flex: 1,
    },
    iconContainer: {
        width: 40, // Ancho de la circunferencia
        height: 40, // Alto de la circunferencia
        borderRadius: 20, // Para hacerla circular
        backgroundColor: 'white', // Color de fondo
        borderWidth: 2, // Ancho del borde
        borderColor: 'black', // Color del borde
        justifyContent: 'center', // Centra el ícono verticalmente
        alignItems: 'center', // Centra el ícono horizontalmente
        marginRight: 10, // Espacio entre el ícono y el texto
    },
    optionText: {
        fontSize: 16,        
        color: '#000',
    },
});

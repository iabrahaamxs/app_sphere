import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native';
import DeletePost from './DeletePost';

const PostOptionsMenu = ({ isVisible, onEdit, onDelete, onCancel }) => {
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
                        <View style={styles.menuView}>
                            <Pressable style={styles.optionButton} onPress={onEdit}>
                                <Text style={styles.optionText}>Editar</Text>
                            </Pressable>
                            <Pressable style={styles.optionButton} onPress={handleDeletePress}>
                                <Text style={styles.optionText}>Eliminar</Text>
                                <DeletePost
                                    isVisible={isDeleteModalVisible}
                                    onCancel={handleCancelDelete}
                                    onDelete={handleDeletePost}
                                />
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
    menuView: {
        flexDirection: 'row',
        backgroundColor: 'white',
        width: '100%',
        padding: 20,
        justifyContent: 'space-around',
        borderTopLeftRadius: 20, 
        borderTopRightRadius: 20,
        borderTopColor:'#462E84',

        
    },
    optionButton: {
        padding: 10,
        alignItems: 'center',
        flex: 1,
    },
    optionText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
});

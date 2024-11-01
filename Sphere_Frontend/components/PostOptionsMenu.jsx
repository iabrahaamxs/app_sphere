import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import DeletePost from './DeletePost';
import { Bookmark } from "./Icons";

const PostOptionsMenu = ({ isVisible, onEdit, onCancel, isOwner, isFollowing }) => {
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [follow, setFollow] = useState(isFollowing); 

    useEffect(() => {
        setFollow(isFollowing); 
    }, [isFollowing]);

    const handleDeletePress = () => {
        setIsDeleteModalVisible(true);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
    };

    const handleDeletePost = () => {
        setIsDeleteModalVisible(false);
        console.log("Publicación eliminada");
        onCancel(); 
    };

    const handleFollowPress = () => {
        setFollow(!follow); 
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
                            <View style={styles.separator}></View>
                            {isOwner ? (
                                <>
                                    <Pressable style={styles.optionButton} onPress={handleDeletePress}>
                                        <View style={styles.iconContainer}>
                                            <Feather 
                                            name="trash-2" 
                                            size={24} 
                                            color="black" />
                                        </View>
                                        <Text style={styles.optionText}>Eliminar</Text>
                                    </Pressable>                  
                                    <Pressable style={styles.optionButton} onPress={onEdit}>
                                        <View style={styles.iconContainer}>
                                            <Feather 
                                            name="edit" 
                                            size={24} 
                                            color="black" 
                                            />
                                        </View>
                                        <Text style={styles.optionText}>Editar</Text>
                                    </Pressable>
                                    <Pressable style={styles.optionButton}>
                                        <View style={styles.iconContainer}>
                                            <Bookmark 
                                            size={24} 
                                            color="black" 
                                            />                    
                                        </View>
                                        <Text style={styles.optionText}>Agregar a favoritos</Text>
                                    </Pressable>
                                </>
                            ) : (
                                <>
                                    <Pressable 
                                        style={[styles.optionButton]} 
                                        onPress={handleFollowPress}
                                    >
                                        <View style={styles.iconContainer}>
                                            <Feather 
                                            name={follow ? "user-x" : "user-plus"} 
                                            size={24}  
                                            />
                                        </View>
                                        <Text style={[styles.optionText]}>
                                            {follow ? "Dejar de seguir" : "Seguir"}
                                        </Text>
                                    </Pressable>
                                    <Pressable style={styles.optionButton}>
                                        <View style={styles.iconContainer}>
                                            <Bookmark 
                                            size={24} 
                                            color="black" 
                                            />                    
                                        </View>
                                        <Text style={styles.optionText}>Agregar a favoritos</Text>
                                    </Pressable>
                                </>
                            )}
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>

            {isDeleteModalVisible && (
                <DeletePost
                    isVisible={isDeleteModalVisible}
                    onCancel={handleCancelDelete}
                    onDelete={handleDeletePost}
                />
            )}
        </Modal>
    );
};

export default PostOptionsMenu;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center', 
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },
    menuViewTop: { 
        flexDirection: 'column', 
        backgroundColor: 'white', 
        width: '100%', 
        paddingVertical: 20, 
        paddingHorizontal: 30, 
        justifyContent: 'space-around', 
        borderTopLeftRadius: 20, 
        borderTopRightRadius: 20 
    },
    optionButton: { 
        padding: 10, 
        alignItems: 'center', 
        flexDirection: 'row', 
        marginBottom: 10, 
    },
    iconContainer: { 
        width: 40, 
        height: 40, 
        borderRadius: 20, 
        backgroundColor: 'white', 
        borderWidth: 2, 
        borderColor: 'black', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginRight: 10 
    },
    optionText: { 
        fontSize: 16,         
    },
    separator: {
        height: 6, 
        backgroundColor: '#462E84',
        borderRadius: 20, 
        marginTop: -10, 
        marginBottom: 10,
        width: '20%',
        alignSelf: 'center'
    }
});

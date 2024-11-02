import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import CardUser from '../components/CardUser';
import { BackIcon } from '../components/Icons';


const LikesScreen = () => {
    const { postId } = useLocalSearchParams(); 
    const [likes, setLikes] = useState([]); 
    const router = useRouter(); 

    useEffect(() => {
        
        const simulatedLikes = [
            {
                user_id: 1,
                name: 'Nombre',
                last_name: 'Apellido',
                user_photo: 'https://st2.depositphotos.com/1809585/7376/i/600/depositphotos_73762843-stock-photo-girl-smiling-with-perfect-smile.jpg',
                user_name: 'Usuario',
            },
        ];

        setLikes(simulatedLikes);
    }, [postId]);

    const renderLike = ({ item }) => (
        <CardUser user={item} />
    );

    return (
        <View style={styles.container}>
            <Pressable style={styles.backButton} onPress={() => router.back()}>
                <BackIcon />
            </Pressable>
            <Text style={styles.title}>Me gustas</Text>
            <FlatList
                data={likes}
                keyExtractor={(item) => item.user_id.toString()}
                renderItem={renderLike}
                style={styles.likesList}
                showsVerticalScrollIndicator={false}
            />
            {likes.length === 0 && (
                <Text style={styles.noLikesText}>No hay likes para esta publicación.</Text>
            )}
        </View>
    );
};

export default LikesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        paddingTop: 30,
    },
    backButton: {
        marginBottom: 16,
        marginTop:16,  
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#462E84',
        marginTop:-25,
        marginBottom: 35,
        textAlign: 'center',
    },
    likesList: {
        flex: 1,
    },
    noLikesText: {
        fontSize: 16,
        color: 'gray',
        textAlign: 'center',
        marginTop: 20,
    },
});


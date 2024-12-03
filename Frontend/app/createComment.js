import React, { useState } from 'react';
import { View } from 'react-native';
import Comment from '../components/Comment'; 

export default function CreateComment() {
  // Comentarios de ejemplo
    const initialComments = [
    {
        id: 1,
        username: 'EdwardC',
        userPhoto: 'https://st5.depositphotos.com/8802304/68980/i/450/depositphotos_689808586-stock-photo-handsome-young-man-walking-street.jpg',
        text: '¡Qué genial foto!',
        createdAt: '2024-10-17T10:00:00Z',
    },
    {
        id: 2,
        username: 'Veronica1213',
        userPhoto: 'https://st2.depositphotos.com/1809585/7376/i/600/depositphotos_73762843-stock-photo-girl-smiling-with-perfect-smile.jpg',
        text: 'Me encanta el lugar 😍',
        createdAt: '2024-10-11T12:30:00Z',
    },
    ];

  // Estado para los comentarios
    const [comments, setComments] = useState(initialComments);

  // Estado para el nuevo comentario
    const [newComment, setNewComment] = useState('');

  // Función para enviar el comentario
    const handleSendComment = (postId, commentText) => {
    const newId = comments.length + 1;
    const newCommentObj = {
        id: newId,
        username: 'new_user',
        userPhoto: 'https://example.com/new_user.jpg',
        text: commentText,
      createdAt: new Date().toISOString(), 
    };
    setComments([...comments, newCommentObj]); // Agregar nuevo comentario
    setNewComment(''); 
    };

    return (
    <View style={{ flex: 1 }}>
        
      {/* Pantalla de comentarios */}
        <Comment
        comments={comments} 
        onSendComment={handleSendComment} 
        postId={1} 
        />
    </View>
    );
}

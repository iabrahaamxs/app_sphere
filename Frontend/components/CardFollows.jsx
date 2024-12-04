import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

const CardFollows = ({ followed, follows, asChild }) => {
  return (
    <View style={styles.containerCards}>
      <Link href={`/userFollower/0`} asChild={asChild}>
        <Pressable style={styles.card}>
          <Text style={styles.number}>{followed}</Text>
          <Text style={styles.label}>Seguidos</Text>
        </Pressable>
      </Link>

      <Link href={`/userFollower/1`} asChild={asChild}>
        <Pressable style={styles.card}>
          <Text style={styles.number}>{follows}</Text>
          <Text style={styles.label}>Seguidores</Text>
        </Pressable>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  containerCards: {
    width: "100%",
    flexDirection: "row", // Alinea las tarjetas en una fila
    justifyContent: "space-around", // Centra el contenido horizontalmente
    marginTop: 8,
    marginBottom: 16,
  },
  card: {
    width: 140,
    backgroundColor: "white", // Fondo blanco
    padding: 8, // Espaciado interno
    //marginHorizontal: 8, // Espaciado entre las tarjetas
    borderRadius: 12, // Bordes redondeados
    alignItems: "center", // Centra el contenido dentro de la tarjeta
    shadowColor: "#000", // Sombra de la tarjeta
    shadowOffset: { width: 0, height: 2 }, // Dirección de la sombra
    shadowOpacity: 0.1, // Opacidad de la sombra
    shadowRadius: 8, // Radio de la sombra
    elevation: 3, // Elevación en Android
  },
  number: {
    fontSize: 20, // Tamaño de fuente más grande
    fontWeight: "bold", // Fuente en negrita
    color: "black", // Color de texto negro
  },
  label: {
    fontSize: 14, // Tamaño de fuente más pequeño
    color: "gray", // Texto en color gris
  },
});

export default CardFollows;

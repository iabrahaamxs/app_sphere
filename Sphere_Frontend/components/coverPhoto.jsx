import { Image, StyleSheet, View } from "react-native";

const CoverPhoto = ({ photo }) => {
  return (
    <View style={styles.containerPortada}>
      <Image source={{ uri: photo }} style={styles.image} />
      <View style={styles.overlay} />
    </View>
  );
};

const styles = StyleSheet.create({
  containerPortada: {
    position: "relative",
    width: "110%",
    height: 140,
    alignSelf: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Hace que el overlay ocupe todo el espacio de la imagen
    backgroundColor: "black",
    opacity: 0.4, // Ajusta el nivel de oscuridad, mayor opacidad = imagen más oscura
  },
});

export default CoverPhoto;

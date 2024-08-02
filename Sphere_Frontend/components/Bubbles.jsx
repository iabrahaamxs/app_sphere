import {  View, StyleSheet } from "react-native";

export function Bubbles() {
  return (
    <View>
      <View style={styles.container1}>
        <View style={styles.bubbles1}></View>
      </View>

      <View style={styles.container2}>
        <View style={styles.bubbles2}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container1:{
    justifyContent: 'center',
    alignItems: 'center'

  },
  bubbles1:{
    position: 'absolute',
    backgroundColor: '#B8B3D3',
    width: '110%',
    height: 430,
    borderRadius: 99999,
    opacity: 0.3


  },
  container2:{
    justifyContent: 'center',

  },
  bubbles2:{
    position: 'absolute',
    backgroundColor: '#B8B3D3',
    width: 300,
    height: 300,
    borderRadius: 99999,
    opacity: 0.3,
    margin: '60%'

  },

  
});
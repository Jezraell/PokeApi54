import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu Perfil</Text>

      <Image
        source={{
          uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png",
        }}
        style={styles.avatar}
        resizeMode="contain"
      />

      <Text style={styles.username}>Treinador Pokémon</Text>

      <View style={styles.card}>
        <Text style={styles.item}>Nível: 12</Text>
        <Text style={styles.item}>Região favorita: Kanto</Text>
        <Text style={styles.item}>Pokémons capturados: 27</Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Editar Perfil</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button2}>
        <Text style={styles.buttonText2}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef6ff",
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 34,
    color: "#1b3a70",
    fontWeight: "bold",
    marginBottom: 20,
  },
  avatar: {
    width: 140,
    height: 140,
    marginBottom: 15,
    opacity: 0.9,
  },
  username: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1b3a70",
    marginBottom: 30,
  },
  card: {
    width: "100%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 14,
    marginBottom: 25,
    elevation: 4,
  },
  item: {
    fontSize: 18,
    marginVertical: 4,
    color: "#333",
  },
  button: {
    width: "80%",
    padding: 18,
    backgroundColor: "#ffcc00",
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 15,
  },
  button2: {
    width: "80%",
    padding: 18,
    backgroundColor: "#2a4dff",
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonText2: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});

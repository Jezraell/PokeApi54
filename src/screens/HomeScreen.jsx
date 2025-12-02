import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Poke Quiz</Text>
      <Image
        source={{
          uri: "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png",
        }}
        style={styles.logo}
      />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Quiz")}>
        <Text style={styles.buttonText}>Iniciar Quiz</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.alt]}
        onPress={() => navigation.getParent().navigate("Favorites")}
      >
        <Text style={styles.buttonText}>Favoritos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },
  title: { fontSize: 32, fontWeight: "800", marginBottom: 8 },
  logo: { width: 120, height: 120, marginBottom: 24 },
  button: {
    backgroundColor: "#ffcb05",
    padding: 14,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    marginVertical: 8,
  },
  alt: { backgroundColor: "#3b4cca" },
  buttonText: { fontSize: 18, fontWeight: "700" },
});

import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      
      <Image
        source={{ uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png" }}
        style={styles.backgroundBall}
      />

      <Text style={styles.title}>Poke Quiz</Text>

      <TouchableOpacity
        style={[styles.button, styles.quizButton]}
        onPress={() => navigation.navigate("Quiz")}
      >
        <Text style={styles.buttonText}>Iniciar Quiz</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.favButton]}
        onPress={() => navigation.navigate("Favorites")}
      >
        <Text style={styles.buttonText}>Favoritos</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f2f5ff",
    padding: 20,
  },

  // círculo decorativo atrás
  backgroundBall: {
    position: "absolute",
    top: 60,
    width: 180,
    height: 180,
    opacity: 0.15,
  },

  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#1b3a70",
    marginBottom: 20,
  },

  logo: {
    width: 240,
    height: 150,
    marginBottom: 60,
  },

  button: {
    width: "80%",
    padding: 18,
    borderRadius: 12,
    marginVertical: 10,
    alignItems: "center",
  },

  quizButton: {
    backgroundColor: "#ffcc00",
  },

  favButton: {
    backgroundColor: "#2a4dff",
  },

  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
});

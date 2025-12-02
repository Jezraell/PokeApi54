import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { saveFavorite } from "../storage/favorites";

export default function ResultScreen({ route, navigation }) {
  const { correct, pokemon, correctAnswer } = route.params;

  return (
    <View style={styles.container}>
      <Text style={correct ? styles.correct : styles.wrong}>
        {correct ? "Você Acertou!" : "Você Errou!"}
      </Text>

      <Image source={{ uri: pokemon.sprites.front_default }} style={styles.image} />

      <Text style={styles.answer}>Resposta correta: {correctAnswer}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Quiz")}
      >
        <Text style={styles.buttonText}>Próxima Pergunta</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.favButton]}
        onPress={() =>
          saveFavorite({
            id: pokemon.id,
            name: pokemon.name,
            image: pokemon.sprites.front_default,
          }).then(() => alert("Adicionado aos favoritos!"))
        }
      >
        <Text style={styles.buttonText}>Favoritar Pergunta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },
  correct: { fontSize: 28, fontWeight: "800", color: "green" },
  wrong: { fontSize: 28, fontWeight: "800", color: "red" },
  image: { width: 140, height: 140, marginVertical: 20 },
  answer: { fontSize: 18, marginBottom: 30 },
  button: {
    backgroundColor: "#ffcb05",
    padding: 14,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    marginVertical: 8,
  },
  favButton: { backgroundColor: "#3b4cca" },
  buttonText: { fontSize: 18, fontWeight: "700", color: "#000" },
});

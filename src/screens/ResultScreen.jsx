import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function ResultScreen({ route, navigation }) {
  const { score } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resultado</Text>
      <Text style={styles.score}>{score}/10 pontos</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.replace("Quiz")}>
        <Text style={styles.buttonText}>Jogar novamente</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate("Home")}>
        <Text style={styles.buttonText2}>Voltar ao início</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef6ff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#1b3a70",
    marginBottom: 10,
  },
  score: {
    fontSize: 28,
    color: "#1b3a70",
    marginBottom: 40,
  },
  button: {
    width: "80%",
    padding: 18,
    backgroundColor: "#ffcc00",
    borderRadius: 12,
    marginBottom: 15,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button2: {
    width: "80%",
    padding: 18,
    backgroundColor: "#2a4dff",
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText2: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

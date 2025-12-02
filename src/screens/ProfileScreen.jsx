import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { loadProgress, clearAll } from "../storage/favorites";

export default function ProfileScreen() {
  const [progress, setProgress] = useState({ correct: 0, wrong: 0, score: 0 });

  async function load() {
    const data = await loadProgress();
    setProgress(data);
  }

  async function reset() {
    await clearAll();
    load();
    alert("Progresso e favoritos apagados!");
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seu Perfil</Text>

      <Text style={styles.item}>Acertos: {progress.correct}</Text>
      <Text style={styles.item}>Erros: {progress.wrong}</Text>
      <Text style={styles.item}>Pontuação: {progress.score}</Text>

      <TouchableOpacity style={styles.button} onPress={reset}>
        <Text style={styles.buttonText}>Limpar Progresso</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },
  title: { fontSize: 32, fontWeight: "800", marginBottom: 20 },
  item: { fontSize: 20, marginVertical: 8 },
  button: {
    marginTop: 20,
    backgroundColor: "#3b4cca",
    padding: 14,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});

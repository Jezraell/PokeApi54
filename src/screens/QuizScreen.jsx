import { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import AnswerButton from "../components/AnswerButton";
import { fetchPokemonById, randomPokemonId } from "../services/pokeapi";
import { saveProgress, loadProgress } from "../storage/favorites";

export default function QuizScreen({ navigation }) {
  const [pokemon, setPokemon] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);

  async function loadQuestion() {
    try {
      setLoading(true);
      setSelected(null);

      const id = randomPokemonId();
      const poke = await fetchPokemonById(id);

      setPokemon(poke);
      setCorrectAnswer(poke.name);

      // Alternativas falsas
      const wrong = [];
      while (wrong.length < 3) {
        const rid = randomPokemonId();
        if (rid !== id) {
          const wp = await fetchPokemonById(rid);
          if (!wrong.includes(wp.name)) wrong.push(wp.name);
        }
      }

      const options = [...wrong, poke.name].sort(() => Math.random() - 0.5);
      setAnswers(options);
    } catch (error) {
      console.log("ERRO API:", error);
      alert("Erro ao carregar pergunta.");
    } finally {
      setLoading(false);
    }
  }

  async function handleAnswer(option) {
    setSelected(option);

    const progress = await loadProgress();
    if (option === correctAnswer) {
      progress.correct++;
      progress.score += 10;
    } else {
      progress.wrong++;
    }
    await saveProgress(progress);

    setTimeout(() => {
      navigation.navigate("Result", {
        correct: option === correctAnswer,
        pokemon,
        correctAnswer,
      });
    }, 400);
  }

  useEffect(() => {
    loadQuestion();
  }, []);

  if (loading || !pokemon)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Carregando pergunta...</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Image source={{ uri: pokemon.sprites.front_default }} style={styles.image} />

      <Text style={styles.title}>Quem é este Pokémon?</Text>

      {answers.map((opt, i) => (
        <AnswerButton
          key={i}
          text={opt}
          onPress={() => handleAnswer(opt)}
          selected={selected === opt}
          disabled={selected !== null}
          correct={selected ? opt === correctAnswer : null}
        />
      ))}

      <TouchableOpacity style={styles.nextButton} onPress={loadQuestion}>
        <Text style={styles.nextText}>Trocar Pergunta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: "center" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  image: { width: 140, height: 140, marginBottom: 20 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 20 },
  nextButton: {
    marginTop: 20,
    backgroundColor: "#3b4cca",
    padding: 12,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },
  nextText: { color: "#fff", fontWeight: "700" },
});

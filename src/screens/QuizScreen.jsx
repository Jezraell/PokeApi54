import { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import AnswerButton from "../components/AnswerButton";
import { useNavigation } from "@react-navigation/native";

export default function QuizScreen() {
  const navigation = useNavigation();

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    generateQuestions();
  }, []);

  const typePT = {
  normal: "Normal",
  fire: "Fogo",
  water: "Água",
  electric: "Elétrico",
  grass: "Planta",
  ice: "Gelo",
  fighting: "Lutador",
  poison: "Venenoso",
  ground: "Terra",
  flying: "Voador",
  psychic: "Psíquico",
  bug: "Inseto",
  rock: "Pedra",
  ghost: "Fantasma",
  dragon: "Dragão",
  dark: "Sombrio",
  steel: "Aço",
  fairy: "Fada"
};


  function getRegion(id) {
    if (id <= 151) return "Kanto";
    if (id <= 251) return "Johto";
    if (id <= 386) return "Hoenn";
    if (id <= 493) return "Sinnoh";
    if (id <= 649) return "Unova";
    if (id <= 721) return "Kalos";
    if (id <= 809) return "Alola";
    if (id <= 898) return "Galar";
    return "Paldea";
  }

  async function generateQuestions() {
    const qList = [];

    for (let i = 0; i < 10; i++) {
      const id = Math.floor(Math.random() * 500) + 1;
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await res.json();

      const qType = ["type", "name", "region"][Math.floor(Math.random() * 3)];

      let q = {
        text: "",
        image: data.sprites.other["official-artwork"].front_default,
        correct: "",
        options: [],
      };

      if (qType === "type") {
        q.text = "Qual é o TIPO PRINCIPAL deste Pokémon?";
        const enType = data.types[0].type.name;
        q.correct = typePT[enType];

        const allTypesEN = [
          "normal","fire","water","electric","grass","ice","fighting","poison",
          "ground","flying","psychic","bug","rock","ghost","dragon","dark",
          "steel","fairy"
        ];

        const optionsEN = shuffle([
          enType,
          ...allTypesEN.filter(t => t !== enType).sort(() => 0.5 - Math.random()).slice(0, 3)
        ]);

        q.options = optionsEN.map(t => typePT[t]); // converte todas para PT
      };


      if (qType === "name") {
        q.text = "Qual é o nome deste Pokémon?";
        q.correct = data.name;

        const wrong = [];
        while (wrong.length < 3) {
          const r = Math.floor(Math.random() * 500) + 1;
          if (!wrong.includes(r) && r !== id) wrong.push(r);
        }

        q.options = shuffle([
          q.correct,
          ...(await Promise.all(wrong.map(async id => {
            const r = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const d = await r.json();
            return d.name;
          })))
        ]);
      }

      if (qType === "region") {
        q.text = "De qual região este Pokémon é originário?";
        q.correct = getRegion(id);

        const allRegions = ["Kanto","Johto","Hoenn","Sinnoh","Unova","Kalos","Alola","Galar","Paldea"];

        q.options = shuffle([
          q.correct,
          ...allRegions.filter(r => r !== q.correct).sort(() => 0.5 - Math.random()).slice(0,3)
        ]);
      }

      qList.push(q);
    }

    setQuestions(qList);
    setLoading(false);
  }

  function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
  }

  function select(opt) {
    setSelected(opt);

    if (opt === questions[current].correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (current === 9) {
        navigation.replace("Result", {
          score: score + (opt === questions[current].correct ? 1 : 0),
        });
      } else {
        setCurrent(current + 1);
        setSelected(null);
      }
    }, 600);
  }

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#1b3a70" />
      </View>
    );
  }

  const q = questions[current];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.counter}>Pergunta {current + 1}/10</Text>

      <View style={styles.card}>
        <Image source={{ uri: q.image }} style={styles.pokemonImage} resizeMode="contain" />
        <Text style={styles.question}>{q.text}</Text>
      </View>

      <View style={styles.optionsBox}>
        {q.options.map((op, idx) => (
          <AnswerButton
            key={idx}
            text={op}
            selected={selected === op}
            correct={selected ? op === q.correct : null}
            onPress={() => select(op)}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eef6ff",
    padding: 20,
    alignItems: "center",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eef6ff",
  },
  counter: {
    fontSize: 22,
    color: "#1b3a70",
    fontWeight: "bold",
    marginBottom: 15,
  },
  card: {
    backgroundColor: "white",
    width: "100%",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    marginBottom: 25,
  },
  pokemonImage: {
    width: 220,
    height: 220,
    marginBottom: 15,
  },
  question: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1b3a70",
    textAlign: "center",
  },
  optionsBox: {
    width: "100%",
    marginTop: 10,
  },
});

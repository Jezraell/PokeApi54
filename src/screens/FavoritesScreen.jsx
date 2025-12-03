import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import { getFavorites, removeFavorite } from "../storage/favorites";
import { useEffect, useState } from "react";

export default function FavoritesScreen() {
  const [list, setList] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const fav = await getFavorites();
    setList(fav);
  }

  async function remove(item) {
    await removeFavorite(item.id);
    load();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favoritos</Text>

      {list.length === 0 ? (
        <Text style={styles.empty}>Nenhum Pokémon favoritado ainda.</Text>
      ) : (
        <FlatList
          data={list}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={{ paddingBottom: 40 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image
                source={{ uri: item.image }}
                style={styles.pokemonImage}
                resizeMode="contain"
              />

              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.region}>Região: {item.region}</Text>
              </View>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => remove(item)}
              >
                <Text style={styles.deleteText}>X</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef6ff",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1b3a70",
    marginBottom: 20,
    textAlign: "center",
  },
  empty: {
    fontSize: 18,
    color: "#555",
    textAlign: "center",
    marginTop: 50,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    marginBottom: 12,
    borderRadius: 14,
    elevation: 4,
  },
  pokemonImage: {
    width: 70,
    height: 70,
    marginRight: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1b3a70",
  },
  region: {
    color: "#444",
    marginTop: 4,
  },
  deleteButton: {
    backgroundColor: "#ff4d4d",
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});

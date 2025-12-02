import { useEffect, useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { listFavorites, removeFavorite } from "../storage/favorites";

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState([]);

  async function load() {
    const data = await listFavorites();
    setFavorites(data);
  }

  async function remove(id) {
    const updated = await removeFavorite(id);
    setFavorites(updated);
  }

  useEffect(() => {
    const unsubscribe = load();
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favoritos</Text>

      <FlatList
        data={favorites}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>

            <TouchableOpacity style={styles.remove} onPress={() => remove(item.id)}>
              <Text style={styles.removeText}>Remover</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text>Nenhum favorito ainda.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: "center" },
  title: { fontSize: 32, fontWeight: "800", marginBottom: 20 },
  card: {
    width: "100%",
    backgroundColor: "#eee",
    padding: 14,
    borderRadius: 10,
    marginBottom: 14,
    alignItems: "center",
  },
  image: { width: 80, height: 80 },
  name: { fontSize: 18, fontWeight: "700", marginTop: 10 },
  remove: {
    marginTop: 10,
    backgroundColor: "#ff4d4d",
    padding: 8,
    borderRadius: 8,
  },
  removeText: { color: "#fff", fontWeight: "700" },
});

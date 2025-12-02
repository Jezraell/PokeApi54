import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "@pokequiz:favorites";
const PROG = "@pokequiz:progress";

export async function saveFavorite(item) {
  const current = await listFavorites();
  if (current.find((i) => i.id === item.id)) return;
  current.push(item);
  await AsyncStorage.setItem(KEY, JSON.stringify(current));
}

export async function listFavorites() {
  const raw = await AsyncStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function removeFavorite(id) {
  const current = await listFavorites();
  const updated = current.filter((i) => i.id !== id);
  await AsyncStorage.setItem(KEY, JSON.stringify(updated));
  return updated;
}

export async function saveProgress(progress) {
  await AsyncStorage.setItem(PROG, JSON.stringify(progress));
}

export async function loadProgress() {
  const raw = await AsyncStorage.getItem(PROG);
  return raw ? JSON.parse(raw) : { correct: 0, wrong: 0, score: 0 };
}

export async function clearAll() {
  await AsyncStorage.removeItem(KEY);
  await AsyncStorage.removeItem(PROG);
}

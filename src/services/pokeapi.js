const BASE = "https://pokeapi.co/api/v2";

export async function fetchPokemonById(id) {
  const res = await fetch(`${BASE}/pokemon/${id}`);
  if (!res.ok) throw new Error("Failed to fetch Pokémon");
  return await res.json();
}

export function randomPokemonId(max = 898) {
  return Math.floor(Math.random() * max) + 1;
}

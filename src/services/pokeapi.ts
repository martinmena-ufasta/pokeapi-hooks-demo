import { PokemonDetail, PokemonListItem, PokemonListResponse } from '../types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

/**
 * Extrae el ID numérico del Pokémon a partir de su URL de PokéAPI
 */
export function getPokemonIdFromUrl(url: string): number {
  const parts = url.split('/').filter(Boolean);
  return parseInt(parts[parts.length - 1], 10);
}

/**
 * Obtiene una lista paginada de Pokémon con sus imágenes predeterminadas
 */
export async function fetchPokemonList(limit: number = 12, offset: number = 0): Promise<{
  items: PokemonListItem[];
  total: number;
}> {
  const res = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  if (!res.ok) {
    throw new Error(`Error en la API de Pokémon: ${res.statusText}`);
  }
  const data: PokemonListResponse = await res.json();

  const items: PokemonListItem[] = data.results.map((item) => {
    const id = getPokemonIdFromUrl(item.url);
    return {
      name: item.name,
      url: item.url,
      id,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
    };
  });

  return { items, total: data.count };
}

/**
 * Obtiene los detalles completos de un Pokémon específico por su ID o Nombre
 */
export async function fetchPokemonDetail(idOrName: string | number, signal?: AbortSignal): Promise<PokemonDetail> {
  const res = await fetch(`${BASE_URL}/pokemon/${idOrName}`, { signal });
  if (!res.ok) {
    throw new Error(`No se pudo encontrar información para "${idOrName}"`);
  }
  return res.json();
}

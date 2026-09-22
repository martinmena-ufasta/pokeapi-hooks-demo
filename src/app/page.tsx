'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import PokemonList from '@/components/PokemonList';
import PokemonModal from '@/components/PokemonModal';
import { PokemonListItem } from '@/types/pokemon';
import styles from './page.module.css';

export default function Home() {
  // useState 1: Guarda el término de búsqueda ingresado en el buscador
  const [searchTerm, setSearchTerm] = useState<string>('');

  // useState 2: Guarda la lista de Pokémon favoritos
  // const [favorites, setFavorites] = useState<PokemonListItem[]>([]);

  // useState 3: Guarda el Pokémon seleccionado actualmente para mostrar el modal de detalles
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonListItem | null>(null);

  // useState 4: Estado de carga del buscador
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // useEffect 1: Carga inicial de favoritos desde localStorage al montar el componente en el navegador
  // useEffect(() => {
  //   const storedFavs = localStorage.getItem('poke_favorites');
  //   if (storedFavs) {
  //     try {
  //       setFavorites(JSON.parse(storedFavs));
  //     } catch (e) {
  //       console.error('Error al deserializar favoritos de localStorage', e);
  //     }
  //   }
  // }, []); // [] = Se ejecuta solo una vez al montar

  // Handler para agregar/quitar favoritos (modifica el estado de useState)
  // const handleToggleFavorite = (pokemon: PokemonListItem) => {
  //   setFavorites((prevFavs) => {
  //     const exists = prevFavs.some((f) => f.id === pokemon.id);
  //     if (exists) {
  //       return prevFavs.filter((f) => f.id !== pokemon.id);
  //     } else {
  //       return [...prevFavs, pokemon];
  //     }
  //   });
  // };

  // const handleClearFavorites = () => {
  //   setFavorites([]);
  // };

  return (
    <div className={styles.page}>
      {/* Encabezado */}
      <Header />

      <main className={styles.content}>
        {/* Barra de Búsqueda */}
        <section className={styles.section}>
          <SearchBar onSearch={setSearchTerm} isLoading={isSearching} />
        </section>

        {/* Listado de Pokémon */}
        <section className={styles.section}>
          <h2 className={styles.title}>
            Explorador de Pokémon
          </h2>

          <PokemonList
            searchTerm={searchTerm}
            onSelectPokemon={setSelectedPokemon}
            onLoadingChange={setIsSearching}
          />
        </section>
      </main>

      {/* Modal de Detalles del Pokémon Seleccionado */}
      <PokemonModal
        pokemon={selectedPokemon}
        onClose={() => setSelectedPokemon(null)}
      />

      {/* Pie de página */}
      <footer className={styles.footer}>
        <p>
          Proyecto educativo Next.js & React demostrando <code className={styles.stateHook}>useState</code> y <code className={styles.effectHook}>useEffect</code>.
        </p>
        <p className={styles.footerNote}>
          Datos provistos por <a href="https://pokeapi.co/" target="_blank" rel="noreferrer" className={styles.apiLink}>PokéAPI</a>.
        </p>
      </footer>
    </div>
  );
}

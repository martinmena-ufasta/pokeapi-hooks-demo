'use client';

import React from 'react';
import Image from 'next/image';
import { Eye } from 'lucide-react';
import { PokemonListItem } from '../types/pokemon';
import styles from './PokemonCard.module.css';

interface PokemonCardProps {
  pokemon: PokemonListItem;
  onSelectPokemon: (pokemon: PokemonListItem) => void;
}

export default function PokemonCard({
  pokemon,
  onSelectPokemon,
}: PokemonCardProps) {
  return (
    <div className={styles.card}>
      {/* Número ID del Pokémon */}
      <span className={styles.id}>
        #{String(pokemon.id).padStart(3, '0')}
      </span>

      {/* Imagen del Pokémon */}
      <div className={styles.imageWrapper}>
        <Image
          src={pokemon.image}
          alt={pokemon.name}
          fill
          sizes="128px"
          priority={pokemon.id <= 12}
          className={styles.image}
        />
      </div>

      {/* Nombre */}
      <h3 className={styles.name}>
        {pokemon.name}
      </h3>

      {/* Botón Ver Detalles */}
      <button
        onClick={() => onSelectPokemon(pokemon)}
        className={styles.detailsButton}
      >
        <Eye className={styles.buttonIcon} /> Ver Detalles
      </button>
    </div>
  );
}

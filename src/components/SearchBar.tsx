'use client';

import React, { useState, useEffect } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSearch: (term: string) => void;
  isLoading: boolean;
}

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  // useState: guarda el texto ingresado por el usuario en tiempo real
  const [searchTerm, setSearchTerm] = useState('');

  // useEffect con Debounce: evita saturar la API en cada tecla presionada.
  // Demuestra la función de limpieza (cleanup) cancelando el timeout previo.
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm.trim().toLowerCase());
    }, 500); // 500ms de espera

    // Función de limpieza de useEffect: se ejecuta antes de reiniciar el efecto
    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm, onSearch]);

  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        <Search className={styles.searchIcon} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar Pokémon por nombre o ID..."
          className={styles.input}
        />
        {isLoading ? (
          <Loader2 className={styles.loadingIcon} />
        ) : (
          searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className={styles.clearButton}
            >
              <X className={styles.clearIcon} />
            </button>
          )
        )}
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { PokemonListItem } from '../types/pokemon';
import { fetchPokemonList, fetchPokemonDetail } from '../services/pokeapi';
import PokemonCard from './PokemonCard';
import styles from './PokemonList.module.css';

interface PokemonListProps {
  searchTerm: string;
  onSelectPokemon: (pokemon: PokemonListItem) => void;
  onLoadingChange: (loading: boolean) => void;
}

const ITEMS_PER_PAGE = 12;

export default function PokemonList({
  searchTerm,
  onSelectPokemon,
  onLoadingChange,
}: PokemonListProps) {
  // useState: maneja la lista de Pokémon expuesta en la UI
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
  // useState: estado numérico de paginación
  const [page, setPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  // useState: estados asíncronos de UI
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  // useEffect: carga la lista automáticamente cuando cambia la página o búsqueda
  useEffect(() => {
    let isCurrent = true;

    async function loadPokemonData() {
      setLoading(true);
      onLoadingChange(true);
      setError(null);

      try {
        if (searchTerm) {
          // Si hay búsqueda, intentar traer detalles del Pokémon directo por nombre/ID
          try {
            const singleDetail = await fetchPokemonDetail(searchTerm);
            if (!isCurrent) return;

            const singleItem: PokemonListItem = {
              id: singleDetail.id,
              name: singleDetail.name,
              url: `https://pokeapi.co/api/v2/pokemon/${singleDetail.id}/`,
              image:
                singleDetail.sprites.other['official-artwork'].front_default ||
                singleDetail.sprites.front_default,
            };
            setPokemonList([singleItem]);
            setTotalCount(1);
          } catch {
            if (!isCurrent) return;
            setPokemonList([]);
            setTotalCount(0);
            setError(`No se encontró ningún Pokémon con el término "${searchTerm}".`);
          }
        } else {
          // Si no hay búsqueda, consultar la lista paginada normal
          const offset = (page - 1) * ITEMS_PER_PAGE;
          const data = await fetchPokemonList(ITEMS_PER_PAGE, offset);
          if (!isCurrent) return;

          setPokemonList(data.items);
          setTotalCount(data.total);
        }
      } catch (err: any) {
        if (isCurrent) {
          setError(err.message || 'Error al conectar con la API.');
        }
      } finally {
        if (isCurrent) {
          setLoading(false);
          onLoadingChange(false);
        }
      }
    }

    loadPokemonData();

    return () => {
      isCurrent = false;
    };
  }, [page, searchTerm, onLoadingChange, reloadKey]);

  // Si se busca algo, reiniciamos a la página 1
  useEffect(() => {
    if (searchTerm) {
      setPage(1);
    }
  }, [searchTerm]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <div className={styles.container}>
      {/* Información de la paginación y estado */}
      <div className={styles.paginationBar}>
        <span className={styles.paginationText}>
          {searchTerm ? (
            `Resultados para: "${searchTerm}"`
          ) : (
            <>
              Página <span className={styles.currentPage}>{page}</span> de {totalPages} (
              {totalCount} Pokémon totales)
            </>
          )}
        </span>

        {/* Botones de Paginación (demuestran cambios de estado con useState) */}
        {!searchTerm && (
          <div className={styles.paginationControls}>
            <button
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={page === 1 || loading}
              className={`${styles.paginationButton} ${styles.previousButton}`}
            >
              <ChevronLeft className={styles.buttonIcon} /> Anterior
            </button>

            <button
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={page >= totalPages || loading}
              className={`${styles.paginationButton} ${styles.nextButton}`}
            >
              Siguiente <ChevronRight className={styles.buttonIcon} />
            </button>
          </div>
        )}
      </div>

      {/* Renderizado Condicional según Estados */}
      {loading ? (
        <div className={styles.loadingState}>
          <Loader2 className={styles.loadingIcon} />
          <p className={styles.statusText}>
            Ejecutando useEffect: Cargando Pokémon...
          </p>
        </div>
      ) : error ? (
        <div className={styles.errorState}>
          <AlertCircle className={styles.errorIcon} />
          <p className={styles.errorText}>{error}</p>
          <button
            onClick={() => setReloadKey((key) => key + 1)}
            className={styles.retryButton}
          >
            <RefreshCw className={styles.buttonIcon} /> Reintentar Carga
          </button>
        </div>
      ) : pokemonList.length === 0 ? (
        <div className={styles.emptyState}>
          No se encontraron Pokémon.
        </div>
      ) : (
        <div className={styles.grid}>
          {pokemonList.map((pokemon) => {
            return (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                onSelectPokemon={onSelectPokemon}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

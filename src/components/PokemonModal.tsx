'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Loader2, AlertTriangle, Zap } from 'lucide-react';
import { PokemonDetail, PokemonListItem } from '../types/pokemon';
import { fetchPokemonDetail } from '../services/pokeapi';
import styles from './PokemonModal.module.css';

interface PokemonModalProps {
  pokemon: PokemonListItem | null;
  onClose: () => void;
}

export default function PokemonModal({ pokemon, onClose }: PokemonModalProps) {
  // useState: guarda los detalles completos obtenidos de la API
  const [detail, setDetail] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // useEffect: Petición de datos detallados cuando el Pokémon seleccionado cambia
  useEffect(() => {
    if (!pokemon) return;

    // AbortController para cancelar la petición si el usuario cierra el modal rápido
    const controller = new AbortController();

    async function loadDetail() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPokemonDetail(pokemon!.id, controller.signal);
        setDetail(data);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Error al cargar los detalles');
        }
      } finally {
        setLoading(false);
      }
    }

    loadDetail();

    // Actualización de efecto secundario en el documento
    document.title = `Detalles de ${pokemon.name.toUpperCase()} - PokéAPI Demo`;

    // Función de limpieza de useEffect (limpia título y aborta fetch si aplica)
    return () => {
      controller.abort();
      document.title = 'PokéAPI Hooks Demo - React & Next.js';
    };
  }, [pokemon]);

  if (!pokemon) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* Encabezado del Modal */}
        <div className={styles.header}>
          <div>
            <span className={styles.id}>
              #{String(pokemon.id).padStart(3, '0')}
            </span>
            <h2 className={styles.title}>{pokemon.name}</h2>
          </div>
          <button
            onClick={onClose}
            className={styles.closeButton}
          >
            <X className={styles.closeIcon} />
          </button>
        </div>

        {/* Contenido principal */}
        <div className={styles.content}>
          {loading ? (
            <div className={styles.loadingState}>
              <Loader2 className={styles.loadingIcon} />
              <p className={styles.statusText}>
                Ejecutando useEffect para cargar detalles de {pokemon.name}...
              </p>
            </div>
          ) : error ? (
            <div className={styles.errorState}>
              <AlertTriangle className={styles.errorIcon} />
              <p className={styles.errorText}>{error}</p>
            </div>
          ) : detail ? (
            <>
              {/* Imagen central y Tipos */}
              <div className={styles.pokemonSummary}>
                <div className={styles.pokemonImageWrapper}>
                  <Image
                    src={
                      detail.sprites.other['official-artwork'].front_default ||
                      detail.sprites.front_default ||
                      pokemon.image
                    }
                    alt={detail.name}
                    fill
                    sizes="160px"
                    className={styles.pokemonImage}
                  />
                </div>

                <div className={styles.types}>
                  {detail.types.map((t) => (
                    <span
                      key={t.type.name}
                      className={styles.type}
                    >
                      {t.type.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Dimensiones */}
              <div className={styles.dimensions}>
                <div>
                  <span className={styles.dimensionLabel}>ALTURA</span>
                  <span className={styles.dimensionValue}>
                    {(detail.height / 10).toFixed(1)} m
                  </span>
                </div>
                <div>
                  <span className={styles.dimensionLabel}>PESO</span>
                  <span className={styles.dimensionValue}>
                    {(detail.weight / 10).toFixed(1)} kg
                  </span>
                </div>
              </div>

              {/* Estadísticas */}
              <div>
                <h4 className={styles.statsTitle}>
                  <Zap className={styles.statsIcon} /> Estadísticas Base
                </h4>
                <div className={styles.statsList}>
                  {detail.stats.map((s) => (
                    <div key={s.stat.name} className={styles.stat}>
                      <div className={styles.statHeader}>
                        <span>{s.stat.name.replace('-', ' ')}</span>
                        <span>{s.base_stat}</span>
                      </div>
                      <div className={styles.progressTrack}>
                        <progress
                          className={styles.progress}
                          value={Math.min(150, s.base_stat)}
                          max={150}
                          aria-label={`${s.stat.name} base stat`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <div className={styles.badge}>
          <Sparkles className={styles.badgeIcon} /> Taller de programación II
        </div>

        <h1 className={styles.title}>
          Mi Pokédex
        </h1>

      </div>
    </header>
  );
}

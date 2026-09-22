# PokéAPI Hooks Demo (`useState` & `useEffect`) 🚀

Un proyecto interactivo creado con **Next.js (App Router), React, TypeScript y Tailwind CSS** diseñado específicamente para aprender y comprender los hooks fundamentales de React: `useState` y `useEffect`, consumiendo datos en tiempo real de la [PokéAPI](https://pokeapi.co/).

---

## 📌 Conceptos Demostrados

### 1. `useState` (Manejo de Estado Reactivo)
* **Paginación (`page`, `totalCount`)**: Control dinámico de las páginas de resultados.
* **Término de búsqueda (`searchTerm`)**: Captura en tiempo real del input de búsqueda.
* **Estados de Asincronía (`loading`, `error`)**: Retroalimentación visual interactiva mientras se consultan los endpoints de PokéAPI.
* **Lista de Favoritos (`favorites`)**: Arreglo de Pokémon agregados o eliminados reactivamente por el usuario.
* **Pokémon Seleccionado (`selectedPokemon`)**: Control de apertura/cierre y datos para la ventana modal.

### 2. `useEffect` (Efectos Secundarios y Ciclo de Vida)
* **Data Fetching al Montar y Cambiar Dependencias**: Peticiones `fetch` a la PokéAPI que se activan al cambiar la página actual o el término de búsqueda.
* **Debounce en Búsqueda y Función Cleanup**: Uso de `setTimeout` con función de limpieza `clearTimeout` en el retorno de `useEffect` para evitar saturar la API en cada pulsación de tecla.
* **Sincronización con `localStorage`**:
  * `useEffect([], ...)` para recuperar favoritos guardados al cargar la aplicación por primera vez en el navegador.
  * `useEffect([favorites], ...)` para guardar automáticamente en `localStorage` cada vez que se agregue o elimine un favorito.
* **Cancelación de Peticiones HTTP (`AbortController`)**: Función de limpieza en la modal para abortar peticiones pendientes si el usuario cierra la ventana antes de completarse la carga.
* **Actualización del Título del Navegador (`document.title`)**: Modificación del título de la pestaña según el Pokémon visualizado en detalle.

---

## 🛠️ Requisitos e Instalación

### Requisitos Previos
* Node.js v18.0.0 o superior
* npm o yarn

### Pasos para Ejecutar Localmente

1. Navegar a la carpeta del proyecto:
   ```bash
   cd /Users/muramena/.gemini/antigravity/scratch/pokeapi-hooks-demo
   ```

2. Instalar las dependencias (si aún no se han instalado):
   ```bash
   npm install
   ```

3. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Abrir en el navegador: [http://localhost:3000](http://localhost:3000)

---

## 📂 Estructura del Proyecto

```
pokeapi-hooks-demo/
├── src/
│   ├── app/
│   │   ├── globals.css         # Estilos globales y animaciones de Tailwind CSS
│   │   ├── layout.tsx          # Layout principal de Next.js
│   │   └── page.tsx            # Página principal integradora y didáctica
│   ├── components/
│   │   ├── Header.tsx          # Encabezado explicativo de la aplicación
│   │   ├── SearchBar.tsx       # Buscador interactivo (demuestra useState + useEffect debounce)
│   │   ├── PokemonList.tsx     # Grilla de tarjetas con paginación (demuestra fetch en useEffect)
│   │   ├── PokemonCard.tsx     # Tarjeta individual con acción de favorito y detalle
│   │   ├── PokemonModal.tsx    # Modal de detalles (demuestra useEffect con AbortController)
│   │   ├── FavoritesList.tsx   # Colección de favoritos sincronizada con localStorage
│   │   └── CodeExplainer.tsx   # Paneles colapsables con fragmentos de código explicados
│   ├── services/
│   │   └── pokeapi.ts          # Funciones helper para interactuar con PokéAPI
│   └── types/
│       └── pokemon.ts          # Interfaces de TypeScript para PokéAPI
├── next.config.mjs
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 💡 Ejemplos Clave de Código

### Ejemplo: Debounce en Búsqueda con `useEffect` y Cleanup

```tsx
const [searchTerm, setSearchTerm] = useState('');

useEffect(() => {
  // Espera 500ms antes de ejecutar la búsqueda
  const timer = setTimeout(() => {
    onSearch(searchTerm.trim().toLowerCase());
  }, 500);

  // Limpieza: cancela el timer si searchTerm cambia antes de los 500ms
  return () => clearTimeout(timer);
}, [searchTerm, onSearch]);
```

### Ejemplo: Sincronización con `localStorage`

```tsx
// Carga inicial (mount)
useEffect(() => {
  const storedFavs = localStorage.getItem('poke_favorites');
  if (storedFavs) setFavorites(JSON.parse(storedFavs));
}, []);

// Guardado ante cualquier cambio en 'favorites'
useEffect(() => {
  localStorage.setItem('poke_favorites', JSON.stringify(favorites));
}, [favorites]);
```

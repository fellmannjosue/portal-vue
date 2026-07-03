<script setup lang="ts">
import { computed, ref } from 'vue';
import { Search, ArrowUpRight, LayoutGrid, Boxes, Circle } from 'lucide-vue-next';
import { APPS } from './apps.data';

const query = ref('');
const category = ref('');

const categories = computed(() => Array.from(new Set(APPS.map((a) => a.category))));

/** Conteo por categoría para las insignias del panel lateral */
const countOf = (c: string) => APPS.filter((a) => a.category === c).length;

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  return APPS.filter((a) => {
    const okCat = !category.value || a.category === category.value;
    const okQ =
      !q ||
      a.name.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q);
    return okCat && okQ;
  });
});

/** Muestra host:puerto a partir de la URL */
const hostOf = (url: string) => {
  try {
    const u = new URL(url);
    return u.host + (u.pathname !== '/' ? u.pathname : '');
  } catch {
    return url;
  }
};
</script>

<template>
  <div class="app">
    <!-- Barra lateral -->
    <aside class="rail">
      <div class="rail__brand">
        <span class="rail__logo"><Boxes :size="22" /></span>
        <div>
          <strong>Portal</strong>
          <small>de Aplicaciones</small>
        </div>
      </div>

      <nav class="rail__nav">
        <button
          class="nav"
          :class="{ 'nav--on': category === '' }"
          @click="category = ''"
        >
          <LayoutGrid :size="17" />
          <span>Todas</span>
          <b>{{ APPS.length }}</b>
        </button>

        <p class="rail__label">Categorías</p>

        <button
          v-for="c in categories"
          :key="c"
          class="nav"
          :class="{ 'nav--on': category === c }"
          @click="category = c"
        >
          <Circle :size="9" class="nav__dot" />
          <span>{{ c }}</span>
          <b>{{ countOf(c) }}</b>
        </button>
      </nav>

      <div class="rail__foot">
        <span class="pulse" /> {{ APPS.length }} servicios activos
      </div>
    </aside>

    <!-- Contenido -->
    <section class="main">
      <header class="bar">
        <div>
          <h1>{{ category || 'Todas las aplicaciones' }}</h1>
          <p>{{ filtered.length }} resultado(s)</p>
        </div>
        <div class="search">
          <Search :size="18" class="search__icon" />
          <input v-model="query" type="search" placeholder="Buscar…" />
        </div>
      </header>

      <TransitionGroup name="cards" tag="div" class="grid">
        <a
          v-for="app in filtered"
          :key="app.name"
          class="card"
          :href="app.url"
          target="_blank"
          rel="noopener noreferrer"
          :style="{ '--accent': app.accent }"
        >
          <span class="card__bar" />
          <span class="card__icon">
            <component :is="app.icon" :size="22" />
          </span>
          <div class="card__body">
            <div class="card__head">
              <h3>{{ app.name }}</h3>
              <ArrowUpRight :size="17" class="card__go" />
            </div>
            <p>{{ app.description }}</p>
            <code class="card__host">{{ hostOf(app.url) }}</code>
          </div>
        </a>
      </TransitionGroup>

      <p v-if="filtered.length === 0" class="empty">
        No se encontraron aplicaciones.
      </p>
    </section>
  </div>
</template>

<style scoped>
.app {
  display: grid;
  grid-template-columns: 264px 1fr;
  min-height: 100vh;
}

/* ---------- Barra lateral ---------- */
.rail {
  position: sticky;
  top: 0;
  align-self: start;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 1.5rem 1rem;
  background: linear-gradient(180deg, #0b1120, #0f172a);
  color: #cbd5e1;
  border-right: 1px solid #1e293b;
}
.rail__brand {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.4rem 0.6rem 1.4rem;
}
.rail__logo {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  color: #fff;
  background: linear-gradient(135deg, var(--accent-a), var(--accent-b));
  box-shadow: 0 8px 20px -8px var(--accent-a);
}
.rail__brand strong {
  display: block;
  color: #fff;
  font-size: 1.05rem;
  line-height: 1.1;
}
.rail__brand small {
  color: #64748b;
  font-size: 0.72rem;
  letter-spacing: 0.04em;
}
.rail__label {
  margin: 1rem 0.6rem 0.4rem;
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #475569;
}
.rail__nav {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  overflow-y: auto;
  flex: 1;
}
.nav {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.6rem 0.7rem;
  border: none;
  border-radius: 10px;
  background: transparent;
  color: #94a3b8;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.16s, color 0.16s;
  text-align: left;
}
.nav span {
  flex: 1;
}
.nav b {
  font-size: 0.72rem;
  font-weight: 600;
  color: #64748b;
  background: #1e293b;
  padding: 0.05rem 0.5rem;
  border-radius: 999px;
}
.nav__dot {
  color: var(--accent-a);
}
.nav:hover {
  background: #1e293b;
  color: #e2e8f0;
}
.nav--on {
  background: linear-gradient(90deg, var(--accent-a), var(--accent-b));
  color: #fff;
}
.nav--on b {
  background: rgba(255, 255, 255, 0.22);
  color: #fff;
}
.rail__foot {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.9rem 0.7rem 0;
  border-top: 1px solid #1e293b;
  font-size: 0.76rem;
  color: #64748b;
}
.pulse {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.6);
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.5); }
  70% { box-shadow: 0 0 0 7px rgba(34, 197, 94, 0); }
  100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
}

/* ---------- Contenido ---------- */
.main {
  padding: clamp(1.5rem, 3vw, 2.6rem);
}
.bar {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.8rem;
}
.bar h1 {
  margin: 0;
  font-size: clamp(1.4rem, 3vw, 1.9rem);
  font-weight: 700;
  letter-spacing: -0.02em;
}
.bar p {
  margin: 0.2rem 0 0;
  color: var(--muted);
  font-size: 0.88rem;
}
.search {
  position: relative;
  display: flex;
  align-items: center;
}
.search__icon {
  position: absolute;
  left: 0.9rem;
  color: var(--muted);
  pointer-events: none;
}
.search input {
  width: min(320px, 70vw);
  padding: 0.72rem 1rem 0.72rem 2.6rem;
  border: 1px solid var(--line-strong);
  border-radius: 12px;
  background: var(--surface);
  font-size: 0.92rem;
  color: var(--ink);
  outline: none;
  box-shadow: var(--shadow-sm);
  transition: border-color 0.18s, box-shadow 0.18s;
}
.search input:focus {
  border-color: var(--accent-a);
  box-shadow: 0 0 0 4px var(--ring);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

.card {
  position: relative;
  display: flex;
  gap: 0.9rem;
  padding: 1.2rem 1.2rem 1.2rem 1.4rem;
  border-radius: 14px;
  background: var(--surface);
  border: 1px solid var(--line);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
}
.card__bar {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: var(--accent);
  opacity: 0.85;
}
.card:hover {
  transform: translateY(-3px);
  border-color: color-mix(in srgb, var(--accent) 45%, var(--line));
  box-shadow: var(--shadow-md);
}
.card__icon {
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 11px;
  color: var(--accent);
  background: color-mix(in srgb, var(--accent) 12%, transparent);
}
.card__body {
  min-width: 0;
  flex: 1;
}
.card__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.card__head h3 {
  margin: 0;
  font-size: 1.02rem;
  font-weight: 650;
  letter-spacing: -0.01em;
}
.card__go {
  color: var(--muted);
  transition: transform 0.2s, color 0.2s;
}
.card:hover .card__go {
  transform: translate(3px, -3px);
  color: var(--accent);
}
.card__body p {
  margin: 0.3rem 0 0.7rem;
  color: var(--ink-soft);
  font-size: 0.85rem;
  line-height: 1.4;
}
.card__host {
  font-size: 0.74rem;
  color: var(--muted);
  background: #f4f6fa;
  border: 1px solid var(--line);
  padding: 0.12rem 0.5rem;
  border-radius: 6px;
  font-family: ui-monospace, "SF Mono", Menlo, monospace;
}

.empty {
  text-align: center;
  color: var(--muted);
  padding: 3rem 0;
}

.cards-enter-active,
.cards-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.cards-enter-from {
  opacity: 0;
  transform: translateY(12px) scale(0.98);
}
.cards-leave-to {
  opacity: 0;
  transform: scale(0.97);
}
.cards-leave-active {
  position: absolute;
}

/* ---------- Responsivo ---------- */
@media (max-width: 780px) {
  .app {
    grid-template-columns: 1fr;
  }
  .rail {
    position: static;
    height: auto;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.4rem;
  }
  .rail__brand {
    padding: 0.2rem 0.4rem;
    width: 100%;
  }
  .rail__label,
  .rail__foot {
    display: none;
  }
  .rail__nav {
    flex-direction: row;
    flex-wrap: wrap;
    overflow: visible;
  }
  .nav b {
    display: none;
  }
}
</style>

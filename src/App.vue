<script setup lang="ts">
import { computed, ref } from 'vue';
import { Search, ArrowUpRight, LayoutGrid } from 'lucide-vue-next';
import { APPS } from './apps.data';

const query = ref('');
const category = ref('');

const categories = computed(() => Array.from(new Set(APPS.map((a) => a.category))));

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
</script>

<template>
  <div class="shell">
    <!-- Encabezado -->
    <header class="head">
      <div class="head__intro">
        <span class="eyebrow">
          <LayoutGrid :size="14" /> Acceso interno
        </span>
        <h1>Portal de Aplicaciones</h1>
        <p>Un único lugar para todos los sistemas de la organización.</p>
      </div>

      <div class="search">
        <Search :size="18" class="search__icon" />
        <input v-model="query" type="search" placeholder="Buscar aplicación…" />
      </div>
    </header>

    <!-- Filtros -->
    <nav class="filters">
      <button
        class="seg"
        :class="{ 'seg--on': category === '' }"
        @click="category = ''"
      >
        Todas
      </button>
      <button
        v-for="c in categories"
        :key="c"
        class="seg"
        :class="{ 'seg--on': category === c }"
        @click="category = c"
      >
        {{ c }}
      </button>
    </nav>

    <!-- Tarjetas -->
    <TransitionGroup name="cards" tag="main" class="grid">
      <a
        v-for="app in filtered"
        :key="app.name"
        class="card"
        :href="app.url"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div class="card__top">
          <span
            class="card__icon"
            :style="{ color: app.accent, background: app.accent + '14' }"
          >
            <component :is="app.icon" :size="22" />
          </span>
          <ArrowUpRight :size="18" class="card__go" />
        </div>
        <h3>{{ app.name }}</h3>
        <p>{{ app.description }}</p>
        <span class="card__tag">{{ app.category }}</span>
      </a>
    </TransitionGroup>

    <p v-if="filtered.length === 0" class="empty">
      No se encontraron aplicaciones.
    </p>

    <footer class="foot">
      <span>{{ filtered.length }} de {{ APPS.length }} aplicaciones</span>
      <span>Portal de Aplicaciones · {{ new Date().getFullYear() }}</span>
    </footer>
  </div>
</template>

<style scoped>
.shell {
  max-width: 1120px;
  margin: 0 auto;
  padding: clamp(2rem, 5vw, 4rem) 1.5rem 3rem;
}

/* Encabezado */
.head {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 2.2rem;
}
.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--brand);
  background: var(--brand-soft);
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
}
.head__intro h1 {
  margin: 0.8rem 0 0.4rem;
  font-size: clamp(1.9rem, 4vw, 2.6rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.05;
}
.head__intro p {
  margin: 0;
  color: var(--ink-soft);
  font-size: 1.02rem;
}

.search {
  position: relative;
  display: flex;
  align-items: center;
}
.search__icon {
  position: absolute;
  left: 0.95rem;
  color: var(--muted);
  pointer-events: none;
}
.search input {
  width: min(340px, 78vw);
  padding: 0.8rem 1rem 0.8rem 2.7rem;
  border: 1px solid var(--line-strong);
  border-radius: 12px;
  background: var(--surface);
  font-size: 0.95rem;
  color: var(--ink);
  outline: none;
  box-shadow: var(--shadow-sm);
  transition: border-color 0.18s, box-shadow 0.18s;
}
.search input:focus {
  border-color: var(--brand);
  box-shadow: 0 0 0 4px var(--ring);
}

/* Filtros */
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 2rem;
  padding-bottom: 1.4rem;
  border-bottom: 1px solid var(--line);
}
.seg {
  padding: 0.5rem 1rem;
  border-radius: 10px;
  border: 1px solid transparent;
  background: transparent;
  color: var(--ink-soft);
  font-size: 0.88rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.16s;
}
.seg:hover {
  background: #f3f5f9;
  color: var(--ink);
}
.seg--on {
  background: var(--ink);
  color: #fff;
  box-shadow: var(--shadow-sm);
}

/* Cuadrícula */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.1rem;
}

.card {
  display: flex;
  flex-direction: column;
  padding: 1.4rem;
  border-radius: var(--radius);
  background: var(--surface);
  border: 1px solid var(--line);
  box-shadow: var(--shadow-sm);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}
.card:hover {
  transform: translateY(-4px);
  border-color: var(--line-strong);
  box-shadow: var(--shadow-md);
}
.card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.1rem;
}
.card__icon {
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border-radius: 12px;
}
.card__go {
  color: var(--muted);
  transition: transform 0.2s ease, color 0.2s ease;
}
.card:hover .card__go {
  transform: translate(3px, -3px);
  color: var(--ink);
}
.card h3 {
  margin: 0 0 0.35rem;
  font-size: 1.05rem;
  font-weight: 650;
  letter-spacing: -0.01em;
}
.card p {
  margin: 0 0 1rem;
  color: var(--ink-soft);
  font-size: 0.88rem;
  line-height: 1.45;
  flex: 1;
}
.card__tag {
  align-self: flex-start;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--ink-soft);
  background: #f4f6fa;
  border: 1px solid var(--line);
  padding: 0.22rem 0.6rem;
  border-radius: 7px;
}

.empty {
  text-align: center;
  color: var(--muted);
  padding: 3rem 0;
}

.foot {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: space-between;
  margin-top: 2.6rem;
  padding-top: 1.4rem;
  border-top: 1px solid var(--line);
  color: var(--muted);
  font-size: 0.82rem;
}

/* Transiciones de las tarjetas */
.cards-enter-active,
.cards-leave-active {
  transition: opacity 0.32s ease, transform 0.32s ease;
}
.cards-enter-from {
  opacity: 0;
  transform: translateY(14px) scale(0.98);
}
.cards-leave-to {
  opacity: 0;
  transform: scale(0.97);
}
.cards-leave-active {
  position: absolute;
}
</style>

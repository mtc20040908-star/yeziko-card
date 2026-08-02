<template>
  <div class="status-bar" :class="{ dark: is_dark }">
    <div class="header" @click="expanded = !expanded" role="button" :aria-expanded="expanded">
      <div class="title-row">
        <span class="name">绯田悦子</span>
        <span class="stage" :class="{ 'stage-late': is_late }">{{ stage_label }}</span>
      </div>
      <div class="meta-row">
        <span class="meta-loc">
          <i class="fa fa-map-marker" aria-hidden="true"></i>
          {{ location_label }}
        </span>
        <span class="meta-hint">{{ expanded ? '收起' : '状态' }} <i :class="expanded ? 'fa fa-chevron-up' : 'fa fa-chevron-down'" aria-hidden="true"></i></span>
      </div>
    </div>

    <div class="bars">
      <div class="bar-row">
        <span class="bar-label">堕落度</span>
        <div class="bar-track">
          <div class="bar-fill corruption" :style="{ width: store.data.悦子.堕落度 + '%' }"></div>
        </div>
        <span class="bar-value">{{ store.data.悦子.堕落度 }}%</span>
      </div>
      <div class="bar-row">
        <span class="bar-label">快感依赖</span>
        <div class="bar-track">
          <div class="bar-fill dependency" :style="{ width: store.data.悦子.快感依赖 + '%' }"></div>
        </div>
        <span class="bar-value">{{ store.data.悦子.快感依赖 }}%</span>
      </div>
    </div>

    <Transition name="expand">
      <div v-if="expanded" class="detail">
        <div class="detail-section">
          <div class="detail-head">当前着装</div>
          <div class="attire-grid">
            <div class="attire-item">
              <span class="attire-slot">整体风格</span>
              <span class="attire-text">{{ store.data.悦子.当前着装.整体风格 }}</span>
            </div>
            <div class="attire-item">
              <span class="attire-slot">上装</span>
              <span class="attire-text">{{ store.data.悦子.当前着装.上装 }}</span>
            </div>
            <div class="attire-item">
              <span class="attire-slot">下装</span>
              <span class="attire-text">{{ store.data.悦子.当前着装.下装 }}</span>
            </div>
            <div class="attire-item">
              <span class="attire-slot">内衣</span>
              <span class="attire-text">{{ store.data.悦子.当前着装.内衣 }}</span>
            </div>
            <div class="attire-item">
              <span class="attire-slot">袜子</span>
              <span class="attire-text">{{ store.data.悦子.当前着装.袜子 }}</span>
            </div>
            <div class="attire-item">
              <span class="attire-slot">鞋履</span>
              <span class="attire-text">{{ store.data.悦子.当前着装.鞋履 }}</span>
            </div>
          </div>
        </div>

        <div class="detail-section">
          <div class="detail-head">束具</div>
          <div class="bond-grid">
            <div v-for="slot in bond_slots" :key="slot" class="bond-item" :class="{ bound: is_bound(slot) }">
              <span class="bond-slot">{{ slot }}</span>
              <span class="bond-text">{{ store.data.悦子.当前着装.束具[slot] }}</span>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from './store';

const store = useDataStore();
const expanded = ref(false);

const bond_slots = ['胸部', '手腕', '足踝', '腰部', '私处', '臀部'];

const is_dark = computed(() => store.data.悦子.堕落度 >= 70);
const is_late = computed(() => store.data.悦子.堕落度 >= 90);

const stage_label = computed(() => {
  const deg = store.data.悦子.堕落度;
  if (deg < 20) return '日常';
  if (deg < 45) return '抗拒';
  if (deg < 70) return '挣扎';
  if (deg < 90) return '沉沦';
  return '终局';
});

const location_label = computed(() => {
  const loc = store.data.系统.当前区域;
  return loc === '绯田宅' ? '绯田宅' : '密室调教别荘';
});

function is_bound(slot: string): boolean {
  const val = store.data.悦子.当前着装.束具[slot as keyof typeof store.data.悦子.当前着装.束具];
  return !!val && val !== '无';
}
</script>

<style lang="scss" scoped>
.status-bar {
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  font-family: var(--font-status);
  color: var(--c-ink);
  background-color: var(--c-bg-light);
  border: 1px solid var(--c-line);
  box-shadow: 0 2px 10px rgba(43, 38, 34, 0.12);
  transition: background-color 0.6s ease, color 0.6s ease, border-color 0.6s ease;
}

.status-bar.dark {
  background-color: var(--c-bg-dark);
  color: var(--c-bg-light);
  border-color: var(--c-primary);
}

.header {
  padding: 10px 14px;
  cursor: pointer;
  user-select: none;
}

.title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
}

.name {
  font-size: 1.15rem;
  font-weight: bold;
  letter-spacing: 0.08em;
}

.stage {
  font-size: 0.8rem;
  font-weight: bold;
  padding: 2px 8px;
  border: 1px solid var(--c-muted);
  color: var(--c-muted);
  letter-spacing: 0.2em;
  border-radius: 2px;
}

.stage-late {
  border-color: var(--c-primary);
  color: var(--c-primary);
}

.meta-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.78rem;
  color: var(--c-muted);
}

.meta-loc i {
  margin-right: 4px;
}

.meta-hint i {
  margin-left: 2px;
}

.bars {
  padding: 0 14px 10px;
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.bar-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.bar-label {
  font-size: 0.75rem;
  width: 4.5em;
  letter-spacing: 0.1em;
}

.bar-track {
  flex: 1;
  height: 9px;
  border: 1px solid var(--c-line);
  background: rgba(255, 255, 255, 0.35);
  overflow: hidden;
}

.dark .bar-track {
  border-color: var(--c-primary);
  background: rgba(138, 58, 58, 0.12);
}

.bar-fill {
  height: 100%;
  transition: width 0.5s ease, background-color 0.5s ease;
}

.bar-fill.corruption {
  background-color: var(--c-muted);
}

.dark .bar-fill.corruption {
  background-color: var(--c-primary);
}

.bar-fill.dependency {
  background-color: var(--c-accent);
}

.bar-value {
  font-size: 0.75rem;
  width: 2.6em;
  text-align: right;
  font-weight: bold;
}

.detail {
  border-top: 1px solid var(--c-line);
  padding: 10px 14px 12px;
}

.detail-section {
  margin-bottom: 10px;
}

.detail-section:last-child {
  margin-bottom: 0;
}

.detail-head {
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  color: var(--c-muted);
  border-bottom: 1px solid var(--c-line);
  padding-bottom: 4px;
  margin-bottom: 7px;
}

.attire-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 6px;
}

.attire-item {
  border: 1px solid var(--c-line);
  padding: 5px 7px;
  font-size: 0.8rem;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.attire-slot {
  font-size: 0.68rem;
  color: var(--c-muted);
  letter-spacing: 0.1em;
}

.bond-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 6px;
}

.bond-item {
  border: 1px solid var(--c-line);
  padding: 5px 7px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 0.8rem;
  transition: border-color 0.3s ease;
}

.bond-item.bound {
  border-color: var(--c-primary);
}

.bond-slot {
  font-size: 0.68rem;
  color: var(--c-muted);
  letter-spacing: 0.1em;
}

.bond-item.bound .bond-text {
  color: var(--c-primary);
  font-weight: bold;
}

.expand-enter-active,
.expand-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

@media (max-width: 600px) {
  .attire-grid,
  .bond-grid {
    grid-template-columns: 1fr;
  }
}
</style>

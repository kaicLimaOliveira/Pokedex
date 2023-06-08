<template>
  <div>
    <div v-if="!props.pokemon.stats">Selecione um Pokémon</div>
    <div v-else v-for="(stats, key) in props.pokemon.stats" :key="key">
      <span>{{ stats.stat.name.toUpperCase() }}:</span>
      <div class="progress mb-2">
        <div class="progress-bar" role="progressbar" :style="`width: ${stats.base_stat}%;`"
          :aria-valuenow="stats.base_stat" aria-valuemin="0" aria-valuemax="100">
          {{ stats.base_stat }}
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue"

interface Props {
  pokemon: {
    stats: {
      stat: {
        name: string;
      }
      base_stat: number;
    }[]
  }
}

const props = defineProps<Props>();
</script>
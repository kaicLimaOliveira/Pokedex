<template>
  <div>
    <div v-if="!pokemon.status">Selecione um Pokémon</div>
    <div v-else>
      <span>Força:</span>
      <div class="progress mb-2">
        <div
          class="progress-bar"
          role="progressbar"
          :style="`width: ${pokemon.status.force}%;`"
          :aria-valuenow="pokemon.status.force"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {{ pokemon.status.force }}
        </div>
      </div>

      <span>Agilidade:</span>
      <div class="progress mb-2">
        <div
          class="progress-bar"
          role="progressbar"
          :style="`width: ${pokemon.status.agility}%;`"
          :aria-valuenow="pokemon.status.agility"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {{ pokemon.status.agility }}
        </div>
      </div>

      <span>Ataque</span>
      <div class="progress mb-2">
        <div
          class="progress-bar"
          role="progressbar"
          :style="`width: ${pokemon.status.attack}%;`"
          :aria-valuenow="pokemon.status.attack"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {{ pokemon.status.attack }}
        </div>
      </div>

      <span>Defesa</span>
      <div class="progress mb-2">
        <div
          class="progress-bar"
          role="progressbar"
          :style="`width: ${pokemon.status.defense}%;`"
          :aria-valuenow="pokemon.status.defense"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {{ pokemon.status.defense }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
const props = defineProps({ pokemon: Object });
</script>
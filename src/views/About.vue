<template>
  <div>
    <div v-if="!props.pokemon.id">Selecione um Pokémon</div>
    <div v-else>
      <p>Identificador: {{ props.pokemon.id }}</p>
      <p>Nome: {{ props.pokemon.name }}</p>
      <p v-for="type in props.pokemon.types" :key="type">
        Tipo: {{ type.type.name }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
const props = defineProps({ pokemon: Object });
</script>

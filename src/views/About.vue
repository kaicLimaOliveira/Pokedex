<template>
  <div>
    <div v-if="!props.pokemon.id">Selecione um Pokémon</div>
    <div v-else>
      <p>Identificador: {{ props.pokemon.id }}</p>
      <p>Nome: {{ props.pokemon.name }}</p>
      <p v-for="type, idx in props.pokemon.types" :key="idx">
        Tipo: {{ type.type.name }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

interface Props {
  pokemon: {
    id: string;
    name: string;
    types: Array<{
      type: {
        name: string;
      }
    }>;
  }
}

const props: Props = defineProps({ pokemon: Object });
</script>

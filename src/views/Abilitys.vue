<template>
  <div>
    <div v-if="!props.pokemon.abilities">Selecione um Pokémon</div>
    <div v-else>
      <table class="table text-white">
        <tbody>
          <TransitionGroup name="list">
            <tr v-for="(abilities, i) in abilityOrdered" :key="i">
              <td>{{ abilities.ability.name }}</td>

              <td class="d-flex justify-content-end">
                <button type="button" class="btn btn-danger btn-sm" @click="$emit('removeAbility', i)">
                  x
                </button>
              </td>
            </tr>
          </TransitionGroup>
        </tbody>
      </table>
      <input type="text" class="form-control" placeholder="Adicionar habilidade" v-model="state.ability"
        @keyup.enter="addAbility" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, defineProps, defineEmits, computed } from "vue";

const emit = defineEmits(["addAbility", "removeAbility"]);
const state = reactive({
  ability: ""
});

interface Props {
  pokemon: {
    abilities: {
      ability: {
        name: string
      }
    }[]
  }
}

const props = defineProps<Props>();

function addAbility() {
  emit("addAbility", state.ability);
  state.ability = "";
}

const abilityOrdered = computed(() => {
  const abilitys = props.pokemon.abilities;
  return abilitys.sort();
});
</script>

<style scoped>
.table td {
  border: none;
}
</style>
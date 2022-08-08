<template>
  <div>
    <div v-if="!props.pokemon.abilities">Selecione um Pokémon</div>
    <div v-else>
      <table class="table text-white">
        <tbody>
          <TransitionGroup name="list">
            <tr v-for="(a, i) in abilityOrdered" :key="a">
              <td>{{ a.ability.name }}</td>

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

const state = reactive({ ability: "" });
const emit = defineEmits(["addAbility", "removeAbility"]);
const props = defineProps<{
  pokemon: { abilities: Array<string> };
}>();

function addAbility() {
  emit("addAbility", state.ability);
  state.ability = "";
}

const abilityOrdered = computed((): Array<string> => {
  const abilitys = props.pokemon.abilities;
  return abilitys.sort();
});
</script>

<style scoped>
.table td {
  border: none;
}
</style>
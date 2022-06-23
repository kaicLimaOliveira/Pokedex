<template>
  <div
    v-for="p in props.pokemons"
    :key="p.id"
    :class="`cartao-pokemon bg-${p.type}`"
    @click="analyzePokemon(p)"
  >
    <h1>{{ p.id }} {{ p.name }}</h1>
    <span>{{ p.type }}</span>
    <div class="cartao-pokemon-img">
      <Transition
        appear
        enter-active-class="animate__animated animate__fadeInDown"
      >
        <img :src="require(`@/assets/imgs/pokemons/${p.image}`)" />
      </Transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, defineProps } from "vue";
import { IPokemon, P } from "../interfaces/IPokemon";

const props = defineProps({ pokemons: Array });
const state: IPokemon = reactive({
  display: false,
  displayEvolution: false,
  pokemon: {},
  pokemons: [],
});

function analyzePokemon(p: P): void {
  let changePokemonAnalysis = false;

  if (state.pokemon.id != p.id && state.display) {
    setTimeout(() => {
      analyzePokemon(p);
    }, 1000);

    changePokemonAnalysis = true;
  }

  state.pokemon = p;
  state.display = !state.display;
  state.displayEvolution = !state.displayEvolution;

  if (!state.display && !changePokemonAnalysis) {
    state.pokemon = {};
  }
}
</script>

<style scoped>
@import "~@/assets/css/animation.css";
@import "../../node_modules/animate.css";

.cartao-pokemon {
  position: relative;
  margin: 5px;
  width: 150px;
  height: 115px;
  cursor: pointer;
  border-radius: 5px;
  -webkit-box-shadow: 2px 2px 2px rgba(200, 200, 200, 0.77);
  -moz-box-shadow: 2px 2px 2px rgba(200, 200, 200, 0.77);
  box-shadow: 2px 2px 2px rgba(200, 200, 200, 0.77);
}

.cartao-pokemon h1 {
  color: #fff;
  font-size: 14px;
  margin: 5px 0px 0px 5px;
  padding: 0px;
}

.cartao-pokemon span {
  color: #fff;
  position: absolute;
  background: rgba(255, 255, 255, 0.3);
  font-size: 12px;
  margin: 10px 0px 0px 5px;
  padding: 5px 10px 5px 10px;
  border-radius: 25px;
}

.cartao-pokemon img {
  max-width: 60%;
  max-height: 60%;
  float: right;
}

.bg-grama {
  background-color: #2d8f78;
}

.bg-fogo {
  background-color: #e47373;
}

.bg-agua {
  background-color: #5a9ed2;
}

.bg-inseto {
  background-color: #26d3ab;
}

.bg-normal {
  background-color: #cecece;
}
</style>
<template>
  <div class="container-fluid">
    <div class="row m-3 content-pokedex">
      <!-- início lado esquerdo -->
      <div class="col mb-2">
        <div class="card palco">
          <div class="card-header"></div>

          <div class="card-body bg-pokebola bg-normal">
            <div class="pokemon d-block text-center">
              <Transition
                @after-enter="state.displayEvolution = true"
                @before-leave="state.displayEvolution = false"
                enter-active-class="animate__animated animate__bounceIn"
                leave-active-class="animate__animated animate__bounceOut"
              >
                <img
                  :src="
                    require(`@/assets/imgs/pokemons/${state.pokemon.id
                      .toString()
                      .padStart(3, '0')}.png`)
                  "
                  v-if="state.display"
                />
              </Transition>

              <div class="evolucoes position-absolute">
                <Transition
                  name="fade"
                  v-for="e in state.pokemon.evolution"
                  :key="e"
                >
                  <img
                    :src="
                      require(`@/assets/imgs/pokemons/${e
                        .toString()
                        .padStart(3, '0')}.png`)
                    "
                    v-if="state.displayEvolution"
                    role="button"
                  />
                </Transition>
              </div>
            </div>
          </div>

          <div class="card-footer">
            <nav class="nav nav-pills nav-fill">
              <!-- menu de navegação -->
              <RouterLink
                class="nav-item nav-link text-white"
                :to="{ path: '/sobre' }"
                exact-active-class="active"
              >
                Sobre
              </RouterLink>
              <RouterLink
                class="nav-item nav-link text-white"
                :to="{ path: '/status' }"
                exact-active-class="active"
              >
                Status
              </RouterLink>
              <RouterLink
                class="nav-item nav-link text-white"
                :to="{ path: '/habilidades' }"
                exact-active-class="active"
              >
                Habilidades
              </RouterLink>
            </nav>

            <div class="my-4 mx-4">
              <!-- exibe dados de acordo com o menu de navegação -->
              <RouterView
                v-slot="{ Component }"
                :pokemon="state.pokemon"
                @addAbility="addAbility"
                @removeAbility="removeAbility"
              >
                <Transition
                  enter-active-class="animate__animated animate__zoomInDown"
                >
                  <component :is="Component" />
                </Transition>
              </RouterView>
            </div>
          </div>
        </div>
      </div>
      <!-- fim lado esquerdo -->

      <!-- início lado direito -->
      <div class="col mb-2 pokedex p-3">
        <div class="row">
          <div class="col">
            <h1>Pokédex</h1>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <select class="form-select" v-model="state.ordered">
              <option value="" disabled>Ordernar Pokémon</option>
              <option value="1">Id crescente</option>
              <option value="2">Id decrescrente</option>
              <option value="3">De A - Z</option>
              <option value="4">De Z - A</option>
            </select>
          </div>

          <div class="col">
            <input
              type="text"
              class="form-control"
              placeholder="Pesquisar Pokémon"
              v-model="state.namePokemon"
            />
          </div>
        </div>

        <div class="row mt-5">
          <div
            ref="main"
            class="pokedex-catalogo d-flex flex-wrap justify-content-center"
            @scroll="handleClickPlusPokemons"
          >
            <!-- início listagem dinâmica -->
            <TransitionGroup name="ordered">
              <div
                v-for="pokemon in filterPokemons"
                :key="pokemon.id"
                :class="`card-pokemon position-relative m-1 bg-${pokemon.types[0].type.name}`"
                role="button"
                @click="analyzePokemon(pokemon)"
              >
                <h1 class="p-0 mt-1 ms-1">
                  {{ pokemon.id }} {{ pokemon.name }}
                </h1>
                <span
                  class="py-1 px-2 mt-2 ms-1"
                  v-for="info in pokemon.types"
                  :key="info.slot"
                >
                  {{ info.type.name }}
                </span>

                <div class="card-pokemon-img d-flex justify-content-end">
                  <Transition
                    appear
                    enter-active-class="animate__animated animate__fadeInDown"
                  >
                    <img
                      class="pb-2"
                      :src="
                        require(`@/assets/imgs/pokemons/${pokemon.id
                          .toString()
                          .padStart(3, '0')}.png`)
                      "
                    />
                  </Transition>
                </div>
              </div>
            </TransitionGroup>
            <!-- fim listagem dinâmica -->
          </div>
        </div>
      </div>
      <!-- fim lado direito -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, watch, computed, ref, Ref } from "vue";

interface P {
  id: number;
}

interface Pokemon {
  id: number;
  name: string;
}

interface IPokemon {
  display: boolean;
  displayEvolution: boolean;
  pokemon: {
    id?: number;
    abilities?: Array<object>;
    evolution?: number;
  };
  pokemons: Array<Pokemon>;
  ordered: number;
  namePokemon: string;
  indexInitial: number;
  indexFinal: number;
}

const state: IPokemon = reactive({
  display: false,
  displayEvolution: false,
  pokemon: {},
  pokemons: [],
  ordered: 0,
  namePokemon: "",
  indexInitial: 1,
  indexFinal: 20,
});

const orderBy = watch(
  () => state.ordered,
  (newValue) => {
    if (newValue == 1) {
      state.pokemons.sort((next, current): number => {
        if (current.id < next.id) {
          return 1;
        } else if (current.id > next.id) {
          return -1;
        }

        return 0;
      });
    } else if (newValue == 2) {
      state.pokemons.sort((next, current) => {
        if (current.id < next.id) {
          return -1;
        } else if (current.id > next.id) {
          return 1;
        }

        return 0;
      });
    } else if (newValue == 3) {
      state.pokemons.sort((next, current) => {
        if (current.name < next.name) {
          return 1;
        } else if (current.name > next.name) {
          return -1;
        }

        return 0;
      });
    } else if (newValue == 4) {
      state.pokemons.sort((next, current) => {
        return current.name.localeCompare(next.name);
      });
    }
  }
);

let throttleTimer: boolean;
const throttle = (callback: () => void, time: number) => {
  if (throttleTimer) return
  throttleTimer = true

  setTimeout(() => {
    callback();
    throttleTimer = false

    state.indexInitial = state.indexInitial + 0;
    state.indexFinal = state.indexFinal + 20;
    
  }, time);
}

const main: Ref<any> = ref(null);
const fetchPokemon = async () => {
  try {
    const promises = [];
    const getPokemonUrl = (id: number) =>
      `https://pokeapi.co/api/v2/pokemon/${id}`;

    for (
      state.indexInitial;
      state.indexInitial <= state.indexFinal;
      state.indexInitial++
    ) {
      if (state.indexInitial >= 836) break;

      const response = await fetch(getPokemonUrl(state.indexInitial));
      promises.push(response.json());
    }

    const pokemons = await Promise.all(promises);
    state.pokemons = [...state.pokemons, ...pokemons];
  } catch (e) {
    console.log(e);
  }
};

function handleClickPlusPokemons() {
  const position = main.value.scrollTop;
  const top = main.value.scrollHeight;
  const newValue = top - position;

  if (position > newValue) {
    throttle(fetchPokemon, 800)
  }
}

function analyzePokemon(pokemon: P): void {
  try {
    console.log(state.pokemons);
    
    let changePokemonAnalysis = false;

    if (state.pokemon.id != pokemon.id && state.display) {
      setTimeout(() => {
        analyzePokemon(pokemon);
      }, 1000);

      changePokemonAnalysis = true;
    }

    state.pokemon = pokemon;
    state.display = !state.display;
    state.displayEvolution = !state.displayEvolution;

    if (!state.display && !changePokemonAnalysis) {
      state.pokemon = {};
    }
  } catch (e) {
    console.log(e);
  }
}

function addAbility(ability: string) {
  try {
    const newAbility = {
      ability: {
        name: ability,
      },
    };

    if (state.pokemon.abilities) {
      state.pokemon.abilities.push(newAbility);
    }
  } catch (e) {
    console.log(e);
  }
}

function removeAbility(i: number) {
  try {
    if (state?.pokemon?.abilities?.[i]) {
      state.pokemon.abilities.splice(i, 1);
    }
  } catch (e) {
    console.log(e);
  }
}

const filterPokemons = computed(() => {
  try {
    return state.pokemons.filter((res) => {
      return (
        res.name.toLowerCase().indexOf(state.namePokemon?.toLowerCase()) > -1 ||
        res.id == parseInt(state.namePokemon)
      );
    });
  } catch (e) {
    console.log(e);
  }
});

fetchPokemon();
</script>

<style scoped>
@import "~@/assets/css/animation.css";
@import "../../node_modules/animate.css";

.pokedex {
  background-color: #ffffff;
  -webkit-box-shadow: 2px 2px 10px rgba(200, 200, 200, 0.77);
  -moz-box-shadow: 2px 2px 10px rgba(200, 200, 200, 0.77);
  box-shadow: 2px 2px 10px rgba(200, 200, 200, 0.77);
  border-radius: 10px;
}

.pokedex-catalogo {
  overflow: auto;
  height: 400px;
  width: 98%;
}

.card-pokemon {
  width: 180px;
  height: 165px;
  border-radius: 5px;
  box-shadow: 2px 2px 2px rgba(200, 200, 200, 0.77);
}

.card-pokemon h1 {
  color: #fff;
  font-size: 14px;
}

.card-pokemon span {
  color: #fff;
  background: rgba(255, 255, 255, 0.3);
  font-size: 12px;
  border-radius: 25px;
}

.card-pokemon-img img {
  height: 120px;
  width: 135px;
}

.bg-grass {
  background-color: #2d8f78;
}

.bg-fire {
  background-color: #e47373;
}

.bg-water {
  background-color: #5a9ed2;
}

.bg-bug {
  background-color: #a2b81f;
}

.bg-electric {
  background-color: #d3b530;
}

.bg-steel {
  background-color: #b7c0c4;
}

.bg-ghost,
.bg-poison {
  background-color: #ba6cb2;
}

.bg-ice {
  background-color: #58beec;
}

.bg-rock,
.bg-ground {
  background-color: #c8a98e;
}

.bg-dragon,
.bg-fighting,
.bg-flying {
  background-color: #d8c225;
}

.bg-psychic {
  background-color: #d131c1;
}

.bg-fairy {
  background-color: #de5083;
}

.bg-normal {
  background-color: #cecece;
}

.bg-pokebola {
  background-image: url("~@/assets/imgs/pokebola.png");
  background-repeat: no-repeat;
  background-position: bottom right;
}

.palco {
  color: #fff;
  background-color: #333;
  -webkit-box-shadow: 2px 2px 10px rgba(230, 223, 223, 0.77);
  -moz-box-shadow: 2px 2px 10px rgba(230, 223, 223, 0.77);
  box-shadow: 2px 2px 10px rgba(230, 223, 223, 0.77);
  border-radius: 10px;
}

.pokemon {
  height: 215px;
}

.pokemon img {
  height: 215px;
}

.evolucoes {
  top: 0px;
  right: 0px;
  height: 70px;
}

.evolucoes img {
  max-width: 100%;
  max-height: 100%;
}

@media (max-width: 700px) {
  .content-pokedex {
    display: block;
  }

  .card-pokemon-img img {
    width: 100px;
    height: 100px;
  }

  .card-pokemon {
    width: 130px;
    height: 135px;
  }
}

@media (max-width: 600px) {
  .card-pokemon-img img {
    width: 85px;
    height: 85px;
  }

  .card-pokemon {
    width: 120px;
    height: 120px;
  }
}

@media (max-width: 450px) {
  .card-pokemon-img img {
    width: 85px;
    height: 85px;
  }

  .card-pokemon {
    width: 130px;
    height: 130px;
  }
}
</style>
<template>
  <div class="container">
    <div class="row mt-2">
      <!-- início lado esquerdo -->
      <div class="col mb-2">
        <div class="card palco">
          <div class="card-header"></div>

          <div class="card-body bg-pokebola bg-normal">
            <div class="pokemon">
              <Transition
                @after-enter="state.displayEvolution = true"
                @before-leave="state.displayEvolution = false"
                enter-active-class="animate__animated animate__bounceIn"
                leave-active-class="animate__animated animate__bounceOut"
              >
                <img
                  :src="
                    require(`@/assets/imgs/pokemons/${state.pokemon.image}`)
                  "
                  v-if="state.display"
                />
              </Transition>

              <div class="evolucoes">
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

            <div class="detalhes">
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
      <div class="col mb-2 pokedex">
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

        <!-- <div class="row">
          <div class="pokedex-catalogo"> -->
        <!-- início listagem dinâmica -->
        <!-- <TransitionGroup name="ordered">
              <div
                v-for="p in state.pokemons"
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
            </TransitionGroup> -->
        <!-- fim listagem dinâmica -->
        <!-- </div>
        </div> -->

        <div class="row mt-5">
          <div class="pokedex-catalogo">
            <!-- início listagem dinâmica -->
            <TransitionGroup name="ordered">
              <div
                v-for="pokemon in state.pokemonsPromises"
                :key="pokemon.id"
                :class="`cartao-pokemon bg-${pokemon.types[0].type.name}`"
                @click="analyzePokemon(pokemon)"
              >
                <h1>{{ pokemon.id }} {{ pokemon.name }}</h1>
                <span class="" v-for="info in pokemon.types" :key="info.slot">
                  {{ info.type.name }}
                </span>

                <div class="cartao-pokemon-img">
                  <Transition
                    appear
                    enter-active-class="animate__animated animate__fadeInDown"
                  >
                    <img
                      :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`"
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
import { reactive, watch } from "vue";
import { IPokemon, P } from "../interfaces/IPokemon";

const state: IPokemon = reactive({
  display: false,
  displayEvolution: false,
  pokemon: {},
  pokemons: [],
  ordered: 0,
  namePokemon: "",
  pokemonsPromises: [],
});

watch(
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

// function getPokemons() {
//   fetch("http://localhost:3000/pokemons")
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       state.pokemons = data;
//     });
// }

// getPokemons();

const fetchPokemon = async () => {
  const getPokemonUrl = (id: number) =>
    `https://pokeapi.co/api/v2/pokemon/${id}`;

  const promises = [];

  for (let index = 1; index <= 150; index++) {
    const response = await fetch(getPokemonUrl(index));
    promises.push(response.json());
  }

  state.pokemonsPromises = await Promise.all(promises);
};

fetchPokemon();

function analyzePokemon(pokemon: P): void {
  let changePokemonAnalysis = false;

  if (pokemon.id && state.display) {
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
}

function addAbility(ability: string) {
  if (state.pokemon.abilitys) {
    state.pokemon.abilitys.push(ability);
  }
}

function removeAbility(i: number) {
  if (state?.pokemon?.abilitys?.[i]) {
    state.pokemon.abilitys.splice(i, 1);
  }
}
</script>

<style scoped>
@import "~@/assets/css/animation.css";
@import "../../node_modules/animate.css";

.pokedex {
  padding: 20px;
  background-color: #ffffff;
  -webkit-box-shadow: 2px 2px 10px rgba(200, 200, 200, 0.77);
  -moz-box-shadow: 2px 2px 10px rgba(200, 200, 200, 0.77);
  box-shadow: 2px 2px 10px rgba(200, 200, 200, 0.77);
  border-radius: 10px;
}

.pokedex-catalogo {
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
  height: 400px;
  width: 98%;
  margin-top: 10px;
}

.cartao-pokemon {
  position: relative;
  margin: 5px;
  width: 185px;
  height: 160px;
  cursor: pointer;
  border-radius: 5px;
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
  background: rgba(255, 255, 255, 0.3);
  font-size: 12px;
  margin: 10px 0px 0px 5px;
  padding: 5px 10px 5px 10px;
  border-radius: 25px;
}

.cartao-pokemon-img {
  display: flex;
  justify-content: flex-end;
}

.cartao-pokemon-img img {
  height: 120px;
  width: 120px;
  padding-bottom: 10px;
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
/*  */

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
.bg-fighting {
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
  display: block;
  text-align: center;
  height: 215px;
}

.detalhes {
  margin: 20px 30px 20px 30px;
}

.evolucoes {
  position: absolute;
  top: 0px;
  right: 0px;
  height: 70px;
}

.evolucoes img {
  cursor: pointer;
  max-width: 100%;
  max-height: 100%;
}
</style>
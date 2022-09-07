export interface P {
    id: number;
}

export interface Pokemon {
    id: number;
    name: string;
    types: Array<{
        type: {
            name: string;
        };
        slot: number;
    }>;
}

export interface State {
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
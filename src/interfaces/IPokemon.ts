interface Emp {
    id: number
    name: string
}

interface IPokemon {
    display: boolean;
    displayEvolution: boolean;
    pokemon: {
        id?: number;
        abilitys?: Array<Object>;
    }
    pokemons: Emp[];
    ordered?: number;
    namePokemon?: string;
}

interface P {
    id: number;
}

export { IPokemon, P }
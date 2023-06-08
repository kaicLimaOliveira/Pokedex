interface Pokemon {
  id: number;
  name: string;
  types: {
    type: {
      name: string;
    };
    slot: number;
  }[];
}

export type {
  Pokemon,
}
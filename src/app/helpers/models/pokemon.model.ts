import { POKE_STATE } from "@pokemon/enums";

export interface IPokemon {
    name: string;
    url: string;
    image?: string;
}
export interface IPokemonDetails {
    name: string;
    url: string;
    sprites: ISprit;
    types: IType[],
    abilities: IAbility[];
    stats: IState[];
    height?: number;
    weight?: number;
    hidden?:boolean;
}

interface ISprit {
    back_default: string,
    back_female: string | null,
    back_shiny: string,
    back_shiny_female: string | null,
    front_default: string,
    front_female: string | null,
    front_shiny: string,
    front_shiny_female: string | null
}

interface IType {
    slot: number,
    type: {
        name: string,
        url: string
    }
}

interface IAbility {
    ability: {
        name: string,
        url: string
    },
    is_hidden: true,
    slot: number
}

interface IState {
    base_stat: number,
    effort: number,
    stat: {
        name: POKE_STATE,
        url: string
    }
}
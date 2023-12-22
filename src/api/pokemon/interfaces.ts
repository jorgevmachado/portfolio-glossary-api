// POKEMON BASE
export interface IPokemonBase {
	name: string;
	url: string;
}
export interface IResponsePokemonPaginate<T> {
	count: number;
	next: string | null;
	previous: string | null;
	results: Array<T>;
}
export type IResponsePokemonBase = IPokemonBase;

interface IResponseType {
	slot: number;
	type: IPokemonBase;
}

interface IResponseFrontBack {
	back_gray: string;
	front_gray: string;
	back_shiny: string;
	front_shiny: string;
	back_female: string;
	front_female: string;
	back_default: string;
	front_default: string;
	back_transparent: string;
	front_transparent: string;
	back_shiny_female: string;
	front_shiny_female: string;
	back_shiny_transparent: string;
	front_shiny_transparent: string;
}

// SPECIE
type ILanguage = IPokemonBase;

interface IResponseNames extends Omit<IPokemonBase, 'url'> {
	language: ILanguage;
}

interface IResponseGenera {
	genus: string;
	language: ILanguage;
}

interface IResponseVarieties {
	pokemon: IPokemonBase;
	is_default: boolean;
}

interface IResponseFavorTextEntries {
	version: IPokemonBase;
	language: ILanguage;
	flavor_text: string;
}

interface IResponsePokedexNumbers {
	pokedex: IPokemonBase;
	entry_number: number;
}

interface IResponsePalParkEncounters  {
	rate: number;
	area: IPokemonBase;
	base_score: number;
}

export interface IResponseSpecies {
	id: number;
	url: string;
	name: string;
	order: number;
	shape: IPokemonBase;
	names: Array<IResponseNames>;
	color: IPokemonBase;
	genera: Array<IResponseGenera>;
	is_baby: boolean;
	varieties: Array<IResponseVarieties>;
	generation: IPokemonBase;
	egg_groups: Array<IPokemonBase>;
	is_mythical: boolean;
	gender_rate: number;
	is_legendary: boolean;
	capture_rate: number;
	base_happiness: number;
	evolution_chain: {
		url: string;
	},
	forms_switchable: boolean;
	form_descriptions: [];
	flavor_text_entries: Array<IResponseFavorTextEntries>;
	evolves_from_species?: IPokemonBase;
	habitat: IPokemonBase;
	growth_rate: IPokemonBase;
	hatch_counter: number;
	pokedex_numbers: Array<IResponsePokedexNumbers>;
	pal_park_encounters: Array<IResponsePalParkEncounters>;
	has_gender_differences: boolean;
}

// EVOLUTIONS

interface IResponseEvolutionDetail {
	item?: string;
	gender?: string;
	trigger: IPokemonBase;
	location?: string;
	held_item?: string;
	min_level: number;
	min_beauty?: string;
	party_type?: string;
	known_move?: string;
	time_of_day?: string;
	party_species?: string;
	min_happiness?: string;
	trade_species?: string;
	min_affection?: string;
	known_move_type?: string;
	turn_upside_down?: string;
	needs_overworld_rain?: string;
	relative_physical_stats?: string;
}
interface IResponseEvolvesTo {
	is_baby: boolean;
	species: IPokemonBase;
	evolves_to: Array<IResponseEvolvesTo>;
	evolution_details: Array<IResponseEvolutionDetail>;
}
export interface IResponseEvolution {
	id: number;
	chain: IResponseEvolvesTo;
	baby_trigger_item?: string;
}

// FORM
export interface IResponseForm {
	id: number;
	url: string;
	name: string;
	order: number;
	types: Array<IResponseType>;
	names: Array<string>;
	sprites: Pick<IResponseFrontBack, 'back_shiny' | 'back_female' | 'front_shiny' | 'front_female' | 'back_default' | 'front_default' | 'back_shiny_female' | 'front_shiny_female'>;
	is_mega: boolean;
	pokemon: IPokemonBase;
	form_name: string;
	form_order: number;
	is_default: boolean;
	form_names: Array<string>;
	is_battle_only: boolean;
	version_group: IPokemonBase;
}


// POKEMON COMPLETE
interface IResponseOther {
	home: Pick<IResponseFrontBack, 'front_shiny' | 'front_female' | 'front_default' | 'front_shiny_female'>;
	dream_world: Pick<IResponseFrontBack, 'front_female' | 'front_default'>;
	'official-artwork': Omit<IResponseFrontBack, 'front_shiny' | 'front_default'>;
}

interface IResponseBlackWhite extends Pick<IResponseFrontBack, 'back_shiny' | 'front_shiny' | 'back_female' | 'back_default' | 'front_female' | 'front_default' | 'back_shiny_female' | 'front_shiny_female'> {
	animated: Pick<IResponseFrontBack, 'back_shiny' | 'back_female' | 'front_shiny' | 'front_female' | 'back_default' | 'front_default' | 'back_shiny_female' | 'front_shiny_female'>;
}
interface IResponseSprites extends IResponseFrontBack {
	other: IResponseOther;
	versions: {
		'generation-i': {
			'red-blue': Pick<IResponseFrontBack, 'back_gray' | 'front_gray' | 'back_default' | 'front_default' | 'back_transparent' | 'front_transparent'>;
			yellow: Pick<IResponseFrontBack, 'back_gray' | 'front_gray' | 'back_default' | 'front_default' | 'back_transparent' | 'front_transparent'>;
		},
		'generation-ii': {
			crystal: Pick<IResponseFrontBack, 'back_shiny' | 'front_shiny' | 'back_default' | 'front_default' | 'back_transparent' | 'front_transparent' | 'back_shiny_transparent' | 'front_shiny_transparent'>;
			gold: Pick<IResponseFrontBack, 'back_shiny' | 'front_shiny' | 'back_default' | 'front_default' | 'front_transparent'>;
			silver: Pick<IResponseFrontBack, 'back_shiny' | 'front_shiny' | 'back_default' | 'front_default' | 'front_transparent'>;
		},
		'generation-iii': {
			emerald: Pick<IResponseFrontBack, 'front_shiny' | 'front_default'>;
			'firered-leafgreen': Pick<IResponseFrontBack, 'back_shiny' | 'front_shiny' | 'back_default' | 'front_default'>;
			'ruby-sapphire': Pick<IResponseFrontBack, 'back_shiny' | 'front_shiny' | 'back_default' | 'front_default'>;
		},
		'generation-iv': {
			'diamond-pearl': Pick<IResponseFrontBack, 'back_shiny' | 'front_shiny' | 'back_female' | 'front_female' | 'back_default' | 'front_default' | 'back_shiny_female' | 'front_shiny_female'>;
			'heartgold-soulsilver': Pick<IResponseFrontBack, 'back_shiny' | 'back_female' | 'front_shiny' | 'front_female' | 'back_default' | 'front_default' | 'back_shiny_female' | 'front_shiny_female'>;
			platinum: Pick<IResponseFrontBack, 'back_shiny' | 'front_shiny' | 'back_female' | 'front_female' | 'back_default' | 'front_default' | 'back_shiny_female' | 'front_shiny_female'>;
		},
		'generation-v': {
			'black-white': IResponseBlackWhite;
		},
		'generation-vi': {
			'omegaruby-alphasapphire': Pick<IResponseFrontBack, 'front_shiny' | 'front_female' | 'front_default' | 'back_default' | 'front_shiny_female'>;
			'x-y': Pick<IResponseFrontBack, 'front_shiny' | 'front_female' | 'front_default' | 'front_shiny_female'>;
		},
		'generation-vii': {
			icons: Pick<IResponseFrontBack, 'front_female' | 'front_default'>;
			'ultra-sun-ultra-moon': Pick<IResponseFrontBack, 'front_shiny' | 'front_female' | 'front_default' | 'front_shiny_female'>;
		},
		'generation-viii': {
			icons: Pick<IResponseFrontBack, 'front_female' | 'front_default'>
		}
	}
}

interface IResponseAbility {
	slot: number;
	ability: IPokemonBase,
	is_hidden: boolean;
}

interface IResponseGameIndex {
	version: IPokemonBase;
	game_index: number;
}

interface IResponseVersionGroupDetail {
	version_group: IPokemonBase;
	level_learned_at: number;
	move_learn_method: IPokemonBase;
}
interface IResponseMove {
	move: IPokemonBase;
	version_group_details: Array<IResponseVersionGroupDetail>;
}

interface IResponseStat {
	stat: IPokemonBase;
	effort: number;
	base_stat: number;
}
export interface IResponsePokemon {
	id: number;
	urL: string;
	name: string;
	forms: Array<IPokemonBase>;
	stats: Array<IResponseStat>
	moves: Array<IResponseMove>;
	types: Array<IResponseType>;
	weight: number;
	height: number;
	species: IPokemonBase;
	sprites: IResponseSprites;
	abilities: Array<IResponseAbility>;
	game_indices: Array<IResponseGameIndex>
	base_experience: number;
}

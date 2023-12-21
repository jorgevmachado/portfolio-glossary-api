export interface IResponseStarWarsPaginate<T> {
	count: number;
	next: string | null;
	previous: string | null;
	results: Array<T>;
}

// PLANETS
export interface IResponsePlanet {
	url: string;
	name: string;
	films: Array<string>;
	edited: string;
	climate: string;
	created: string;
	gravity: string;
	diameter: string;
	terrain: string;
	residents: Array<string>;
	population: string;
	surface_water: string;
	orbital_period: string;
	rotation_period: string;
}

// SPECIES
export interface IResponseSpecie {
	url: string;
	name: string;
	films: Array<string>;
	edited: string;
	people: Array<string>;
	created: string;
	language: string;
	homeworld: string;
	eye_colors: string;
	designation: string;
	skin_colors: string;
	hair_colors: string;
	classification: string;
	average_height: string;
	average_lifespan: string;
}


// STARSHIPS
export interface IResponseStarship {
	url: string;
	crew: string;
	MGLT: string;
	name: string;
	model: string;
	films: Array<string>;
	pilots: Array<string>;
	edited: string;
	length: string;
	created: string;
	passengers: string;
	consumables: string;
	manufacturer: string;
	starship_class: string;
	cargo_capacity: string;
	cost_in_credits: string;
	hyperdrive_rating: string;
	max_atmosphering_speed: string;
}

// VEHICLES
export interface IResponseVehicle {
	url: string;
	crew: string;
	name: string;
	model: string;
	films: Array<string>;
	pilots: Array<string>;
	edited: string;
	length: string;
	created: string;
	passengers: string;
	consumables: string;
	manufacturer: string;
	vehicle_class: string;
	cargo_capacity: string;
	cost_in_credits: string;
	max_atmosphering_speed: string;
}

// FILMS
export interface IResponseFilm {
	url: string;
	title: string;
	edited: string;
	species: Array<string>;
	created: string;
	planets: Array<string>;
	producer: string;
	director: string;
	vehicles: Array<string>;
	starships: Array<string>;
	characters: Array<string>;
	episode_id: number;
	release_date: string;
	opening_crawl: string;
}

// PERSON
export interface IResponsePerson {
	url: string;
	mass: string;
	name: string;
	films: Array<string>;
	gender: string;
	edited: string;
	height: string;
	created: string;
	species: Array<string>;
	vehicles: Array<string>;
	eye_color: string;
	homeworld: string;
	starships: Array<string>;
	hair_color: string;
	skin_color: string;
	birth_year: string;
}

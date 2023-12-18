import { PokemonMove } from '../entity/PokemonMove';
import { type IResponseMove } from '../interfaces/pokemon/move';

import PokemonMoveRepository from '../repositories/PokemonMoveRepository';
import PokemonMoveMapper from '../mapper/pokemonMoveMapper';

export default class PokemonMoveService {

    async generatePokemonMove(response: IResponseMove): Promise<PokemonMove | undefined> {
        const repository = new PokemonMoveRepository();
        const newMove = PokemonMoveMapper.responseToInterface(response);
        return await repository.initializeDatabase(newMove);
    }

    async generatePokemonMoves(responseMoves: Array<IResponseMove>): Promise<Array<PokemonMove>> {
        const moves = await Promise.all(
            responseMoves.map(async (move: IResponseMove) => await this.generatePokemonMove(move))
        )
        return moves.filter(moves => moves !== undefined) as Array<PokemonMove>;
    }
}

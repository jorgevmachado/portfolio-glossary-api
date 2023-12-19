import { type IMove, type IResponseMove } from '@interfaces/pokemon/move';
import PokemonMoveRepository from '@repositories/PokemonMoveRepository';
import PokemonMoveMapper from '@mapper/pokemonMoveMapper';
import { BaseService } from '@services/baseService';

import { PokemonMove } from '@entity/PokemonMove';

export class PokemonMoveService extends BaseService<PokemonMove, IMove>{

    constructor() {
        const repository = new PokemonMoveRepository();
        super(repository);
    }
    async generatePokemonMove(response: IResponseMove): Promise<PokemonMove | undefined> {
        const newMove = PokemonMoveMapper.responseToInterface(response);
        return await this.repository.initializeDatabase(newMove);
    }

    async generatePokemonMoves(responseMoves: Array<IResponseMove>): Promise<Array<PokemonMove>> {
        const moves = await Promise.all(
            responseMoves.map(async (move: IResponseMove) => await this.generatePokemonMove(move))
        );
        return moves.filter(moves => moves !== undefined) as Array<PokemonMove>;
    }
}

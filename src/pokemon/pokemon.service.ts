import { MongoServerError } from 'mongodb';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      console.log(error);
      if (error instanceof MongoServerError) {
        if (error.code === 11000) {
          throw new BadRequestException(
            `Pokemon exists in db ${JSON.stringify(error.keyValue)}`,
          );
        }
      }
      throw new InternalServerErrorException('Failed to create pokemon');
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string) {
    let pokemon: Pokemon | null = null;

    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: +term });
    }

    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }

    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase() });
    }

    if (!pokemon) {
      throw new BadRequestException(
        `Pokemon with id, name or no "${term}" not found`,
      );
    }

    return pokemon;
  }

  update(id: string, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon ${updatePokemonDto}`;
  }

  remove(id: string) {
    return `This action removes a #${id} pokemon`;
  }
}

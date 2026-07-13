import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  constructor(
    private readonly pokemonService: PokemonService,
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async executeSeed() {
    const { data } = await this.axios.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );

    await this.pokemonModel.deleteMany({});

    /* await Promise.all(
      data.results.map((element) => {
        const segments = element.url.split('/');
        const no: number = +segments[segments.length - 2];
        return this.pokemonService.create({ name: element.name, no });
      }),
    ); */

    // prefer insertMany instead of Promise.all to avoid multiple connections to the database

    const pokemonToInsert: { name: string; no: number }[] = data.results.map(
      (element) => {
        const segments = element.url.split('/');
        const no: number = +segments[segments.length - 2];
        return { name: element.name, no };
      },
    );

    await this.pokemonModel.insertMany(pokemonToInsert);
  }
}

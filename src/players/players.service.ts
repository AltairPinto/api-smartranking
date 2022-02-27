import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { v4 } from 'uuid';

@Injectable()
export class PlayersService {
  private players: Player[] = [];

  private readonly logger = new Logger(PlayersService.name);

  async createUpdatePlayer(createPlayerDto: CreatePlayerDto): Promise<void> {
    const { email } = createPlayerDto;

    const playerFind = await this.players.find(
      (player: Player) => player.email === email,
    );

    if (playerFind) await this.update(playerFind, createPlayerDto);
    else await this.create(createPlayerDto);
  }

  async getAllPlayers(): Promise<Player[]> {
    return await this.players;
  }

  async getPlayerByEmail(email: string): Promise<Player> {
    const findPlayer = this.players.find(
      (player: Player) => player.email === email,
    );
    if (findPlayer) return findPlayer;
    else throw new NotFoundException(`Player with email ${email} not found`);
  }

  private create(createPlayerDto: CreatePlayerDto): void {
    const { name, phoneNumber, email } = createPlayerDto;

    const player: Player = {
      _id: v4(),
      name,
      phoneNumber,
      email,
      ranking: 'A',
      rankingPosition: 1,
      photoURL: 'www.google.com.br/photo123.jpg',
    };
    this.logger.log(`createPlayerDto: ${JSON.stringify(createPlayerDto)}`);

    this.players.push(player);
  }

  private update(findPlayer: Player, createPlayerDto: CreatePlayerDto): void {
    const { name } = createPlayerDto;

    findPlayer.name = name;
  }
}

import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { v4 } from 'uuid';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PlayersService {
  // private players: Player[] = [];

  constructor(@InjectModel('Player') private playerModel: Model<Player>) {}

  // private readonly logger = new Logger(PlayersService.name);

  async createUpdatePlayer(createPlayerDto: CreatePlayerDto): Promise<void> {
    const { email } = createPlayerDto;

    const findPlayer = await this.playerModel.findOne({ email }).exec();

    if (findPlayer) this.update(findPlayer);
    else this.create(createPlayerDto);
  }

  async getAllPlayers(): Promise<Player[]> {
    return await this.playerModel.find().exec();
  }

  async getPlayerByEmail(email: string): Promise<Player> {
    const findPlayer = await this.playerModel.findOne({ email }).exec();

    if (findPlayer) return findPlayer;
    else throw new NotFoundException(`Player with email ${email} not found`);
  }

  async deleteByEmail(email: string): Promise<any> {
    // const findPlayer = this.players.find(
    //   (player: Player) => player.email === email,
    // );
    // this.players = this.players.filter(
    //   (player: Player) => player.email !== findPlayer.email,
    // );
    return await this.playerModel.remove({ email }).exec();
  }

  private async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const createdPlayer = new this.playerModel(createPlayerDto);
    return await createdPlayer.save();

    // const { name, phoneNumber, email } = createPlayerDto;

    // const player: Player = {
    //   _id: v4(),
    //   name,
    //   phoneNumber,
    //   email,
    //   ranking: 'A',
    //   rankingPosition: 1,
    //   photoURL: 'www.google.com.br/photo123.jpg',
    // };
    // this.logger.log(`createPlayerDto: ${JSON.stringify(createPlayerDto)}`);

    // this.players.push(player);
  }

  private async update(createPlayerDto: CreatePlayerDto): Promise<Player> {
    return await this.playerModel
      .findOneAndUpdate(
        { email: createPlayerDto.email },
        { $set: createPlayerDto },
      )
      .exec();

    // const { name } = createPlayerDto;

    // findPlayer.name = name;
  }
}

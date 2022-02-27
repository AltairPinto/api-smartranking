import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersModule } from './players/players.module';
import 'dotenv/config';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.APP_MONGOOSE, {
      useNewUrlParser: true,
      // useCreateIndex: true,
      useUnifiedTopology: true,
      // useFindAndModify: true,
    }),
    PlayersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

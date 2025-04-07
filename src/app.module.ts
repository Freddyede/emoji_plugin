import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { databaseConfig } from './app.config';
import { IconEntity } from './icon.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ExpressionsService } from './expressions.service';
import { IconRepository } from './emoji.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...databaseConfig, autoLoadEntities: true }),
    TypeOrmModule.forFeature([IconEntity]),
    ClientsModule.register([
      {
        name: 'EMOJI_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3001,
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, ExpressionsService, IconRepository],
})
export class AppModule {}

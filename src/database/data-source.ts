import { Participation } from '../resources/participation/entities/participation.entity';
import { Match } from '../resources/match/entities/match.entity';
import { Player } from '../resources/player/entities/player.entity';
import { Team } from '../resources/team/entities/team.entity';
import { DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [Team, Player, Match, Participation],
  migrations: [__dirname + 'src/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  synchronize: true,
  logging: true,
};

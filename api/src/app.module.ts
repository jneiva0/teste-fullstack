import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Servico } from 'src/servico/servico.entity'
import { User } from 'src/users/user.entity'
import { UsersModule } from 'src/users/users.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { ServicoModule } from './servico/servico.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'api',
      password: '1234',
      database: 'api',
      entities: [User, Servico],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    ServicoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Atendimento } from 'src/atendimento/atendimento.entity'
import { Servico } from 'src/servico/servico.entity'
import { User } from 'src/users/user.entity'
import { UsersModule } from 'src/users/users.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AtendimentoModule } from './atendimento/atendimento.module'
import { AuthModule } from './auth/auth.module'
import { ServicoModule } from './servico/servico.module'

// Informações sensíveis como as da conexão ao banco nunca deveriam ser definidas aqui
// O melhor seria carregar das variaveis de ambiente, provavelmente usando um modulo
// de configuração criado para gerenciar essas informações
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'api',
      password: '1234',
      database: 'api',
      entities: [User, Servico, Atendimento],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    ServicoModule,
    AtendimentoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

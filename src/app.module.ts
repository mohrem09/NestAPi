import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UtilisateurModule } from './utilisateur/utilisateur.module';
import { TweetModule } from './tweet/tweet.module';

@Module({
  imports: [UtilisateurModule, TweetModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

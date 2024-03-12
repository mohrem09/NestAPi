// utilisateur.module.ts

import { Module } from '@nestjs/common';
import { UtilisateurController } from './utilisateur.controller';
import { UtilisateurService } from './utilisateur.service';
import { JwtModule } from '@nestjs/jwt'; // Importez JwtModule

@Module({
  imports: [
    JwtModule.register({
      secret: 'votre_secret', // Remplacez cela par votre propre clé secrète
      signOptions: { expiresIn: '1h' }, // Vous pouvez ajuster la durée de validité du token selon vos besoins
    }),
  ],
  controllers: [UtilisateurController],
  providers: [UtilisateurService]
})
export class UtilisateurModule {}

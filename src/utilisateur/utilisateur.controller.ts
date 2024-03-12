// utilisateur.controller.ts

import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { UtilisateurService } from './utilisateur.service';
import { Utilisateur } from './utilisateur';

@Controller('utilisateurs')
export class UtilisateurController {
  constructor(private readonly utilisateurService: UtilisateurService) { }

  @Post()
  async creerUtilisateur(@Body() body: { nom: string, email: string, motDePasse: string }): Promise<Utilisateur> {
    const { nom, email, motDePasse } = body;
    return this.utilisateurService.creerUtilisateur(nom, email, motDePasse);
  }

  @Get(':id')
  async trouverUtilisateurParId(@Param('id') id: string): Promise<Utilisateur> {
    return this.utilisateurService.trouverUtilisateurParId(Number(id));
  }

  @Post('login') // Ajoutez une route pour le login
  async login(@Body() body: { email: string, motDePasse: string }): Promise<{ access_token: string }> {
    const { email, motDePasse } = body;
    return this.utilisateurService.login(email, motDePasse);
  }
}

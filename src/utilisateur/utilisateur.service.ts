// utilisateur.service.ts

import { Injectable } from '@nestjs/common';
import { Utilisateur } from './utilisateur';
import { JwtService } from '@nestjs/jwt'; // Importez le service de gestion des tokens JWT

@Injectable()
export class UtilisateurService {
  private utilisateurs: Utilisateur[] = []; // Simuler une base de données pour stocker les utilisateurs
  constructor(private readonly jwtService: JwtService) {} // Injectez le service JwtService

  // Méthode pour créer un nouvel utilisateur
  async creerUtilisateur(nom: string, email: string, motDePasse: string): Promise<Utilisateur> {
    const nouvelUtilisateur: Utilisateur = {
      id: this.utilisateurs.length + 1,
      nom,
      email,
      motDePasse,
      dateDeCreation: new Date(),
      dateDeMiseAJour: new Date(),
    };
    this.utilisateurs.push(nouvelUtilisateur);
    return nouvelUtilisateur;
  }

  // Méthode pour trouver un utilisateur par son ID
  async trouverUtilisateurParId(id: number): Promise<Utilisateur> {
    return this.utilisateurs.find(utilisateur => utilisateur.id === id);
  }



  async login(email: string, motDePasse: string): Promise<{ access_token: string }> {
    // Recherche de l'utilisateur dans la base de données simulée
    const utilisateur = this.utilisateurs.find(user => user.email === email && user.motDePasse === motDePasse);
  
    // Vérification si l'utilisateur existe
    if (!utilisateur) {
      // Si l'utilisateur n'est pas trouvé, lancez une erreur
      throw new Error('Adresse email ou mot de passe incorrect.');
    }
  
    // Générez un token JWT si l'utilisateur est trouvé
    const payload = { email: utilisateur.email, sub: utilisateur.id };
    const access_token = this.jwtService.sign(payload);
    return { access_token };
  }

  // Autres méthodes pour la mise à jour et la suppression des utilisateurs peuvent être ajoutées ici
}

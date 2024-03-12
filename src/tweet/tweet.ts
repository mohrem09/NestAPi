export class Tweet {
  id: number;
  contenu: string;
  utilisateurId: number; 
  dateDeCreation: Date;
  dateDeMiseAJour: Date;

  constructor(id: number, contenu: string, utilisateurId: number, dateDeCreation: Date, dateDeMiseAJour: Date) {
    this.id = id;
    this.contenu = contenu;
    this.utilisateurId = utilisateurId;
    this.dateDeCreation = dateDeCreation;
    this.dateDeMiseAJour = dateDeMiseAJour;
  }
}

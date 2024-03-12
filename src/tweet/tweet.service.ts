import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'; // Import JwtService
import { Tweet } from './tweet';

@Injectable()
export class TweetService {
  private tweets: Tweet[] = [];

  constructor(private readonly jwtService: JwtService) {} // Inject JwtService here

  private getUserIdFromToken(token: string): number {
    const decodedToken = this.jwtService.verify(token);
    return decodedToken.sub; // Assuming 'sub' contains the user ID
  }

  async creerTweet(contenu: string, accessToken: string): Promise<Tweet> {
    try {
      const utilisateurId = this.getUserIdFromToken(accessToken);
      const nouveauTweet = new Tweet(
        this.tweets.length + 1,
        contenu,
        utilisateurId,
        new Date(),
        new Date()
      );
      this.tweets.push(nouveauTweet);
      return nouveauTweet;
    } catch (error) {
      console.error('Error creating tweet:', error.message);
      throw new Error('Erreur lors de la création du tweet.');
    }
  }


  async recupererTousLesTweets(): Promise<Tweet[]> {
    return this.tweets;
  }

  async mettreAJourTweet(tweetId: number, nouveauContenu: string): Promise<Tweet | null> {
    const tweetIndex = this.tweets.findIndex(tweet => tweet.id === tweetId);
    if (tweetIndex === -1) {
      return null;
    }

    const tweet = this.tweets[tweetIndex];
    tweet.contenu = nouveauContenu;
    tweet.dateDeMiseAJour = new Date();
    this.tweets[tweetIndex] = tweet;

    return tweet;
  }

  async supprimerTweet(tweetId: number): Promise<boolean> {
    const tweetIndex = this.tweets.findIndex(tweet => tweet.id === tweetId);
    if (tweetIndex === -1) {
      return false;
    }

    this.tweets.splice(tweetIndex, 1);
    return true;
  }
}

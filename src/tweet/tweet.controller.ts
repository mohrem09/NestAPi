// tweet.controller.ts

import { Controller, Post, Body, Get, Headers, Param, Put, Delete } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { Tweet } from './tweet';
import { JwtService } from '@nestjs/jwt';

@Controller('tweets')
export class TweetController {
  constructor(private readonly tweetService: TweetService, private readonly jwtService: JwtService) {}

  @Post()
  async creerTweet(@Body() body: { contenu: string }, @Headers('Authorization') authorization: string): Promise<Tweet> {
    try {
      const accessToken = authorization.split(' ')[1]; // Extracting the token from the Authorization header
      return this.tweetService.creerTweet(body.contenu, accessToken);
    } catch (error) {
      throw new Error('Erreur lors de la création du tweet.');
    }
  }

  

  @Get()
  async recupererTousLesTweets(): Promise<Tweet[]> {
    return this.tweetService.recupererTousLesTweets();
  }

  @Put(':id')
  async mettreAJourTweet(@Param('id') id: string, @Body() body: { contenu: string }): Promise<Tweet | null> {
    const tweetId = parseInt(id, 10);
    const { contenu } = body;
    return this.tweetService.mettreAJourTweet(tweetId, contenu);
  }

  @Delete(':id')
  async supprimerTweet(@Param('id') id: string): Promise<boolean> {
    const tweetId = parseInt(id, 10);
    return this.tweetService.supprimerTweet(tweetId);
  }
}
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'; // Import JwtModule
import { TweetController } from './tweet.controller';
import { TweetService } from './tweet.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'your-secret-key', // Replace 'your-secret-key' with your actual secret key
      signOptions: { expiresIn: '1h' }, // Adjust expiration time as needed
    }),
  ], // Ensure JwtModule is imported with appropriate options
  controllers: [TweetController],
  providers: [TweetService],
})
export class TweetModule {}

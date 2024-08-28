import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [ImageService],
  exports: [ImageService],
})
export class ImageModule {}

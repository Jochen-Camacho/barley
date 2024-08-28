import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ImageService {
  private client: S3Client;
  private bucketName: string;
  private bucketRegion: string;

  constructor(private configService: ConfigService) {
    this.bucketName = this.configService.get('BUCKET_NAME');
    this.bucketRegion = this.configService.get('BUCKET_REGION');
    const accessKey = this.configService.get('ACCESS_KEY');
    const secretAccessKey = this.configService.get('SECRET_ACCESS_KEY');

    if (
      !this.bucketName ||
      !this.bucketRegion ||
      !accessKey ||
      !secretAccessKey
    ) {
      throw new Error('AWS S3 credentials not provided');
    }

    this.client = new S3Client({
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
      },
      region: this.bucketRegion,
    });
  }

  getImage(imageName: string): string {
    return `https://${this.bucketName}.s3.${this.bucketRegion}.amazonaws.com/${imageName}`;
  }

  async putImage(
    buffer: Buffer,
    fileName: string,
    contentType: string,
  ): Promise<string> {
    try {
      const params = {
        Bucket: this.bucketName,
        Key: fileName,
        Body: buffer,
        ContentType: contentType,
      };
      const command = new PutObjectCommand(params);
      await this.client.send(command);
      return this.getImage(fileName);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

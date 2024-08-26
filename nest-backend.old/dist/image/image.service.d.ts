import { ConfigService } from '@nestjs/config';
export declare class ImageService {
    private configService;
    private client;
    private bucketName;
    private bucketRegion;
    constructor(configService: ConfigService);
    getImage(imageName: string): string;
    putImage(buffer: Buffer, fileName: string, contentType: string): unknown;
}

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageService = void 0;
const common_1 = require("@nestjs/common");
const client_s3_1 = require("@aws-sdk/client-s3");
const config_1 = require("@nestjs/config");
let ImageService = class ImageService {
    constructor(configService) {
        this.configService = configService;
        this.bucketName = this.configService.get('BUCKET_NAME');
        this.bucketRegion = this.configService.get('BUCKET_REGION');
        const accessKey = this.configService.get('ACCESS_KEY');
        const secretAccessKey = this.configService.get('SECRET_ACCESS_KEY');
        if (!this.bucketName ||
            !this.bucketRegion ||
            !accessKey ||
            !secretAccessKey) {
            throw new Error('AWS S3 credentials not provided');
        }
        this.client = new client_s3_1.S3Client({
            credentials: {
                accessKeyId: accessKey,
                secretAccessKey: secretAccessKey,
            },
            region: this.bucketRegion,
        });
    }
    getImage(imageName) {
        return `https://${this.bucketName}.s3.${this.bucketRegion}.amazonaws.com/${imageName}`;
    }
    async putImage(buffer, fileName, contentType) {
        try {
            const params = {
                Bucket: this.bucketName,
                Key: fileName,
                Body: buffer,
                ContentType: contentType,
            };
            const command = new client_s3_1.PutObjectCommand(params);
            await this.client.send(command);
            return this.getImage(fileName);
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
};
exports.ImageService = ImageService;
exports.ImageService = ImageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], ImageService);
//# sourceMappingURL=image.service.js.map
import { S3 } from 'aws-sdk';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class FileService {
    async upload(file: Express.Multer.File): Promise<unknown> {
        const { originalname } = file;
        const bucketS3 = process.env.AWS_BUCKET;
        return await this.uploadS3(file.buffer, bucketS3, originalname);
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async uploadS3(file, bucket, name): Promise<unknown> {
        const s3 = this.getS3();
        const params = {
            Bucket: bucket,
            Key: String(name),
            Body: file,
        };
        return new Promise((resolve, reject) => {
            s3.upload(params, (err, data) => {
                if (err) {
                    Logger.error(err);
                    reject(err.message);
                }
                resolve(data);
            });
        });
    }

    getS3() {
        return new S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        });
    }
}

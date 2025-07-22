
import { config } from 'dotenv';
config();

export const appConfig = {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || 'your-jwt-secret',
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    aws: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
        s3BucketName: process.env.S3_BUCKET_NAME,
        cloudfrontDistributionId: process.env.CLOUDFRONT_DISTRIBUTION_ID,
    },
    ollama: {
        apiUrl: process.env.OLLAMA_API_URL,
        model: process.env.TRANSLATION_MODEL,
    },
};

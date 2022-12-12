// External dependencies
import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

// Internal dependencies
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
	const app: INestApplication = await NestFactory.create(AppModule);
	await app.listen(3000);
}
bootstrap();

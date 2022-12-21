// External dependencies
import { NestFactory } from '@nestjs/core';
import { NestApplication } from '@nestjs/core';

// Internal dependencies
import { AppModule } from './app.module';
import { PORT } from './utils/env';

// Add global auth guard
async function bootstrap(): Promise<void> {
	const app: NestApplication = await NestFactory.create(AppModule, {
		cors: true
	});

	await app.listen(PORT);
}
bootstrap();

// External dependencies
import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

// Internal dependencies
import { AppModule } from './app.module';
import { AuthGuard } from './auth/auth.guard';

// Add global auth guard
async function bootstrap(): Promise<void> {
	const app: INestApplication = await NestFactory.create(AppModule, { cors: true });

	app.useGlobalGuards(new AuthGuard());

	await app.listen(3000);
}
bootstrap();

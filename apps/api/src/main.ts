// External dependencies
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

// Internal dependencies
import { AppModule } from './app.module';
import { AuthGuard } from './auth/auth.guard';

// Add global auth guard
async function bootstrap(): Promise<void> {
	const app: NestFastifyApplication = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter(),
		{ cors: true }
	);

	app.useGlobalGuards(new AuthGuard());

	await app.listen(3000);
}
bootstrap();

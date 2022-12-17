import 'tsconfig-paths/register';
import { AppModule } from '$src/app.module';
import { Test, TestingModule } from '@nestjs/testing';
import getAuth0AccessToken from '$src/utils/test/getAuth0AccessToken';

export default async function setupTest(): Promise<void> {
	const moduleFixture: TestingModule = await Test.createTestingModule({
		imports: [AppModule]
	}).compile();

	global.APP = moduleFixture.createNestApplication();
	await global.APP.init();
	global.SERVER = global.APP.getHttpServer();
	global.ACCESS_TOKEN = await getAuth0AccessToken();
}

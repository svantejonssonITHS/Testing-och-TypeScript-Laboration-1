// External dependencies
import 'tsconfig-paths/register';
import { Test, TestingModule } from '@nestjs/testing';

// Internal dependencies
import { AppModule } from '$src/app.module';
import getAuth0AccessToken from '$src/utils/test/getAuth0AccessToken';
import { JEST_TEST_PORT } from '$src/utils/env';

export default async function setupTest(): Promise<void> {
	const moduleFixture: TestingModule = await Test.createTestingModule({
		imports: [AppModule]
	}).compile();

	global.APP = moduleFixture.createNestApplication();
	await global.APP.listen(JEST_TEST_PORT);
	global.SERVER = global.APP.getHttpServer();
	global.ACCESS_TOKEN = await getAuth0AccessToken();
}

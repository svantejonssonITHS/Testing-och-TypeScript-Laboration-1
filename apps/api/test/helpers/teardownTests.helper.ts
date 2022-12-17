export default async function teardownTest(): Promise<void> {
	await global.APP.close();
}

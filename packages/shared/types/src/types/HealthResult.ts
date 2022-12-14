type HealthResult = {
	status: string;
	message: string;
	uptime: number;
	timestamp: number;
	triviaApi: {
		status: string;
		message: string;
	};
};

export default HealthResult;

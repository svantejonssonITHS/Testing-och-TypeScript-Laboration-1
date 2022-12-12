import axios from 'axios';
import { AxiosInstance } from 'axios';

const instance: () => AxiosInstance = () => {
	return axios.create({
		headers: {
			'Content-Type': 'application/json'
		},
		validateStatus: () => true
	});
};

export default instance();

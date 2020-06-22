import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://api-detect-admin.herokuapp.com/'
	// baseURL: 'http://localhost:8000/',
	// baseURL: 'http://ec2-13-126-48-145.ap-south-1.compute.amazonaws.com/'
});

instance.CancelToken = axios.CancelToken;
instance.isCancel = axios.isCancel;

export default instance;

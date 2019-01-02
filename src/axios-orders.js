import axios from 'axios'

const instance = axios.create({
	baseURL: 'https://react-my-burger-bceb5.firebaseio.com/'
})

export default instance
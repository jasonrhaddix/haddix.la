import axios from 'axios'

const medium = axios.create({
	baseURL: 'https://medium.com/@jasonrhaddix/'
})

export default medium

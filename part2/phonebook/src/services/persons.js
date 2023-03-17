import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const exportedObject = {
    getAll: () => axios.get(baseUrl).then(response => response.data),
    create: newObject => axios.post(baseUrl, newObject).then(response => response.data),
    remove: id => axios.delete(`${baseUrl}/${id}`)
}

export default exportedObject
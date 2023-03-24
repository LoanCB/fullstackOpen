import axios from 'axios'

const baseUrl = 'https://fullstackopen-phonebook-yleh.onrender.com/api/persons'

const exportedObject = {
    getAll: () => axios.get(baseUrl).then(response => response.data),
    create: newObject => axios.post(baseUrl, newObject),
    remove: id => axios.delete(`${baseUrl}/${id}`),
    edit: person => axios.put(`${baseUrl}/${person.id}`, person).then(response => response.data)
}

export default exportedObject
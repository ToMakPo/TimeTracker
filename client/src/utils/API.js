import axios from "axios"

const API = {
    getUserCompanies: async userId => (await axios.get('/api/user-companies/' + userId)).data
}

export default API

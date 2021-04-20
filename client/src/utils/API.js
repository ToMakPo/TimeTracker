import axios from "axios"

const API = {
    getUserLogs: async userId => (await axios.get('/api/user-logs/' + userId)).data,
    updateUserLog: async (userId, logId, data) => (await axios.put('/api/user-logs/' + userId), {logId, data}).data,
}

export default API

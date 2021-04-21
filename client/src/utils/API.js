import axios from "axios"

const API = {
    getShiftLogs: async userId => (await axios.get('/api/shift-logs/' + userId)).data,
    addShiftLog: async (userId, data) => (await axios.post('/api/shift-logs/' + userId, {data})).data,
    updateShiftLog: async (userId, logId, data) => (await axios.put('/api/shift-logs/' + userId, {logId, data})).data,
    deleteShiftLog: async (userId, logId) => (await axios.delete('/api/shift-logs/' + userId + '/' + logId)).data,
}

export default API

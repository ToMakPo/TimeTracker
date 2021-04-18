import axios from "axios"

class authAPI {
    axios

    constructor() {
        this.axios = axios.create()
    }

    setHeader(name, value) {
        if (value)
            this.axios.defaults.headers.common[name] = value
        else
            delete this.axios.defaults.headers.common[name]
    }

    register(userData) {
        return this.axios.post("/api/register", userData)
    }

    login(userData) {
        return this.axios.post("/api/login", userData)
    }

    authenticated() {
        return this.axios.post("/api/authenticated")
    }
}

export default new authAPI()
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { StoreProvider } from './utils/store'
import App from './App'

ReactDOM.render(
    <StrictMode>
        <StoreProvider>
            <Router>
                <App />
            </Router>
        </StoreProvider>
    </StrictMode>,
    document.getElementById('root')
)

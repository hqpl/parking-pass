import CarPass from './CarPass';
import './App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <div className="header-content">
                    <img
                        src="/logo-big.png"
                        alt="Logo"
                        className="header-logo"
                    />
                    <h1>Online Parking Card Manager</h1>
                </div>
            </header>
            <CarPass />
        </div>
    );
}


export default App;

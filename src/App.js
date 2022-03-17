import { BrowserRouter } from 'react-router-dom';
import Welcome from './components/Welcome'
import './styles/main.css'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Welcome/>
      </div>
    </BrowserRouter>
  );
}

export default App;

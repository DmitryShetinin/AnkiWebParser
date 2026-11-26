 
import './App.css';
import WordSearch from './pages/WordSearch.tsx'
import { AuthProvider } from './auth/AuthProvider.tsx';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <WordSearch />
      </AuthProvider>
    </div>
  );
}

export default App;

import { useEffect, useState } from 'react';
import type { Videogame } from './types';
import { gameService } from './services/api';

function App() {
  // Stato per contenere la lista dei giochi
  const [games, setGames] = useState<Videogame[]>([]);
  // Stato per i messaggi di errore o caricamento
  const [status, setStatus] = useState<string>("Caricamento...");

  // Stato temporaneo per il form di aggiunta gioco
  const [newGameForm, setNewGameForm] = useState({ title: '', genre: '', year: new Date().getFullYear() });

  // READ - Carica i dati all'avvio
  useEffect(() => {
    loadGames();
  }, []);

  const loadGames = async () => {
    setStatus("Caricamento dati dal backend...");
    try {
      const data = await gameService.getAll();
      setGames(data);
      setStatus(data.length === 0 ? "Nessun gioco trovato. Aggiungine uno!" : "");
    } catch (error) {
      console.error(error);
      setStatus("⚠️ Errore di connessione al backend. Il server è acceso?");
    }
  };

  // CREATE
  const handleCreateGame = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newGameData: Omit<Videogame, 'id'> = {
        ...newGameForm,
        completed: false
      };
      await gameService.create(newGameData);
      // Resetta il form e ricarica la lista
      setNewGameForm({ title: '', genre: '', year: new Date().getFullYear() });
      loadGames();
    } catch (error) {
      alert("Errore durante la creazione del gioco");
    }
  };

  // UPDATE - Cambia stato "Completato"
  const handleToggleComplete = async (game: Videogame) => {
    try {
      // Creiamo una copia del gioco con lo stato invertito
      const updatedGame = { ...game, completed: !game.completed };
      // Mandiamo la PUT al backend
      await gameService.update(updatedGame);
      // Aggiorniamo la lista locale (metodo ottimistico: aggiorniamo senza ricaricare tutto)
      setGames(games.map(g => g.id === game.id ? updatedGame : g));
    } catch (error) {
      alert("Errore durante l'aggiornamento");
    }
  };

  // DELETE
  const handleDelete = async (id: number) => {
    if(!confirm("Sei sicuro di voler eliminare questo gioco?")) return;
    try {
      await gameService.delete(id);
      // Filtriamo via il gioco eliminato dalla lista locale
      setGames(games.filter(g => g.id !== id));
    } catch (error) {
      alert("Errore durante l'eliminazione");
    }
  };


  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif' }}>
      <h1>Gestore Videogiochi</h1>

      {/* Messaggi di stato */}
      {status && <p style={{ color: status.includes('Errore') ? 'red' : 'blue' }}>{status}</p>}

      {/* FORM DI INSERIMENTO */}
      <div style={{ marginBottom: '30px', border: '1px solid #ccc', padding: '20px' }}>
        <h3>Aggiungi Nuovo Gioco</h3>
        <form onSubmit={handleCreateGame} style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text" placeholder="Titolo" required
            value={newGameForm.title}
            onChange={(e) => setNewGameForm({...newGameForm, title: e.target.value})}
          />
          <input
            type="text" placeholder="Genere" required
            value={newGameForm.genre}
            onChange={(e) => setNewGameForm({...newGameForm, genre: e.target.value})}
          />
           <input
            type="number" placeholder="Anno" required style={{width: '80px'}}
            value={newGameForm.year}
            onChange={(e) => setNewGameForm({...newGameForm, year: parseInt(e.target.value)})}
          />
          <button type="submit">Aggiungi</button>
        </form>
      </div>

      {/* LISTA GIOCHI */}
      <div>
        {games.map(game => (
          <div key={game.id} style={{ borderBottom: '1px solid #eee', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: game.completed ? '#e6ffe6' : 'white' }}>
            <div>
                <strong>{game.title}</strong> ({game.year}) - <em>{game.genre}</em>
                <br/>
                Stat: {game.completed ? "✅ Completato" : "❌ Da finire"}
            </div>
            <div>
              <button onClick={() => handleToggleComplete(game)} style={{marginRight: '10px'}}>
                 {game.completed ? "Segna come da finire" : "Segna come completato"}
              </button>
              <button onClick={() => game.id && handleDelete(game.id)} style={{backgroundColor: '#ffcccc'}}>
                Elimina
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
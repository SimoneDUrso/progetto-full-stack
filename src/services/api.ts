import type { Videogame } from "../types";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Funzione helper per gestire le risposte e gli errori HTTP
async function handleResponse(response: Response) {
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Errore API: ${response.status} - ${errorText || response.statusText}`);
    }
    // Se la risposta non ha contenuto (es. dopo una DELETE), non proviamo a fare il parsing JSON
    if (response.status === 204) return null;
    return response.json();
}

export const gameService = {

    // Ottieni tutti i giochi
    getAll: async (): Promise<Videogame[]> => {
        console.log("Chiamata GET a:", BASE_URL);
        const response = await fetch(BASE_URL);
        return handleResponse(response);
    },

    // POST per creare un nuovo gioco
    // Usiamo Omit<Videogame, 'id'> perché quando creiamo non mandiamo l'ID
    create: async (game: Omit<Videogame, 'id'>): Promise<Videogame> => {
        console.log("Chiamata POST per:", game);
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(game)
        });
        return handleResponse(response);
    },

    // Aggiorna un gioco esistente
    update: async (game: Videogame): Promise<Videogame> => {
        if (!game.id) throw new Error("Impossibile aggiornare un gioco senza ID");
        console.log(`Chiamata PUT per ID ${game.id}`);

        const response = await fetch(`${BASE_URL}/${game.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(game)
        });
        return handleResponse(response);
    },

    // DELETE
    delete: async (id: number): Promise<void> => {
        console.log(`Chiamata DELETE per ID ${id}`);
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE'
        });
        return handleResponse(response);
    }
};
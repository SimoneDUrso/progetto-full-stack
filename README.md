# 🎮 Videogame Inventory Manager

Un'applicazione Full Stack per gestire una collezione di videogiochi.
**Stack:** React (Frontend) + Spring Boot (Backend).

---

## 🚀 Obiettivo
Creare un sistema CRUD (Create, Read, Update, Delete) dove il Backend espone delle API REST e il Frontend le consuma per mostrare e modificare i dati in tempo reale.

---

## 🛠️ Backend (Spring Boot) - *Task @Collega*

Il backend deve girare sulla porta **8080**.
Usa **H2 Database** (In-memory) per semplicità.

### 📝 To-Do List
- [ ] **Setup:** Creare progetto Spring Boot (Maven) con dipendenze: `Spring Web`, `Spring Data JPA`, `H2 Database`, `Lombok` (opzionale).
- [ ] **Entity:** Creare la classe `Videogame` con i seguenti campi:
    - `Long id` (Auto-generated)
    - `String title`
    - `String genre`
    - `Integer year`
    - `Boolean completed` (default false)
- [ ] **Repository:** Creare interfaccia `VideogameRepository` (estende `JpaRepository`).
- [ ] **Controller:** Creare `VideogameController` con i seguenti endpoint:
    - `GET /api/games` -> Restituisce tutti i giochi.
    - `POST /api/games` -> Aggiunge un gioco.
    - `PUT /api/games/{id}` -> Aggiorna un gioco esistente.
    - `DELETE /api/games/{id}` -> Cancella un gioco.
- [ ] **⚠️ CORS Configuration:** Abilitare CORS per permettere chiamate da `http://localhost:5173` (o `*` per testare).

---

## 🎨 Frontend (React + Vite) - *Task @Io*

Il frontend deve girare sulla porta **5173** (default Vite).

### 📝 To-Do List
- [ ] **Setup:** Progetto inizializzato con Vite.
- [ ] **Service:** Creare un file (es. `gameService.js`) per gestire le chiamate `fetch` o `axios` verso `http://localhost:8080/api/games`.
- [ ] **Componente `GameList`:**
    - Visualizzare la lista dei giochi (Titolo, Genere, Anno).
    - Mostrare un'icona o badge se il gioco è "Completato".
- [ ] **Componente `GameForm`:**
    - Form per aggiungere un nuovo gioco (Titolo, Genere, Anno).
- [ ] **Azioni:**
    - Tasto **Elimina** su ogni riga (chiama la DELETE).
    - Tasto/Checkbox **Completa** (chiama la PUT per cambiare lo stato `completed`).
- [ ] **Stato:** Usare `useEffect` per caricare i dati all'avvio e aggiornare la UI senza ricaricare la pagina dopo ogni azione.

---

## 🤝 Contratto API (Struttura JSON)

Entrambi dobbiamo rispettare questo formato dati per far comunicare le due parti:

**Oggetto `Videogame` JSON:**
```json
{
  "id": 1,
  "title": "Super Mario Odyssey",
  "genre": "Platform",
  "year": 2017,
  "completed": false
}
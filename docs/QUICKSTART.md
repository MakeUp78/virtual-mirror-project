# Virtual Mirror - Guida Rapida

## 🚀 Come Vedere l'Anteprima della WebApp

### Metodo 1: Script Automatico (Consigliato)

```bash
# Rendi eseguibile lo script
chmod +x start.sh

# Avvia l'applicazione
./start.sh
```

### Metodo 2: Manuale

#### 1. Installa le Dipendenze

```bash
# Dipendenze root
npm install

# Dipendenze backend
cd backend
npm install
cd ..

# Dipendenze frontend
cd frontend
npm install
cd ..
```

#### 2. Configura MongoDB

**Opzione A - MongoDB Locale:**
```bash
# Avvia MongoDB localmente
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB
```

**Opzione B - MongoDB Atlas (Cloud):**
1. Vai su [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea un cluster gratuito
3. Ottieni la stringa di connessione
4. Usala nel file `.env`

#### 3. Configura Variabili d'Ambiente

```bash
# Copia il file di esempio
cd backend
cp .env.example .env

# Modifica il file .env con il tuo editor
# Aggiorna almeno questi valori:
# - MONGODB_URI (se usi MongoDB Atlas)
# - JWT_SECRET (genera una stringa casuale sicura)
```

#### 4. Avvia i Server

**Opzione A - Entrambi insieme:**
```bash
# Dalla directory root
npm run dev
```

**Opzione B - Separatamente:**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend (nuovo terminale)
cd frontend
npm start
```

## 📱 Accedi all'Applicazione

Una volta avviati i server:

- **Frontend (interfaccia utente):** http://localhost:3000
- **Backend API:** http://localhost:5000
- **API Health Check:** http://localhost:5000/health

## 🎯 Prima Esplorazione

1. **Homepage** - Visualizza la landing page
2. **Products** - Esplora il catalogo prodotti
3. **Register** - Crea un nuovo account
4. **Login** - Accedi con il tuo account
5. **Add to Cart** - Aggiungi prodotti al carrello
6. **AR Preview** - Prova la funzionalità AR (richiede camera)
7. **Checkout** - Completa un ordine di test

## 🛠️ Comandi Utili

```bash
# Installa tutte le dipendenze
npm run install:all

# Avvia in sviluppo
npm run dev

# Avvia solo backend
npm run dev:backend

# Avvia solo frontend
npm run dev:frontend

# Build per produzione
npm run build:frontend
npm run build:backend
```

## 🐛 Risoluzione Problemi

### Errore: "Cannot connect to MongoDB"
**Soluzione:**
- Verifica che MongoDB sia in esecuzione
- Controlla la stringa di connessione in `backend/.env`
- Se usi MongoDB Atlas, verifica che l'IP sia autorizzato

### Errore: "Port already in use"
**Soluzione:**
```bash
# Trova e termina il processo sulla porta 5000
lsof -ti:5000 | xargs kill -9

# Trova e termina il processo sulla porta 3000
lsof -ti:3000 | xargs kill -9
```

### Errore: "Module not found"
**Soluzione:**
```bash
# Reinstalla le dipendenze
rm -rf node_modules backend/node_modules frontend/node_modules
npm run install:all
```

### CORS Errors
**Soluzione:**
- Verifica che `FRONTEND_URL` in `backend/.env` sia `http://localhost:3000`
- Riavvia il backend dopo aver modificato `.env`

## 📝 Dati di Test

Per testare l'applicazione, puoi creare prodotti di esempio manualmente o utilizzare l'API:

```bash
# Crea un utente admin tramite API
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

Poi modifica il ruolo dell'utente nel database MongoDB da "user" a "admin" per poter creare prodotti.

## 🔥 Hot Reload

Entrambi i server supportano il hot reload:
- **Backend:** Usa `nodemon` per riavvio automatico
- **Frontend:** React Hot Module Replacement attivo

Modifica i file e vedrai le modifiche in tempo reale! 🎉

## 📚 Documentazione Completa

- [README.md](../README.md) - Panoramica completa
- [DEVELOPMENT.md](./DEVELOPMENT.md) - Guida sviluppo
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Guida deployment
- [API.md](./API.md) - Documentazione API

## 💡 Suggerimenti

1. **Usa MongoDB Atlas** per iniziare velocemente senza installare MongoDB localmente
2. **Apri DevTools** (F12) nel browser per vedere i log di rete e eventuali errori
3. **Controlla i log del terminal** per errori del backend
4. **Usa Postman** o simili per testare le API direttamente

## 🎨 Personalizzazione

Per personalizzare l'applicazione:
- **Colori/Stili:** Modifica i file CSS in `frontend/src/`
- **Porte:** Cambia `PORT` in `backend/.env` e `proxy` in `frontend/package.json`
- **Impostazioni:** Aggiorna le variabili d'ambiente nei file `.env`

---

Buon divertimento con Virtual Mirror! 🚀

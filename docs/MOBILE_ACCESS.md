# 📱 Accesso da Smartphone

## Opzione 1: GitHub Codespaces (Consigliata)

Se stai usando GitHub Codespaces:

1. Avvia i server: `npm run dev`
2. Vai alla tab **PORTS** in basso in VS Code
3. Cerca la porta **3000** (frontend)
4. Clicca sull'icona del globo o "Forward Port" 
5. Copia il link pubblico (es: `https://xxxxx-3000.app.github.dev`)
6. Apri quel link sul tuo smartphone

## Opzione 2: Rete Locale

Se l'app gira sul tuo PC e lo smartphone è sulla stessa rete WiFi:

### 1. Trova l'IP del tuo PC

**Windows:**
```bash
ipconfig
# Cerca "IPv4 Address" (es: 192.168.1.100)
```

**macOS/Linux:**
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
# Oppure
ip addr show | grep "inet " | grep -v 127.0.0.1
```

### 2. Configura il Backend

Modifica `backend/.env`:
```env
FRONTEND_URL=http://TUO_IP:3000
```

Modifica `backend/server.js` - aggiorna CORS:
```javascript
app.use(cors({
  origin: '*',  // Accetta tutte le origini (solo per sviluppo!)
  credentials: true
}));
```

### 3. Accedi dallo Smartphone

Apri sul browser dello smartphone:
- Frontend: `http://TUO_IP:3000` (es: `http://192
.168.1.100:3000`)
- Backend: `http://TUO_IP:5000`

## Opzione 3: Ngrok (Tunnel Pubblico)

Per esporre l'app su internet pubblicamente:

### 1. Installa Ngrok

```bash
# Linux
wget https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-linux-amd64.tgz
sudo tar xvzf ngrok-v3-stable-linux-amd64.tgz -C /usr/local/bin

# macOS
brew install ngrok
```

### 2. Crea Account Gratuito

- Vai su https://ngrok.com
- Registrati (gratis)
- Copia il tuo authtoken

### 3. Configura Ngrok

```bash
ngrok config add-authtoken TUO_TOKEN
```

### 4. Avvia i Server

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

**Terminal 3 - Ngrok (Frontend):**
```bash
ngrok http 3000
```

**Terminal 4 - Ngrok (Backend - opzionale):**
```bash
ngrok http 5000
```

### 5. Ottieni i Link

Ngrok ti darà un URL pubblico tipo:
```
Forwarding: https://abc123.ngrok.io -> http://localhost:3000
```

Apri `https://abc123.ngrok.io` sul tuo smartphone!

Se esponi anche il backend, dovrai aggiornare `frontend/src/services/api.js`:
```javascript
const API_URL = 'https://xyz789.ngrok.io/api';  // URL ngrok del backend
```

## Opzione 4: Script Automatico

Ho creato uno script:

```bash
chmod +x expose.sh
./expose.sh
```

## 🔥 Quick Test (Codespaces)

Se usi Codespaces, è semplicissimo:

1. Esegui: `npm run dev`
2. Clicca sulla notifica "Open in Browser" che appare
3. Oppure vai su PORTS → porta 3000 → clicca sull'icona del globo 🌐
4. Copia l'URL e aprilo sul telefono

## ⚠️ Note di Sicurezza

- **Ngrok gratuito**: I link cambiano ad ogni riavvio
- **Rete locale**: Sicuro solo sulla tua rete WiFi privata
- **CORS aperto**: Usa `origin: '*'` SOLO per sviluppo, mai in produzione!

## 🆘 Problemi?

**"Cannot GET /"** sul telefono:
- Verifica che il server sia avviato
- Controlla che l'IP/URL sia corretto
- Prova ad aggiungere `/` alla fine dell'URL

**Errori CORS:**
- Aggiungi `origin: '*'` nel backend temporaneamente
- Riavvia il server backend dopo le modifiche

**Connessione rifiutata:**
- Verifica che il firewall non blocchi le porte 3000 e 5000
- Assicurati che lo smartphone sia sulla stessa rete WiFi (se usi IP locale)

---

Quale soluzione preferisci provare? 🚀

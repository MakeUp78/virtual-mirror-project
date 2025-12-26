# 👤 Account di Test - Guida Rapida

## 📋 Account Predefiniti

Dopo aver eseguito il seed del database, avrai questi account disponibili:

### 🧑 Account Utente Standard
```
Email: test@example.com
Password: password123
Ruolo: user
```

### 👑 Account Amministratore
```
Email: admin@example.com
Password: admin123
Ruolo: admin
```

## 🚀 Come Configurare gli Account di Test

### Opzione 1: Esegui il Seed Script (Raccomandato)

1. **Assicurati che MongoDB sia in esecuzione**
   ```bash
   # Se usi MongoDB locale, avvialo con:
   mongod
   
   # Oppure usa MongoDB Atlas (cloud) configurando MONGODB_URI nel .env
   ```

2. **Installa le dipendenze del backend** (se non fatto)
   ```bash
   cd backend
   npm install
   cd ..
   ```

3. **Esegui il seed script**
   ```bash
   cd backend
   npm run seed
   ```

4. **Output atteso**:
   ```
   ✅ MongoDB Connected
   🗑️  Clearing existing data...
   ✅ Existing data cleared
   
   👥 Creating test users...
   ✅ Test users created:
      📧 User: test@example.com / password123
      👑 Admin: admin@example.com / admin123
   
   📦 Creating test products...
   ✅ 6 products created
   
   🎉 Database seeded successfully!
   ```

### Opzione 2: Registrazione Manuale

Se preferisci, puoi registrare un nuovo account direttamente dall'app:

1. Avvia l'applicazione (`npm run dev`)
2. Vai alla pagina di registrazione
3. Compila il form con:
   - Nome
   - Email
   - Password (minimo 6 caratteri)
4. Clicca "Registrati"

## 🛍️ Prodotti di Test Inclusi

Il seed script crea automaticamente 6 prodotti:

1. **Hydrating Face Patch** - €29.99
   - Patch idratante per viso
   - 3 colori, 3 taglie
   
2. **Anti-Wrinkle Forehead Strip** - €24.99
   - Striscia anti-rughe per fronte
   - 2 colori, 2 taglie

3. **Eye Contour Patches** - €34.99
   - Set di 2 patch per contorno occhi
   - 2 colori, 1 taglia

4. **Full Face Sleeping Mask** - €49.99
   - Maschera full-face notturna
   - 2 colori, 3 taglie

5. **Neck & Chest Patch** - €39.99
   - Patch per collo e décolleté
   - 2 colori, 1 taglia

6. **Smile Line Smoothing Strips** - €27.99
   - Strisce per linee del sorriso
   - 1 colore, 2 taglie

## 🔧 Configurazione MongoDB

### MongoDB Locale (Default)

Il file `.env` di default usa MongoDB locale:
```env
MONGODB_URI=mongodb://localhost:27017/virtual-mirror
```

### MongoDB Atlas (Cloud - Raccomandato per Mobile)

Se hai problemi con MongoDB locale o vuoi accesso da smartphone:

1. Crea un account gratuito su [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea un cluster gratuito
3. Ottieni la connection string
4. Aggiorna `.env`:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/virtual-mirror?retryWrites=true&w=majority
   ```

## ✅ Verifica Setup

Dopo il seed, verifica che tutto funzioni:

1. **Avvia i server**:
   ```bash
   npm run dev
   ```

2. **Testa il login**:
   - Vai su `http://localhost:3000/login`
   - Inserisci `test@example.com` / `password123`
   - Dovresti essere reindirizzato alla home

3. **Verifica i prodotti**:
   - Vai su `http://localhost:3000/products`
   - Dovresti vedere 6 prodotti

4. **Testa il carrello**:
   - Aggiungi un prodotto al carrello
   - Vai su `http://localhost:3000/cart`
   - Verifica che il prodotto sia presente

## 🐛 Risoluzione Problemi

### Errore: "MongoDB connection error"
- Assicurati che MongoDB sia in esecuzione
- Verifica la connection string nel `.env`
- Prova a usare MongoDB Atlas invece di locale

### Errore: "Cannot find module"
```bash
cd backend
npm install
```

### Il seed non crea gli account
- Verifica che il server NON sia in esecuzione
- Esegui `npm run seed` dalla directory `backend/`
- Controlla l'output per eventuali errori

### Password non funziona
- Le password sono sensibili alle maiuscole
- Usa esattamente: `password123` o `admin123`
- Se hai cambiato la password, resetta il database con `npm run seed`

## 📱 Accesso da Smartphone

Una volta configurato l'account, segui le istruzioni in [MOBILE_ACCESS.md](MOBILE_ACCESS.md) per accedere dall'app da smartphone.

## 🔐 Sicurezza

**⚠️ IMPORTANTE**: Gli account di test sono solo per sviluppo locale!

- Non usare queste credenziali in produzione
- Cambia le password prima del deploy
- In produzione, disabilita il seed script
- Usa variabili d'ambiente sicure per JWT_SECRET

## 💡 Prossimi Passi

1. ✅ Configura MongoDB
2. ✅ Esegui `npm run seed`
3. ✅ Avvia l'app con `npm run dev`
4. ✅ Fai login con `test@example.com`
5. ✅ Prova ad aggiungere prodotti al carrello
6. ✅ Testa la funzionalità AR (da smartphone)
7. ✅ Completa un ordine di test

## 🎯 Test Completo del Workflow

Per testare l'intera applicazione:

1. **Login**: `test@example.com` / `password123`
2. **Naviga** i prodotti
3. **Seleziona** colore e taglia
4. **Prova** l'AR preview (da smartphone)
5. **Aggiungi** al carrello
6. **Vai** al checkout
7. **Completa** l'ordine
8. **Visualizza** gli ordini nel profilo

---

**Hai bisogno di aiuto?** Controlla la documentazione completa in `/docs/` o consulta il README.md principale.

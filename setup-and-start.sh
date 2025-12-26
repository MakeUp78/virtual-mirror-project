#!/bin/bash

echo "🚀 Virtual Mirror - Setup e Avvio"
echo "=================================="
echo ""

# Step 1: Installa dipendenze root
echo "📦 Step 1/4: Installazione dipendenze root..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ Errore nell'installazione delle dipendenze root"
    exit 1
fi
echo "✅ Dipendenze root installate"
echo ""

# Step 2: Installa dipendenze backend
echo "📦 Step 2/4: Installazione dipendenze backend..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Errore nell'installazione delle dipendenze backend"
    exit 1
fi
cd ..
echo "✅ Dipendenze backend installate"
echo ""

# Step 3: Installa dipendenze frontend
echo "📦 Step 3/4: Installazione dipendenze frontend..."
cd frontend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Errore nell'installazione delle dipendenze frontend"
    exit 1
fi
cd ..
echo "✅ Dipendenze frontend installate"
echo ""

# Step 4: Crea file .env se non esiste
echo "⚙️  Step 4/4: Configurazione ambiente..."
if [ ! -f "backend/.env" ]; then
    cp backend/.env.example backend/.env
    echo "✅ File .env creato"
else
    echo "✅ File .env già esistente"
fi
echo ""

echo "✅ Setup completato con successo!"
echo ""
echo "🌐 Ora avvio i server..."
echo "   Backend: http://localhost:5000"
echo "   Frontend: http://localhost:3000"
echo ""
echo "⚠️  Premi CTRL+C per fermare i server"
echo ""

# Avvia entrambi i server
npm run dev

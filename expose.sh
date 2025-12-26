#!/bin/bash

echo "🌐 Setting up public access to Virtual Mirror..."
echo ""

# Check if ngrok is installed
if ! command -v ngrok &> /dev/null; then
    echo "📦 Installing ngrok..."
    
    # Download ngrok
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        wget https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-linux-amd64.tgz
        tar xvzf ngrok-v3-stable-linux-amd64.tgz -C /usr/local/bin
        rm ngrok-v3-stable-linux-amd64.tgz
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        brew install ngrok/ngrok/ngrok
    fi
fi

echo ""
echo "⚠️  IMPORTANT: You need to sign up for ngrok (free) at https://ngrok.com"
echo "    Then run: ngrok config add-authtoken YOUR_TOKEN"
echo ""
echo "🚀 Starting ngrok tunnel on port 3000..."
echo ""

# Start ngrok
ngrok http 3000

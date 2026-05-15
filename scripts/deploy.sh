#!/usr/bin/env bash
set -e

echo "=== Installing dependencies ==="
pnpm install

echo "=== Building API server ==="
cd artifacts/api-server
node build.mjs
cd ../..

echo "=== Building mockup-sandbox ==="
cd artifacts/mockup-sandbox
npx vite build
cd ../..

echo "=== Build complete ==="

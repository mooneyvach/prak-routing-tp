// Import modul http dari Node.js
import * as http from 'http';

const PORT = 3000;
const products = [
  { id: 1, name: 'Laptop' },
  { id: 2, name: 'Mouse' }
];

const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

// --- LATIHAN 3: MIDDLEWARE SEDERHANA ---
// Fungsi yang menghitung lama eksekusi setiap request
function logDuration(method: string, url: string, startTime: number): void {
  const duration = Date.now() - startTime;
  console.log(`[${new Date().toLocaleTimeString()}] ${method} ${url} - selesai dalam ${duration}ms`);
}

// Buat server HTTP
const server = http.createServer((req, res) => {
  // Catat waktu mulai request (untuk hitung durasi - Latihan 3)
  const startTime = Date.now();
  const url = req.url || '/';
  const method = req.method || 'GET';

  console.log(`[${new Date().toLocaleTimeString()}] ${method} ${url}`);

  // --- LATIHAN 2: Parsing parameter dinamis ---
  const urlParts = url.split('/');

  // --- ROUTING MANUAL DENGAN PERCABANGAN ---
  // Rute: GET /
  if (url === '/' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>🏠 Halaman Utama</h1><p>Selamat datang di server Node.js + TypeScript!</p>');
  }

  // Rute: GET /about
  else if (url === '/about' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>📄 Tentang Kami</h1><p>Ini adalah contoh routing manual sederhana.</p>');
  }

  // Rute: GET /api/users (mengembalikan data JSON)
  else if (url === '/api/users' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' }
    ]));
  }

  // Rute: POST /api/users (simulasi tambah user)
  else if (url === '/api/users' && method === 'POST') {
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'User berhasil dibuat (contoh)' }));
  }

  // --- LATIHAN 1: GET /products → kembalikan daftar produk JSON ---
  else if (url === '/products' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(products));
  }

  // --- LATIHAN 1: POST /products → simulasi tambah produk ---
  else if (url === '/products' && method === 'POST') {
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Produk berhasil dibuat (contoh)' }));
  }

  // --- LATIHAN 2: GET /users/:id → tampilkan user berdasarkan ID ---
  else if (urlParts[1] === 'users' && urlParts[2] && method === 'GET') {
    const id = parseInt(urlParts[2]);
    const user = users.find(u => u.id === id);

    if (user) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: `User dengan id ${id} tidak ditemukan` }));
    }
  }

  // --- LATIHAN 2: GET /products/:id → tampilkan produk berdasarkan ID ---
  else if (urlParts[1] === 'products' && urlParts[2] && method === 'GET') {
    const id = parseInt(urlParts[2]);
    const product = products.find(p => p.id === id);

    if (product) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(product));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: `Produk dengan id ${id} tidak ditemukan` }));
    }
  }

  // Jika tidak ada rute yang cocok → 404 Not Found
  else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>❌ 404 - Halaman Tidak Ditemukan</h1>');
  }

  // --- LATIHAN 3: Catat durasi eksekusi setiap request ---
  logDuration(method, url, startTime);
});

server.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
# 🌡️ Sistem Monitoring Suhu & Kelembapan Gudang

Aplikasi monitoring suhu dan kelembapan real-time menggunakan ESP32 + DHT11 sensor dengan dashboard web berbasis Laravel dan React.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Laravel](https://img.shields.io/badge/Laravel-11.x-red.svg)
![React](https://img.shields.io/badge/React-18.x-blue.svg)
![ESP32](https://img.shields.io/badge/ESP32-Arduino-green.svg)

## 📋 Daftar Isi

- [Fitur](#-fitur)
- [Teknologi](#-teknologi)
- [Prasyarat](#-prasyarat)
- [Instalasi](#-instalasi)
- [Konfigurasi](#-konfigurasi)
- [Setup ESP32](#-setup-esp32)
- [Penggunaan](#-penggunaan)
- [API Endpoints](#-api-endpoints)
- [Screenshot](#-screenshot)
- [Troubleshooting](#-troubleshooting)
- [Kontribusi](#-kontribusi)
- [Lisensi](#-lisensi)

## ✨ Fitur

### Dashboard Web
- 📊 **Real-time Monitoring** - Data update otomatis setiap 5 detik
- 📈 **Grafik Interaktif** - Visualisasi data suhu dan kelembapan
- 📅 **Rekap Data** - Filter berdasarkan tanggal dengan statistik lengkap
- 🎨 **Status Dinamis** - Indikator visual (Normal 🟢 / Waspada 🟡 / Tinggi 🔴)
- 🔐 **Authentication** - Sistem login untuk keamanan
- 📱 **Responsive Design** - Tampilan optimal di semua perangkat

### ESP32 + Sensor
- 🌡️ **Sensor DHT11** - Pembacaan suhu dan kelembapan
- 📡 **WiFi Connectivity** - Kirim data via HTTP POST
- ⏱️ **Interval Configurable** - Atur interval pengiriman data
- 🔄 **Auto Reconnect** - Reconnect otomatis jika WiFi terputus
- 📝 **Serial Logging** - Debug via Serial Monitor

## 🛠️ Teknologi

### Backend
- **Laravel 11.x** - PHP Framework
- **MySQL** - Database
- **Inertia.js** - Modern monolith architecture
- **Laravel Fortify** - Authentication

### Frontend
- **React 18.x** - UI Library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS
- **Chart.js** - Data visualization
- **Vite** - Build tool

### Hardware
- **ESP32** - Microcontroller
- **DHT11** - Temperature & Humidity Sensor
- **Arduino IDE** - Development environment

## 📦 Prasyarat

### Software
- PHP >= 8.2
- Composer
- Node.js >= 18.x
- MySQL >= 8.0
- Arduino IDE >= 2.x

### Hardware
- ESP32 Development Board
- DHT11 Temperature & Humidity Sensor
- Kabel jumper
- Breadboard (opsional)

## 🚀 Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/username/monitoring-suhu.git
cd monitoring-suhu
```

### 2. Install Dependencies

```bash
# Install PHP dependencies
composer install

# Install Node.js dependencies
npm install
```

### 3. Setup Environment

```bash
# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate
```

### 4. Konfigurasi Database

Edit file `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=monitoring
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

Buat database:

```bash
mysql -u root -p
CREATE DATABASE monitoring;
exit;
```

### 5. Migrasi Database

```bash
php artisan migrate --seed
```

### 6. Build Frontend Assets

```bash
npm run build
```

## ⚙️ Konfigurasi

### Timezone

Aplikasi menggunakan timezone WITA (Asia/Makassar). Untuk mengubah, edit `config/app.php`:

```php
'timezone' => 'Asia/Makassar', // WITA (UTC+8)
```

Timezone lain:
- `Asia/Jakarta` - WIB (UTC+7)
- `Asia/Jayapura` - WIT (UTC+9)

### API Key

Generate API key untuk ESP32 di `.env`:

```env
SENSOR_API_KEY=your_secure_api_key_here
```

### Threshold Status

Edit threshold di `app/Models/SensorReading.php`:

```php
public static function calculateStatus(float $temperature, float $humidity): string
{
    if ($temperature > 35 || $humidity > 80) {
        return 'tinggi';    // 🔴 Tinggi
    }
    if ($temperature > 28 || $humidity > 60) {
        return 'waspada';   // 🟡 Waspada
    }
    return 'normal';        // 🟢 Normal
}
```

## 🔌 Setup ESP32

### Struktur File

File ESP32 berada di folder `ESP32_CODE/`:
```
ESP32_CODE/
└── ESP32_CODE.ino
```

**Catatan:** Arduino IDE memerlukan file `.ino` berada di dalam folder dengan nama yang sama.

### 1. Install Arduino IDE

Download dari: https://www.arduino.cc/en/software

### 2. Install ESP32 Board Support

1. Buka **File → Preferences**
2. Tambahkan URL di "Additional Board Manager URLs":
   ```
   https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json
   ```
3. **Tools → Board → Boards Manager**
4. Cari "esp32" dan install

### 3. Install Library

**Sketch → Include Library → Manage Libraries**, install:
- DHT sensor library by Adafruit
- Adafruit Unified Sensor
- ArduinoJson by Benoit Blanchon

### 4. Wiring DHT11

```
DHT11 Sensor → ESP32
─────────────────────
VCC (Pin 1)  → 3.3V atau 5V
DATA (Pin 2) → GPIO 4
GND (Pin 4)  → GND
```

**Catatan:** Jika menggunakan modul DHT11 (3 pin), resistor pull-up tidak diperlukan.

### 5. Konfigurasi ESP32_CODE.ino

Buka file `ESP32_CODE/ESP32_CODE.ino` di Arduino IDE, lalu edit:

```cpp
// WiFi Configuration
const char* WIFI_SSID = "Your_WiFi_SSID";
const char* WIFI_PASSWORD = "Your_WiFi_Password";

// Server Configuration
const char* SERVER_URL = "http://YOUR_SERVER_IP:8000/api/sensor";
const char* API_KEY = "your_api_key_from_env";

// Sensor Configuration
#define DHTPIN 4        // GPIO 4
#define DHTTYPE DHT11   // DHT11 or DHT22

// Interval (milliseconds)
const unsigned long SEND_INTERVAL = 5000; // 5 seconds
```

### 6. Upload ke ESP32

1. **Tools → Board** → ESP32 Dev Module
2. **Tools → Port** → Pilih port COM ESP32
3. Klik **Upload**
4. Buka **Serial Monitor** (115200 baud)

## 🎮 Penggunaan

### Jalankan Server untuk ESP32

```bash
php artisan serve --host=0.0.0.0 --port=8000
```

Atau gunakan Laravel Valet:

```bash
valet link monitoring-suhu
```

### Jalankan Development Server

```bash
# Terminal 1: Laravel server
php artisan serve

# Terminal 2: Vite dev server
npm run dev
```

### Akses Aplikasi

- **Dashboard**: http://localhost:8000/dashboard
- **Grafik**: http://localhost:8000/chart
- **Rekap**: http://localhost:8000/recap

### Login Credentials

```
Email    : admin@gudang.com
Password : password123
```

**⚠️ Penting:** Ubah password default untuk production!

## 📡 API Endpoints

### POST /api/sensor

Kirim data dari ESP32.

**Request:**
```json
{
  "temperature": 28.5,
  "humidity": 65.0,
  "api_key": "your_api_key"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Data berhasil disimpan",
  "id": 1
}
```

### GET /api/sensor/latest

Ambil data terbaru.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "temperature": "28.50",
    "humidity": "65.00",
    "status": "waspada",
    "recorded_at": "01-06-2026 13:54:50"
  }
}
```

### GET /api/sensor/history?limit=50

Ambil history data.

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "temperature": 28.50,
      "humidity": 65.00,
      "time": "13:54:50",
      "recorded_at": "01-06-2026 13:54:50"
    }
  ]
}
```

## 📸 Screenshot

### Dashboard
![Dashboard](docs/screenshots/dashboard.png)

### Grafik Real-time
![Chart](docs/screenshots/chart.png)

### Rekap Data
![Recap](docs/screenshots/recap.png)

## 🐛 Troubleshooting

### ESP32 tidak mengirim data

**Cek Serial Monitor:**
```
Tools → Serial Monitor (115200 baud)
```

**Error: "WiFi tidak terhubung"**
- Cek SSID dan password
- Pastikan WiFi 2.4GHz (ESP32 tidak support 5GHz)

**Error: "Connection refused"**
- Pastikan server berjalan di port 8000
- Cek firewall tidak memblokir

**Error: "Response Code: 401"**
- API Key tidak cocok dengan `.env`

**Error: "Gagal membaca sensor DHT11"**
- Cek wiring sensor
- Pastikan sensor terpasang dengan benar

### Dashboard tidak update

**Cek browser console:**
```
F12 → Console
```

**Clear cache:**
```bash
php artisan cache:clear
php artisan view:clear
php artisan config:clear
```

### Database error

**Reset database:**
```bash
php artisan migrate:fresh --seed
```

## 🤝 Kontribusi

Kontribusi sangat diterima! Silakan:

1. Fork repository
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 Lisensi

Distributed under the MIT License. See `LICENSE` for more information.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments

- [Laravel](https://laravel.com)
- [React](https://reactjs.org)
- [Inertia.js](https://inertiajs.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Chart.js](https://www.chartjs.org)
- [ESP32 Arduino Core](https://github.com/espressif/arduino-esp32)
- [Adafruit DHT Library](https://github.com/adafruit/DHT-sensor-library)

---

⭐ Jika project ini membantu, berikan star di GitHub!

**Made with ❤️ for IoT Monitoring**

/*
 * APLIKASI MONITORING SUHU & KELEMBAPAN GUDANG
 * ESP32 + DHT11 Sensor
 * 
 * LIBRARY YANG DIPERLUKAN:
 * 1. DHT sensor library by Adafruit
 * 2. Adafruit Unified Sensor (dependensi wajib DHT)
 * 3. ArduinoJson by Benoit Blanchon versi 6.x
 * 4. WiFi.h dan HTTPClient.h (sudah bawaan ESP32)
 * 
 * CARA INSTALL LIBRARY:
 * - Buka Arduino IDE
 * - Sketch -> Include Library -> Manage Libraries
 * - Cari dan install library di atas
 */

#include <WiFi.h>
#include <HTTPClient.h>
#include <DHT.h>
#include <ArduinoJson.h>

// ============================================
// KONFIGURASI - EDIT BAGIAN INI
// ============================================

// Konfigurasi DHT11
#define DHTPIN 4              // Pin GPIO untuk DHT11 (default: GPIO 4)
#define DHTTYPE DHT11         // Tipe sensor: DHT11 (ganti ke DHT22 jika menggunakan DHT22)

// Konfigurasi WiFi
const char* WIFI_SSID = "ROFA_XT";           // Ganti dengan SSID WiFi Anda
const char* WIFI_PASSWORD = "*<Rofa130618>*";   // Ganti dengan password WiFi Anda

// Konfigurasi Server
// PENTING: Jalankan server dengan: bash start-server-for-esp32.sh
// Server akan berjalan di: http://192.168.90.31:8000
const char* SERVER_URL = "http://192.168.90.31:8000/api/sensor";  // IP:8000 untuk php artisan serve
const char* API_KEY = "sk_sensor_monitoring_gudang_2026_secure_key_32chars_min";  // Harus sama dengan SENSOR_API_KEY di .env

// Interval pengiriman data (dalam milidetik)
const unsigned long SEND_INTERVAL = 5000;  // 5 detik

// ============================================
// JANGAN EDIT DI BAWAH INI
// ============================================

DHT dht(DHTPIN, DHTTYPE);
unsigned long previousMillis = 0;

void setup() {
  // Inisialisasi Serial Monitor
  Serial.begin(115200);
  delay(1000);
  
  Serial.println("\n========================================");
  Serial.println("ESP32 Monitoring Suhu & Kelembapan");
  Serial.println("Sensor: DHT11");
  Serial.println("========================================\n");
  
  // Inisialisasi DHT11
  dht.begin();
  Serial.println("[OK] DHT11 sensor initialized");
  
  // Koneksi ke WiFi
  connectWiFi();
}

void loop() {
  unsigned long currentMillis = millis();
  
  // Cek apakah sudah waktunya membaca dan mengirim data (non-blocking)
  if (currentMillis - previousMillis >= SEND_INTERVAL) {
    previousMillis = currentMillis;
    
    // Baca data dari sensor
    float temperature = dht.readTemperature();
    float humidity = dht.readHumidity();
    
    // Validasi hasil pembacaan dengan isnan()
    if (isnan(temperature) || isnan(humidity)) {
      Serial.println("[ERROR] Gagal membaca sensor DHT11!");
      Serial.println("Cek wiring dan pastikan sensor terpasang dengan benar\n");
      return;
    }
    
    // Tampilkan data di Serial Monitor
    Serial.println("─────────────────────────────────────");
    Serial.print("[DATA] Suhu: ");
    Serial.print(temperature, 2);
    Serial.println(" °C");
    Serial.print("[DATA] Kelembapan: ");
    Serial.print(humidity, 2);
    Serial.println(" %");
    
    // Kirim data ke server
    sendDataToServer(temperature, humidity);
  }
}

void connectWiFi() {
  Serial.print("[WIFI] Menghubungkan ke WiFi");
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  
  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 30) {
    delay(500);
    Serial.print(".");
    attempts++;
  }
  
  Serial.println();
  
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("[OK] WiFi terhubung!");
    Serial.print("[INFO] IP Address: ");
    Serial.println(WiFi.localIP());
    Serial.print("[INFO] Signal Strength: ");
    Serial.print(WiFi.RSSI());
    Serial.println(" dBm\n");
  } else {
    Serial.println("[ERROR] Gagal terhubung ke WiFi!");
    Serial.println("Cek SSID dan password, lalu restart ESP32\n");
  }
}

void sendDataToServer(float temperature, float humidity) {
  // Cek koneksi WiFi
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("[ERROR] WiFi tidak terhubung, mencoba reconnect...");
    connectWiFi();
    return;
  }
  
  HTTPClient http;
  
  // Mulai koneksi HTTP
  http.begin(SERVER_URL);
  http.addHeader("Content-Type", "application/json");
  http.setTimeout(10000);  // Timeout 10 detik
  
  // Buat JSON payload menggunakan ArduinoJson
  StaticJsonDocument<256> doc;
  doc["temperature"] = temperature;
  doc["humidity"] = humidity;
  doc["api_key"] = API_KEY;
  
  String jsonPayload;
  serializeJson(doc, jsonPayload);
  
  Serial.println("[SEND] Mengirim data ke server...");
  Serial.print("       URL: ");
  Serial.println(SERVER_URL);
  Serial.print("       Payload: ");
  Serial.println(jsonPayload);
  
  // Kirim POST request
  int httpResponseCode = http.POST(jsonPayload);
  
  // Tangani response
  Serial.print("[RECV] Response Code: ");
  Serial.println(httpResponseCode);
  
  if (httpResponseCode > 0) {
    String response = http.getString();
    Serial.print("       Response: ");
    Serial.println(response);
    
    // Tangani setiap kemungkinan response
    if (httpResponseCode == 201) {
      Serial.println("[OK] Data berhasil dikirim dan disimpan!");
    } 
    else if (httpResponseCode == 401) {
      Serial.println("[ERROR] API Key tidak valid!");
      Serial.println("        Pastikan API_KEY di kode ini sama dengan SENSOR_API_KEY di .env Laravel");
    } 
    else if (httpResponseCode == 422) {
      Serial.println("[ERROR] Validasi data gagal!");
      Serial.println("        Data suhu atau kelembapan di luar range yang valid");
      Serial.println("        Range valid: Suhu -50 hingga 100°C, Kelembapan 0-100%");
    } 
    else {
      Serial.print("[WARN] Response code tidak dikenali: ");
      Serial.println(httpResponseCode);
    }
  } 
  else {
    // Nilai negatif = koneksi gagal
    Serial.print("[ERROR] Koneksi gagal! Error code: ");
    Serial.println(httpResponseCode);
    Serial.println("        Kemungkinan penyebab:");
    Serial.println("        - Server Laravel tidak running");
    Serial.println("        - URL server salah");
    Serial.println("        - ESP32 dan server tidak dalam jaringan yang sama");
    Serial.println("        - Firewall memblokir koneksi");
  }
  
  http.end();
  Serial.println("─────────────────────────────────────\n");
}

/*
 * ============================================
 * WIRING DIAGRAM
 * ============================================
 * 
 * DHT11 Sensor → ESP32
 * ─────────────────────
 * VCC (Pin 1)  → 3.3V atau 5V
 * DATA (Pin 2) → GPIO 4
 * GND (Pin 4)  → GND
 * 
 * CATATAN PENTING DHT11:
 * - DHT11 bisa menggunakan 3.3V atau 5V (lebih stabil dengan 5V)
 * - Resistor pull-up 10kΩ OPSIONAL (banyak modul DHT11 sudah include resistor)
 * - Jika modul DHT11 Anda memiliki 3 pin, resistor sudah terpasang di PCB
 * - Jika menggunakan DHT11 4 pin mentah, pasang resistor 10kΩ antara DATA dan VCC
 * 
 * PERBEDAAN DHT11 vs DHT22:
 * ┌─────────────────┬──────────────┬──────────────┐
 * │ Spesifikasi     │ DHT11        │ DHT22        │
 * ├─────────────────┼──────────────┼──────────────┤
 * │ Suhu Range      │ 0-50°C       │ -40-80°C     │
 * │ Suhu Akurasi    │ ±2°C         │ ±0.5°C       │
 * │ Humidity Range  │ 20-90%       │ 0-100%       │
 * │ Humidity Akurasi│ ±5%          │ ±2%          │
 * │ Sampling Rate   │ 1 Hz (1s)    │ 0.5 Hz (2s)  │
 * │ Resolusi        │ 1°C, 1%      │ 0.1°C, 0.1%  │
 * │ Harga           │ Lebih murah  │ Lebih mahal  │
 * └─────────────────┴──────────────┴──────────────┘
 * 
 * REKOMENDASI:
 * - DHT11: Cocok untuk monitoring umum, budget terbatas
 * - DHT22: Cocok untuk aplikasi yang butuh akurasi tinggi
 * 
 * ============================================
 * CARA UPLOAD KE ESP32
 * ============================================
 * 
 * 1. Install Arduino IDE dari https://www.arduino.cc/en/software
 * 
 * 2. Install ESP32 Board:
 *    - File → Preferences
 *    - Tambahkan URL ini di "Additional Board Manager URLs":
 *      https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json
 *    - Tools → Board → Boards Manager
 *    - Cari "esp32" dan install "esp32 by Espressif Systems"
 * 
 * 3. Install Library yang Diperlukan:
 *    - Sketch → Include Library → Manage Libraries
 *    - Install:
 *      * DHT sensor library by Adafruit
 *      * Adafruit Unified Sensor
 *      * ArduinoJson by Benoit Blanchon (versi 6.x)
 * 
 * 4. Konfigurasi di Bagian Atas Kode:
 *    - WIFI_SSID: Nama WiFi Anda
 *    - WIFI_PASSWORD: Password WiFi Anda
 *    - SERVER_URL: URL server Laravel (contoh: http://192.168.1.100:8000/api/sensor)
 *    - API_KEY: Harus sama dengan SENSOR_API_KEY di file .env Laravel
 * 
 * 5. Upload ke ESP32:
 *    - Tools → Board → ESP32 Dev Module (atau board ESP32 yang Anda gunakan)
 *    - Tools → Port → Pilih port COM ESP32 Anda
 *    - Klik tombol Upload (ikon panah ke kanan)
 * 
 * 6. Monitor Serial:
 *    - Tools → Serial Monitor
 *    - Set baud rate ke 115200
 *    - Lihat output untuk memastikan koneksi berhasil
 * 
 * ============================================
 * TROUBLESHOOTING
 * ============================================
 * 
 * MASALAH: Gagal membaca sensor DHT11
 * SOLUSI:
 *   - Cek wiring DHT11 sudah benar
 *   - Jika menggunakan modul DHT11 (3 pin), resistor pull-up tidak perlu
 *   - Jika menggunakan DHT11 mentah (4 pin), pasang resistor 10kΩ antara DATA dan VCC
 *   - Coba gunakan 5V untuk VCC (lebih stabil daripada 3.3V)
 *   - Coba ganti pin GPIO (ubah DHTPIN)
 *   - Pastikan sensor tidak rusak
 *   - DHT11 butuh delay 1-2 detik antar pembacaan (sudah diatur di SEND_INTERVAL)
 * 
 * MASALAH: WiFi tidak terhubung
 * SOLUSI:
 *   - Cek SSID dan password sudah benar
 *   - Pastikan WiFi 2.4GHz (ESP32 tidak support 5GHz)
 *   - Cek jarak ESP32 ke router tidak terlalu jauh
 *   - Restart router jika perlu
 * 
 * MASALAH: Koneksi ke server gagal (error code negatif)
 * SOLUSI:
 *   - Pastikan server Laravel sudah running (php artisan serve)
 *   - ESP32 dan server harus dalam jaringan yang sama
 *   - Ganti "localhost" dengan IP komputer (cek dengan ipconfig/ifconfig)
 *   - Cek firewall tidak memblokir port 8000
 *   - Ping IP server dari komputer lain untuk memastikan bisa diakses
 * 
 * MASALAH: Response 401 (Unauthorized)
 * SOLUSI:
 *   - API_KEY di kode ini harus sama persis dengan SENSOR_API_KEY di .env
 *   - Cek tidak ada spasi atau karakter tersembunyi
 *   - Restart server Laravel setelah mengubah .env
 * 
 * MASALAH: Response 422 (Validation Error)
 * SOLUSI:
 *   - Data suhu atau kelembapan di luar range valid
 *   - Cek sensor tidak rusak atau terkena gangguan
 *   - Range valid: Suhu -50 hingga 100°C, Kelembapan 0-100%
 * 
 * ============================================
 * TIPS PENGGUNAAN
 * ============================================
 * 
 * - Gunakan power supply yang stabil (minimal 500mA)
 * - Jangan letakkan sensor terlalu dekat dengan sumber panas
 * - Kalibrasi sensor jika diperlukan untuk akurasi lebih baik
 * - Monitor Serial untuk debugging
 * - Gunakan kabel yang tidak terlalu panjang untuk menghindari noise
 * 
 * ============================================
 */

---
baslik: "Görüntü Tabanlı Steganografi Uygulaması"
ozet: "Python kullanarak LSB (Least Significant Bit) tekniği ile görüntülerin içine gizli metin saklayan ve çözen siber güvenlik uygulaması."
kategori: "Yazılım"
teknolojiler: ["Python", "Pillow", "NumPy", "OpenCV"]
gorsel: "🖼️"
---

# 🖼️ Görüntü Tabanlı Steganografi Uygulaması

Bu projede, siber güvenlikte veri gizleme tekniklerinden biri olan **Steganografi** üzerine çalıştım. Geliştirdiğim Python uygulaması, bir kapak görselinin piksellerini manipüle ederek içine fark edilemeyecek şekilde gizli mesajlar gömebiliyor.

---

## 🛠️ Algoritma ve Çalışma Mantığı (LSB Tekniği)

Projeyi geliştirirken görüntünün kalitesini bozmamak adına **En Önemsiz Bit (LSB - Least Significant Bit)** yöntemini kullandım.

* **Piksel Manipülasyonu:** Görseldeki her pikselin Kırmızı, Yeşil ve Mavi (RGB) renk değerlerinin son bitleri, gizlemek istediğimiz metnin ikilik (binary) kodlarıyla değiştirilir.
* **Fark Edilemezlik:** Renk değerindeki 1 bitlik değişim insan gözü tarafından tamamen görünmezdir. Dolayısıyla dışarıdan bakıldığında görsel sıradan bir fotoğraf gibi görünmeye devam eder.

---

## 💾 Örnek Python Kodu: Metin Gizleme Fonksiyonu

https://github.com/abdullahOzdemirr/steganografi
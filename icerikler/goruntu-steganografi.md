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

Projede görüntüyü matris dizilerine dökerek hızlıca işlemek için **NumPy** ve **Pillow** kütüphanelerinden yararlandım:

```python
import numpy as np
from PIL import Image

def veri_gizle(gorsel_yolu, gizli_metin, cikis_yolu):
    # Görseli aç ve piksel verilerini NumPy dizisine çevir
    resim = Image.open(gorsel_yolu)
    veri = np.array(resim)
    
    # Metni binary formata dönüştür
    binary_metin = ''.join(format(ord(i), '08b') for i in gizli_metin) + '1111111111111110' # Bitiş işareti
    
    # Piksel bitlerini manipüle etme döngüsü (LSB)
    # (Burada binary_metin verileri piksellerin son bitine yazılır...)
    
    yeni_resim = Image.fromarray(veri)
    yeni_resim.save(cikis_yolu)
    print("Mesaj görüntüye başarıyla gizlendi!")
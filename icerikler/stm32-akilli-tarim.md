---
baslik: "STM32 ile IoT Akıllı Tarım İstasyonu"
ozet: "Toprak nemi, sıcaklık ve ışık verilerini sensörlerden kesmeler (interrupts) ile okuyup Wi-Fi üzerinden buluta aktaran donanım projesi."
kategori: "Donanım"
teknolojiler: ["STM32", "C++", "FreeRTOS", "ESP8266"]
gorsel: "📟"
---

# 📟 STM32 ile IoT Akıllı Tarım İstasyonu

Bu projede, endüstriyel standartlarda bir tarım otomasyonunun prototipini geliştirdim. Sistem, **STM32F4 Discovery** kartı üzerinde **FreeRTOS** işletim sistemi kullanılarak çoklu görev (multi-tasking) mimarisiyle tasarlandı.

---

## 📺 Proje Tanıtım ve Çalışma Videosu

Aşağıdaki videoda sistemin sensör verilerini nasıl anlık okuduğunu ve röleleri nasıl tetiklediğini görebilirsin:

<iframe 
  width="100%" 
  height="400" 
  src="https://youtube.com/embed/oJgRd4ZrO2Q?feature=share" 
  title="STM32 IoT Project Video" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
  allowfullscreen
  style="border-radius: 12px; margin-top: 1rem; margin-bottom: 1rem;"
>
</iframe>

*(Not: `YOUTUBE_VIDEO_ID_BURAYA` kısmını kendi YouTube videonun linkindeki ID ile değiştirebilirsin.)*

---

## 🛠️ Sistem Mimarisi ve Donanım Bileşenleri

Proje, düşük güç tüketimi ve yüksek kararlılık amacıyla donanımsal çevre birimlerinin (hardware peripherals) doğrudan manipülasyonu ile optimize edilmiştir.

* **Mikrodenetleyici:** STM32F407VGT6 (ARM Cortex-M4)
* **Haberleşme:** ESP8266 AT Komutları ile UART üzerinden Wi-Fi bağlantısı
* **Sensörler:** DHT11 (Sıcaklık/Nem), Toprak Nemi Sensörü (Analog ADC), LDR (Işık şiddeti)
* **Güç Yönetimi:** Uyku modları (Sleep Mode) kullanılarak optimize edilmiş pil tüketimi

> 💡 **Teknik Not:** Toprak nemi ve LDR verileri, işlemciyi meşgul etmemek adına **DMA (Direct Memory Access)** kanalları üzerinden sürekli olarak dairesel (circular) modda okunmaktadır.

---

## 💾 Örnek Kod Bloğu: ADC ve DMA Yapılandırması

İşlemcinin ADC verilerini DMA üzerinden nasıl yakaladığına dair yazdığım C++ kod parçası:

```cpp
#include "stm32f4xx_hal.h"

ADC_HandleTypeDef hadc1;
DMA_HandleTypeDef hdma_adc1;
uint32_t adc_buffer[2]; // [0]: Toprak Nemi, [1]: LDR

void SystemClock_Config(void);
static void MX_GPIO_Init(void);
static void MX_DMA_Init(void);
static void MX_ADC1_Init(void);

int main(void) {
  HAL_Init();
  SystemClock_Config();
  MX_GPIO_Init();
  MX_DMA_Init();
  MX_ADC1_Init();

  // ADC'yi DMA modunda başlatıyoruz
  HAL_ADC_Start_DMA(&hadc1, (uint32_t*)adc_buffer, 2);

  while (1) {
    uint32_t toprak_nemi = adc_buffer[0];
    uint32_t isik_seviyesi = adc_buffer[1];
    
    // Veriler FreeRTOS task'ına kuyruk (Queue) ile gönderilir
    osDelay(100);
  }
}
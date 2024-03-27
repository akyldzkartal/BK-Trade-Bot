const apiKey = '39bdfa36-6b2a-4aeb-8f91-37362b094f08';

//Sistem Ayarları
const cryptoSymbol = 'BTC'; // Coin Kisaltmasi
const refreshRate = 5000; // Yenileme Hizi

const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${cryptoSymbol}`;

export function fetchAndPrintCryptoPrice() {
  fetch(url, {
    method: 'GET',
    headers: {
      'X-CMC_PRO_API_KEY': apiKey,
      'Content-Type': 'application/json',
    },
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('network hatasi');
    }
    return response.json();
  })
  .then(content => {
    // Verinin varlığını kontrol et
    if (content && content.data && content.data[cryptoSymbol]) {
      const cryptoData = content.data[cryptoSymbol];
      const cryptoName = cryptoData.name;
      const cryptoPrice = cryptoData.quote.USD.price;
      console.log(`${cryptoName} (${cryptoSymbol}) fiyati: $${cryptoPrice}`);
    } else {
      throw new Error('Belirtilen sembolle ilişkilendirilmiş veri bulunamadi');
    }
  })
  .catch(error => {
    console.error('problem var', error);
  });
}

// ilk çalıştırma
fetchAndPrintCryptoPrice();

// yenileme fonksiyonu
setInterval(fetchAndPrintCryptoPrice, refreshRate);

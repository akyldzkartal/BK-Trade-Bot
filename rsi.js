//sanal bakiye
let balance = 500;
let rsiStatus = '';

// RSI ayarları
function decideRSI(rsiValue) {
    if (rsiValue <= 30) {
        rsiStatus = "Aşaği işleme girildi";
    } else if (rsiValue >= 70) {
        rsiStatus = "Yukari işleme girildi";
    } else {
        rsiStatus = 'İslem Araniyor...';
    }
}

//TradingView widget
new TradingView.widget(
    {
        "autosize": true,
        "symbol": "BINANCE:CAKEUSDT", //istenilen coini buraya gidiyoruz "BorsaAdı:coinsymbol"  
        "interval": "D", //Zaman dilimi
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "1",
        "locale": "tr",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "allow_symbol_change": true,
        "container_id": "tradingview_123456",
        "studies": [
            "RSI@tv-basicstudies"  //...@tv-basicstudies ile istenilen indikatoru burdan belirle. ornek: MACD@tv-basicstudies"
        ],
        "details": true,
        "events": {
            "onChartReady": function() {
                //  widget üzerinden RSI değerini alma
                const rsiValue = window.TradingView.widget.activeWidget.chart().getStudyById("RSI@tv-basicstudies").series().values().value();
                decideRSI(rsiValue);
                // RSI durumunu consola yazdır
                console.log(rsiStatus); //RSI ayarları kısmındaki koşulları yazdırır. İşlem durumunu kontrol amaçlı kullanılır
            }
        }
    });

    setInterval(function() {
        if (rsiStatus !== "Aşaği işleme girildi" && rsiStatus !== "Yukari işleme girildi") {
            console.log("İşlem aranıyor..."); //İşlem dışında sistemin durumunu gormek için yazdım.
        }
    }, 5000); // 5000 = 5sn  - mesaji 5 saniyede bir guncelemmek için koydum.
const apiKey = '39bdfa36-6b2a-4aeb-8f91-37362b094f08';
const url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';

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
  const cryptocurrencies = content.data;
  cryptocurrencies.forEach(crypto => {
    const name = crypto.name;
    const symbol = crypto.symbol;
    const price = crypto.quote.USD.price;
    console.log(`${name} (${symbol}): $${price}`);
  });
})
.catch(error => {
  console.error('fetch hatasi:', error);
});

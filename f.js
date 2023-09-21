
var url = 'https://newsapi.org/v2/everything?' +
'q=technology&'+    
'sortBy=popularity&' +
'apiKey=744dc8784e464a7b8bdaddacf216f944';

const getTrends=  async function() {
  const resp = await fetch(url)
  if (resp.ok) {
    const data = await resp.json()
    return data.articles.slice(0,5)
  }else{
    console.log("err");
  }
  }
module.exports = getTrends

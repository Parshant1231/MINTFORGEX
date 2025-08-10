import puppeteer from "puppeteer";

export async function fetchTrendingShorts(keyword: string = "") {
  const browser = await puppeteer.launch({ headless: "shell" });
  const page = await browser.newPage();
  await page.goto(
    `https://www.youtube.com/results?search_query=${keyword}+shorts`,
    {
      waitUntil: "networkidle2",
    }
  );

  const data  = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('ytd-video-renderer'));
    return cards.slice(0,5).map(card => ({
        title: card.querySelector('#video-title')?.textContent?.trim(),
        views: card.querySelector('#metadata-line span')?.textContent?.trim(),
    }))
  })

  await browser.close();
  return data;
}

const puppeteer = require('puppeteer');
const config = require('../config');

export async function getTodayManna() {
  const browser = await puppeteer.launch({});
  const page = await browser.newPage();
  const id = config.jbchId;
  const pw = config.jbchPw;
  await page.goto('https://community.jbch.org/');

  await page.evaluate(
    (id, pw) => {
      document.querySelector('input[name="user_id"]').value = id;
      document.querySelector('input[name="passwd"]').value = pw;
      document.querySelector('#login').click();
    },
    id,
    pw,
  );

  // For local server
  const todayArray = new Date()
    .toLocaleDateString('ko-KR', {
      timeZone: 'Asia/Seoul',
    })
    .split('.');
  let year = todayArray[0],
    month = todayArray[1].slice(1),
    day = todayArray[2].slice(1);

  // For EC2 server
  // const todayArray = new Date()
  //   .toLocaleDateString('ko-KR', {
  //     timeZone: 'Asia/Seoul',
  //   })
  //   .split('-');
  // let year = todayArray[0],
  //   month = todayArray[1],
  //   day = todayArray[2];

  if (month.length === 1) {
    month = '0' + month;
  }
  if (day.length === 1) {
    day = '0' + day;
  }
  const today = `${year}년 ${month}월 ${day}일`;

  const date_selector = '#dawn_area > div.active > div.condate';
  await page.waitForSelector(date_selector);

  const date = await page.evaluate((date_selector) => {
    const date = document.querySelector(date_selector).textContent;
    return date;
  }, date_selector);

  if (today === date) {
    const today_selector = '#dawn_area > div.active > div.content > div.img';
    await page.waitForSelector(today_selector);
    await page.click(today_selector);

    const manna_selector = '#bbs_view > div.titlebox > div';
    await page.waitForSelector(manna_selector);

    const today_manna = await page.evaluate((manna_selector) => {
      const verse = document.querySelector(manna_selector).textContent;
      let contents = Array.from(
        document.querySelectorAll('#bbs_view > div.contentbox.fr-view > p'),
        (e) => e.textContent,
      );
      contents = contents.map((e) => e.slice(0, -1));
      const today_manna = {
        verse: verse,
        contents: contents,
      };
      return today_manna;
    }, manna_selector);
    browser.close();
    return today_manna;
  } else {
    browser.close();
    return false;
  }
}

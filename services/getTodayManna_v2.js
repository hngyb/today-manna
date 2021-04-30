const puppeteer = require('puppeteer');
const config = require('../config');

async function getTodayManna() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const id = config.jbchId;
  const pw = config.jbchPw;
  await page.goto(
    'http://community.jbch.org/meditation/board/list.php?flag=4&chId=3&use_kind=1&boardId=5514&group_uid=38&page=1',
  );

  await page.evaluate(
    (id, pw) => {
      document.querySelector('input[name="user_id"]').value = id;
      document.querySelector('input[name="passwd"]').value = pw;
      document.querySelector('#login').click();
    },
    id,
    pw,
  );

  const today_selector = '#listarea > tr.post > td.title';
  await page.waitForSelector(today_selector);
  await page.evaluate((today_selector) => {
    document.querySelector(today_selector).click();
  }, today_selector);

  const manna_selector = '#bbs_view > div.titlebox > div';
  await page.waitForSelector(manna_selector);

  const today_manna = await page.evaluate((manna_selector) => {
    const verse = document.querySelector(manna_selector).textContent;
    let temp = Array.from(
      document.querySelectorAll('#bbs_view > div.contentbox.fr-view > p'),
      (e) => e.textContent,
    );
    const contents = [];
    temp.forEach((e) => {
      if (e[e.length - 1] === '\xA0') {
        contents.push(e.slice(0, -1));
      } else {
        contents.push(e);
      }
    });
    const today_manna = {
      verse: verse,
      contents: contents,
    };
    return today_manna;
  }, manna_selector);

  browser.close();
  return today_manna;
}

module.exports.getTodayManna = getTodayManna;

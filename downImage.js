const puppeteer = require('puppeteer');
const download = require('image-downloader');

(async() => {
    const browser = await puppeteer.launch();
    console.log('Browser openned');
    const page = await browser.newPage();
    const url = 'http://kenh14.vn/tet-nay-mac-ao-dai-sun-ht-man-tien-le-vi-dien-15-mau-ao-dai-cuc-xinh-ma-han-la-ban-cung-dang-can-tim-mua-chung-20180212234705991.chn';
    await page.goto(url);
    console.log('Page loaded');

    const imgLinks = await page.evaluate(() => {
        let imgElements = document.querySelectorAll('.sp-img-zoom > img, .sp-img-lightbox > img, .detail-img-lightbox > img');
        imgElements = [...imgElements];
        let imgLinks = imgElements.map(i => i.getAttribute('src'));
        return imgLinks;
    });
    console.log(imgLinks);

    // Tải các ảnh này về thư mục hiện tại
    await Promise.all(imgLinks.map(imgUrl => download.image({
        url: imgUrl,
        dest: __dirname
    })));

    await browser.close();
})();
const puppeteer = require('puppeteer'); // v23.0.0 or later

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const timeout = 5000;
    page.setDefaultTimeout(timeout);

    {
        const targetPage = page;
        await targetPage.setViewport({
            width: 909,
            height: 825
        })
    }
    {
        const targetPage = page;
        await targetPage.goto('http://localhost:5173/login');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Sign In)'),
            targetPage.locator('form > button'),
            targetPage.locator('::-p-xpath(//*[@id=\\"root\\"]/div/div[1]/div/div[2]/form/button)'),
            targetPage.locator(':scope >>> form > button')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 201.07730102539062,
                y: 29.4921875,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Aayusa Nyupane) >>>> ::-p-aria([role=\\"generic\\"])'),
            targetPage.locator('nav a > span'),
            targetPage.locator('::-p-xpath(//*[@id=\\"root\\"]/div/div[1]/nav/div/div/div/a/span)'),
            targetPage.locator(':scope >>> nav a > span'),
            targetPage.locator('::-p-text(Aayusa Nyupane)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 92.1875,
                y: 10,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div > div.flex > div div.gap-4 svg'),
            targetPage.locator('::-p-xpath(//*[@id=\\"root\\"]/div/div[1]/div/header/div[1]/button/svg)'),
            targetPage.locator(':scope >>> div > div.flex > div div.gap-4 svg')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 17,
                y: 19.399999618530273,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Profile)'),
            targetPage.locator('a:nth-of-type(3)'),
            targetPage.locator('::-p-xpath(//*[@id=\\"root\\"]/div/div[1]/aside/div/nav/a[3])'),
            targetPage.locator(':scope >>> a:nth-of-type(3)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 92,
                y: 32,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div.fixed'),
            targetPage.locator('::-p-xpath(//*[@id=\\"root\\"]/div/div[1]/div/main/div[1])'),
            targetPage.locator(':scope >>> div.fixed')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 802,
                y: 285,
              },
            });
    }

    await browser.close();

})().catch(err => {
    console.error(err);
    process.exit(1);
});

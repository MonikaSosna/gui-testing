beforeEach(async () => {
    await page.goto('http://the-internet.herokuapp.com/');
})
test('checkboxes', async () => {
    await page.click("ul > li > a:has-text('Checkboxes')");
    const firstCheckbox = await page.waitForSelector('#checkboxes > input:first-child');
    const ifFirstChecked = await firstCheckbox.isChecked();
    expect(ifFirstChecked).toBeFalsy();
    const secondCheckbox = await page.waitForSelector('#checkboxes > input:nth-of-type(2)');
    const ifSecondChecked = await secondCheckbox.isChecked();
    expect(ifSecondChecked).toBeFalsy();
    await page.waitForTimeout(3000);
})
test('dropdown', async () => {
    await page.click("ul > li > a:has-text('Dropdown')");
    await page.selectOption("select#dropdown", "1");
    const hasAttribute = await page.$eval('option[value="1"]', el => el.hasAttribute('selected'));
    expect(hasAttribute).toBeTruthy();
    await page.waitForTimeout(3000);
})

describe('form authentication', () => {
    beforeEach(async () => {
        await page.click('ul > li > a[href = "/login"]');
    })
    test('no username, no password', async () => {
        await page.click('form > button.radius');
        const info = await page.innerText('div#flash');
        expect(info).toContain('Your username is invalid!');
    })
    test('valid username, no password', async () => {
        await page.fill('#username', 'tomsmith');
        await page.click('form > button.radius');
        const info = await page.innerText('div#flash');
        expect(info).toContain('Your password is invalid!');

    })
    test('valid username, wrong password', async () => {
        await page.fill('#username', 'tomsmith');
        await page.fill('#password', 'SuperPassword');
        await page.click('form > button.radius');
        const info = await page.innerText('div#flash');
        expect(info).toContain('Your password is invalid!');
    })
    test('wrong username, wrong password', async () => {
        await page.fill('#username', 'tomeksmif');
        await page.fill('#password', 'SuperPassword');
        await page.click('form > button.radius');
        const info = await page.innerText('div#flash');
        expect(info).toContain('Your username is invalid!');
    })
    test('valid username, valid password', async () => {
        await page.fill('#username', 'tomsmith');
        await page.fill('#password', 'SuperSecretPassword!');
        await page.click('form > button.radius');
        const info = await page.innerText('div#flash');
        await expect(info).toContain('You logged into a secure area!');
    })
})
test('Disappearing Elements', async () => {
    await page.click('ul > li > a[href = "/disappearing_elements"]');
    const elements = await page.$$('div.example > ul > li ');
    expect(elements).toHaveLength(5);   
     await page.waitForTimeout(3000);
})

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
describe('First test', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have login text', async () => {
    await expect(element(by.text('Please log in'))).toBeVisible();
  });

  it('It should login with Nikita/babcia2', async () => {
    await element(by.id('loginField')).typeText('Nikita');
    await element(by.id('passwordField')).typeText('babcia2');
    await element(by.id('loginButton')).tap();
    await sleep(2000);
    await expect(element(by.id('mainHelloText'))).toBeVisible();
  });
  it('It should not login with wrong/wrong', async () => {
    await element(by.id('loginField')).typeText('bba');
    await element(by.id('passwordField')).typeText('bba');
    await element(by.id('loginButton')).tap();
    await sleep(2000);
    await expect(element(by.id('mainHelloText'))).toBeNotVisible();
  });
});

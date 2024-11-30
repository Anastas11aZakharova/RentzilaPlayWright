import { test, expect } from '@playwright/test';
import MainPage from "../pageobjects/mainPage";
import AdvertPage from "../pageobjects/advertPage"


test('C410 - Verify creating new service', async ({ page }) => {
    const mainPage = new MainPage(page);
    const advertPage = new AdvertPage(page);
    await mainPage.open();
    await mainPage.clickOnLoginButton();
    await mainPage.verifyEnterButtonIsVisible();
    await mainPage.enterEmailInEmailOrPhoneNumberField();
    await mainPage.enterPasswordInPasswordField();
    await mainPage.clickOnEnterButton();
    await mainPage.verifyLogoIsVisible();
    await mainPage.clickOnCreateUnitButton();
    await mainPage.verifyCreateUnitTitleIsVisible()
    await advertPage.clickOnServicesTab()
    await advertPage.verifyServicesTabParagrahpIsVisible()
    let newService = generateRandomString(8)
    await advertPage.enterInvalidDataInServicesField(newService)
    await advertPage.verifyServicesDropdownIsVisible()
    await advertPage.verifyServicesDropdownErrorMessageIsVisible()
    await advertPage.verifyCreateUnitButtonIsVisible()
    await advertPage.verifyCreateUnitButtonPlusIsVisible()
    await advertPage.verifyCreateUnitButtonTextIsCorrect()
    await advertPage.clickOnCreateUnitButton()
    await advertPage.verifyDropdownElementIsVisible()
    await advertPage.verifyDropdownElementToHaveText(newService)
    await advertPage.verifyChoosedSymbolIsVisible(0)
});

test('C411 - Verify choosing multiple services', async ({ page }) => {
    const mainPage = new MainPage(page);
    const advertPage = new AdvertPage(page);
    const letter = "Г";
    await mainPage.open();
    await mainPage.clickOnLoginButton();
    await mainPage.verifyEnterButtonIsVisible();
    await mainPage.enterEmailInEmailOrPhoneNumberField();
    await mainPage.enterPasswordInPasswordField();
    await mainPage.clickOnEnterButton();
    await mainPage.verifyLogoIsVisible();
    await mainPage.clickOnCreateUnitButton();
    await mainPage.verifyCreateUnitTitleIsVisible()
    await advertPage.clickOnServicesTab()
    await advertPage.enterLetterInServicesField(letter)
    await advertPage.verifyServicesDropdownIsVisible()
    await advertPage.verifyEveryDropdownElementHasText(letter)
    for(let i = 0; i <= 2; i++){
    let dropdownelementText = await advertPage.getTextFromDropdownElement(i)
    await advertPage.clickOnDropdownElement(i)
    await advertPage.verifyChoosedSymbolIsVisible(i)
    let selectedServiceText = await advertPage.getTextFromSelectedService(i)
    await expect(dropdownelementText).toEqual(selectedServiceText)
    }
});

test('C412 - Verify removing variants from choosed list', async ({ page }) => {
    const mainPage = new MainPage(page);
    const advertPage = new AdvertPage(page);
    const letter = "Г";
    await mainPage.open();
    await mainPage.clickOnLoginButton();
    await mainPage.verifyEnterButtonIsVisible();
    await mainPage.enterEmailInEmailOrPhoneNumberField();
    await mainPage.enterPasswordInPasswordField();
    await mainPage.clickOnEnterButton();
    await mainPage.verifyLogoIsVisible();
    await mainPage.clickOnCreateUnitButton();
    await mainPage.verifyCreateUnitTitleIsVisible()
    await advertPage.clickOnServicesTab()
    await advertPage.enterLetterInServicesField(letter)
    await advertPage.verifyServicesDropdownIsVisible()
    await advertPage.verifyEveryDropdownElementHasText(letter)
    for(let i = 0; i <= 1; i++){
    let dropdownelementText = await advertPage.getTextFromDropdownElement(i)
    await advertPage.clickOnDropdownElement(i)
    await advertPage.verifyChoosedSymbolIsVisible(i)
    let selectedServiceText = await advertPage.getTextFromSelectedService(i)
    await expect(dropdownelementText).toEqual(selectedServiceText)
    }
    await advertPage.clickOnRemoveButton(1)
    await advertPage.checkChoosedServiceIsNotVisible(1)
    await advertPage.clickOnRemoveButton(0)
    await advertPage.checkChoosedServiceIsNotVisible(0)
    await advertPage.checkServicesTabParagrahpIsNotVisible(1)
});



function generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}


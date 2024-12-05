import { test, expect } from "@playwright/test";
import MainPage from "../pageobjects/mainPage";
import AdvertPage from "../pageobjects/advertPage";

// test.beforeEach(async ({ page }) => {
//   const mainPage = new MainPage(page);
//   const advertPage = new AdvertPage(page);
//   await mainPage.open();
//   await mainPage.clickOnLoginButton();
//   await mainPage.verifyEnterButtonIsVisible();
//   await mainPage.enterEmailInEmailOrPhoneNumberField();
//   await mainPage.enterPasswordInPasswordField();
//   await mainPage.clickOnEnterButton();
//   await mainPage.verifyLogoIsVisible();
//   await mainPage.clickOnCreateUnitButton();
//   await mainPage.verifyCreateUnitTitleIsVisible();
//   await advertPage.clickOnServicesTab();
//   await advertPage.verifyServicesTabParagrahpIsVisible();
// });

test("C410 - Verify creating new service", async ({ page }) => {
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
  await mainPage.verifyCreateUnitTitleIsVisible();
  await advertPage.clickOnServicesTab();
  await advertPage.verifyServicesTabParagrahpIsVisible();
  let newService = generateRandomString(8);
  await advertPage.enterInvalidDataInServicesField(newService);
  await advertPage.verifyServicesDropdownIsVisible();
  await advertPage.verifyServicesDropdownErrorMessageIsVisible();
  await advertPage.verifyCreateUnitButtonIsVisible();
  await advertPage.verifyCreateUnitButtonPlusIsVisible();
  await advertPage.verifyCreateUnitButtonTextIsCorrect();
  await advertPage.clickOnCreateUnitButton();
  await advertPage.verifyDropdownElementIsVisible();
  await advertPage.verifyDropdownElementToHaveText(newService);
  await advertPage.verifyChoosedSymbolIsVisible(0);
});

test("C411 - Verify choosing multiple services", async ({ page }) => {
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
  await mainPage.verifyCreateUnitTitleIsVisible();
  await advertPage.clickOnServicesTab();
  await advertPage.enterDataInServicesField(letter);
  await advertPage.verifyServicesDropdownIsVisible();
  await advertPage.verifyEveryDropdownElementHasText(letter);
  for (let i = 0; i <= 2; i++) {
    let dropdownElementText = await advertPage.getTextFromDropdownElement(i);
    await advertPage.clickOnDropdownElement(i);
    await advertPage.verifyChoosedSymbolIsVisible(i);
    let selectedServiceText = await advertPage.getTextFromSelectedService(i);
    await expect(dropdownElementText).toEqual(selectedServiceText);
  }
});

test("C412 - Verify removing variants from choosed list", async ({ page }) => {
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
  await mainPage.verifyCreateUnitTitleIsVisible();
  await advertPage.clickOnServicesTab();
  await advertPage.enterDataInServicesField(letter);
  await advertPage.verifyServicesDropdownIsVisible();
  await advertPage.verifyEveryDropdownElementHasText(letter);
  for (let i = 0; i <= 1; i++) {
    let dropdownElementText = await advertPage.getTextFromDropdownElement(i);
    await advertPage.clickOnDropdownElement(i);
    await advertPage.verifyChoosedSymbolIsVisible(i);
    let selectedServiceText = await advertPage.getTextFromSelectedService(i);
    await expect(dropdownElementText).toEqual(selectedServiceText);
  }
  await advertPage.clickOnRemoveButton(1);
  await advertPage.checkChoosedServiceIsNotVisible(1);
  await advertPage.clickOnRemoveButton(0);
  await advertPage.checkChoosedServiceIsNotVisible(0);
  await advertPage.checkServicesTabParagrahpIsNotVisible(1);
});

test("C413 - Verify 'Назад' button", async ({ page }) => {
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
  await mainPage.verifyCreateUnitTitleIsVisible();
  await advertPage.clickOnServicesTab();
  await advertPage.verifyServicesTabParagrahpIsVisible();
  await advertPage.verifyBackButtonToHaveText("Назад");
  await advertPage.clickOnBackButton();
  await advertPage.verifyPhotoTabIsVisible();
  expect(await advertPage.verifyLabelIsActive("Фотографії")).toEqual(true);
});

test("C414 - Verify 'Далі' button", async ({ page }) => {
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
  await mainPage.verifyCreateUnitTitleIsVisible();
  await advertPage.clickOnServicesTab();
  await advertPage.verifyServicesTabParagrahpIsVisible();
  await advertPage.verifyNextButtonToHaveText("Далі");
  await advertPage.clickOnNextButton();
  await advertPage.chooseServiceErrorMessageToHaveText(
    "Додайте в оголошення принаймні 1 послугу"
  );
  expect(await advertPage.verifyServicesFieldBorderIsRed()).toEqual(true);
});

test("C591 - Verify 'Послуги' input with invalid data", async ({ page }) => {
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
  await mainPage.verifyCreateUnitTitleIsVisible();
  await advertPage.clickOnServicesTab();
  await advertPage.verifyServicesTabParagrahpIsVisible();
  await advertPage.enterSpecialSymbolsInServicesField();
  await advertPage.checkServicesFieldIsEmpty();
});

test("C592 - Verify 'Послуги' choosing of existing service", async ({
  page,
}) => {
  const mainPage = new MainPage(page);
  const advertPage = new AdvertPage(page);
  const letter = "Б";
  const word = "буріння";
  const cLWord = "БУРІННЯ";
  await mainPage.open();
  await mainPage.clickOnLoginButton();
  await mainPage.verifyEnterButtonIsVisible();
  await mainPage.enterEmailInEmailOrPhoneNumberField();
  await mainPage.enterPasswordInPasswordField();
  await mainPage.clickOnEnterButton();
  await mainPage.verifyLogoIsVisible();
  await mainPage.clickOnCreateUnitButton();
  await mainPage.verifyCreateUnitTitleIsVisible();
  await advertPage.clickOnServicesTab();
  await advertPage.verifyServicesTabParagrahpIsVisible();
  await advertPage.verifyServicesTabParagrahpAsteriskToHaveText("*");
  await advertPage.verifyClueLineToHaveText(
    "Додайте в оголошення принаймні 1 послугу"
  );
  await advertPage.verifyMagnifyingGlassIsVisible();
  await advertPage.verifyServicesFieldToHaveAttr();
  await advertPage.enterDataInServicesField(letter);
  await advertPage.verifyServicesDropdownIsVisible();
  await advertPage.verifyEveryDropdownElementHasText(letter);
  await advertPage.clearTheServicesField();
  await advertPage.enterDataInServicesField(word);
  await advertPage.verifyEveryDropdownElementHasText(word);
  await advertPage.enterDataInServicesField(cLWord);
  await advertPage.verifyEveryDropdownElementHasText(word);
  let dropdownElementText = await advertPage.getTextFromDropdownElement(0);
  await advertPage.clickOnDropdownElement(0);
  await advertPage.verifyChoosedSymbolIsVisible(0);
  let selectedServiceText = await advertPage.getTextFromSelectedService(0);
  await expect(dropdownElementText).toEqual(selectedServiceText);
  await advertPage.clearTheServicesField();
  await advertPage.verifyChoosedServiceTitleToHaveText(
    "Послуги, які надає технічний засіб: "
  );
  await advertPage.verifyRemoveButtonIsVisible();
});

test("C632 - Verify entering spesial characters in the 'Послуги' field", async ({
  page,
}) => {
  const mainPage = new MainPage(page);
  const advertPage = new AdvertPage(page);
  const wordSpecialSymbols = "буріння^{}<>";
  const word = "буріння";
  await mainPage.open();
  await mainPage.clickOnLoginButton();
  await mainPage.verifyEnterButtonIsVisible();
  await mainPage.enterEmailInEmailOrPhoneNumberField();
  await mainPage.enterPasswordInPasswordField();
  await mainPage.clickOnEnterButton();
  await mainPage.verifyLogoIsVisible();
  await mainPage.clickOnCreateUnitButton();
  await mainPage.verifyCreateUnitTitleIsVisible();
  await advertPage.clickOnServicesTab();
  await advertPage.verifyServicesTabParagrahpIsVisible();
  await advertPage.enterSpecialSymbolsInServicesField();
  await advertPage.checkServicesFieldIsEmpty();
  await advertPage.enterDataInServicesField(wordSpecialSymbols);
  await advertPage.verifyServicesFieldToHaveText(word);
});

test("C633 - Verify data length for 'Послуги' input field", async ({
  page,
}) => {
  const mainPage = new MainPage(page);
  const advertPage = new AdvertPage(page);
  const symbol = ",";
  await mainPage.open();
  await mainPage.clickOnLoginButton();
  await mainPage.verifyEnterButtonIsVisible();
  await mainPage.enterEmailInEmailOrPhoneNumberField();
  await mainPage.enterPasswordInPasswordField();
  await mainPage.clickOnEnterButton();
  await mainPage.verifyLogoIsVisible();
  await mainPage.clickOnCreateUnitButton();
  await mainPage.verifyCreateUnitTitleIsVisible();
  await advertPage.clickOnServicesTab();
  await advertPage.verifyServicesTabParagrahpIsVisible();
  await advertPage.enterDataInServicesField(symbol);
  await advertPage.verifyEveryDropdownElementHasText(symbol);
  for (let i = 0; i <= 1; i++) {
    let dropdownElementText = await advertPage.getTextFromDropdownElement(i);
    await advertPage.clickOnDropdownElement(i);
    await advertPage.verifyChoosedSymbolIsVisible(i);
    let selectedServiceText = await advertPage.getTextFromSelectedService(i);
    await expect(dropdownElementText).toEqual(selectedServiceText);
  }
});

test("C634 - Verify the search function is not sensitive to upper or lower case", async ({
  page,
}) => {
  const mainPage = new MainPage(page);
  const advertPage = new AdvertPage(page);
  const lowerCase = "риття";
  const upperCase = "РИТТЯ";
  await mainPage.open();
  await mainPage.clickOnLoginButton();
  await mainPage.verifyEnterButtonIsVisible();
  await mainPage.enterEmailInEmailOrPhoneNumberField();
  await mainPage.enterPasswordInPasswordField();
  await mainPage.clickOnEnterButton();
  await mainPage.verifyLogoIsVisible();
  await mainPage.clickOnCreateUnitButton();
  await mainPage.verifyCreateUnitTitleIsVisible();
  await advertPage.clickOnServicesTab();
  await advertPage.verifyServicesTabParagrahpIsVisible();
  await advertPage.clickOnTelegramCrossButton();
  await advertPage.enterDataInServicesField(lowerCase);
  await advertPage.verifyEveryDropdownElementHasText(lowerCase);
  let dropdownElementText = await advertPage.getTextFromDropdownElement(0);
  await advertPage.clickOnDropdownElement(0);
  await advertPage.verifyChoosedSymbolIsVisible(0);
  let selectedServiceText = await advertPage.getTextFromSelectedService(0);
  await expect(dropdownElementText).toEqual(selectedServiceText);
  await advertPage.clickOnRemoveButton(0);
  await advertPage.clearTheServicesField();
  await advertPage.enterDataInServicesField(upperCase);
  await advertPage.verifyEveryDropdownElementHasText(upperCase);
  dropdownElementText = await advertPage.getTextFromDropdownElement(0);
  await advertPage.clickOnDropdownElement(0);
  await advertPage.verifyChoosedSymbolIsVisible(0);
  selectedServiceText = await advertPage.getTextFromSelectedService(0);
  await expect(dropdownElementText).toEqual(selectedServiceText);
});

function generateRandomString(length: number): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

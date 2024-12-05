import { test, expect } from "../fixtures/fixtures";
import * as constants from "../data/constants.json";

function generateRandomString(length: number): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

test.beforeEach(async ({ mainPage, advertPage }) => {
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
});

test("C410 - Verify creating new service", async ({ advertPage }) => {
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

test("C411 - Verify choosing multiple services", async ({ advertPage }) => {
  const letter = "Г";
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

test("C412 - Verify removing variants from choosed list", async ({ advertPage }) => {
  const letter = "Г";
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

test("C413 - Verify 'Назад' button", async ({ advertPage }) => {
  await advertPage.clickOnServicesTab();
  await advertPage.verifyServicesTabParagrahpIsVisible();
  await advertPage.verifyBackButtonToHaveText(constants.serviceTab.backButton);
  await advertPage.clickOnBackButton();
  await advertPage.verifyPhotoTabIsVisible();
  expect(await advertPage.verifyLabelIsActive(constants.serviceTab.photoLabel)).toEqual(true);
});

test("C414 - Verify 'Далі' button", async ({ advertPage }) => {
  await advertPage.clickOnServicesTab();
  await advertPage.verifyServicesTabParagrahpIsVisible();
  await advertPage.verifyNextButtonToHaveText(constants.serviceTab.nextButton);
  await advertPage.clickOnNextButton();
  await advertPage.chooseServiceErrorMessageToHaveText(
    constants.serviceTab.serviceErrorMessage
  );
  expect(await advertPage.verifyServicesFieldBorderIsRed()).toEqual(true);
});

test("C591 - Verify 'Послуги' input with invalid data", async ({ advertPage }) => {
  await advertPage.clickOnServicesTab();
  await advertPage.verifyServicesTabParagrahpIsVisible();
  await advertPage.enterSpecialSymbolsInServicesField();
  await advertPage.checkServicesFieldIsEmpty();
});

test("C592 - Verify 'Послуги' choosing of existing service", async ({ advertPage }) => {
  const letter = "Б";
  const word = "буріння";
  const cLWord = "БУРІННЯ";
  await advertPage.clickOnServicesTab();
  await advertPage.verifyServicesTabParagrahpIsVisible();
  await advertPage.verifyServicesTabParagrahpAsteriskToHaveText("*");
  await advertPage.verifyClueLineToHaveText(
    constants.serviceTab.clueLineText
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
    constants.serviceTab.serviceTitle
  );
  await advertPage.verifyRemoveButtonIsVisible();
});

test("C632 - Verify entering spesial characters in the 'Послуги' field", async ({ advertPage }) => {
  const wordSpecialSymbols = "буріння^{}<>";
  const word = "буріння";
  await advertPage.clickOnServicesTab();
  await advertPage.verifyServicesTabParagrahpIsVisible();
  await advertPage.enterSpecialSymbolsInServicesField();
  await advertPage.checkServicesFieldIsEmpty();
  await advertPage.enterDataInServicesField(wordSpecialSymbols);
  await advertPage.verifyServicesFieldToHaveText(word);
});

test("C633 - Verify data length for 'Послуги' input field", async ({ advertPage }) => {
  const symbol = ",";
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

test("C634 - Verify the search function is not sensitive to upper or lower case", async ({ advertPage }) => {
  const lowerCase = "риття";
  const upperCase = "РИТТЯ";
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

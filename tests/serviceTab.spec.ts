import { test, expect } from "../fixtures/fixtures";
import * as constants from "../data/constants.json"; 
import * as dotenv from "dotenv";
import { faker } from '@faker-js/faker';

dotenv.config();
const validEmail = process.env.MY_EMAIL || "default_email@example.com";
const validPassword = process.env.MY_PASSWORD || "default_password";

test.beforeEach(async ({ mainPage, advertPage }) => {
  await mainPage.page.goto("/")
  await mainPage.buttons.loginButton.click();
  await expect(mainPage.buttons.enterButton).toBeVisible();
  await mainPage.fields.emailOrPhoneNumberField.fill(validEmail);
  await mainPage.fields.passwordField.fill(validPassword);
  await mainPage.buttons.enterButton.click();
  await expect(mainPage.elements.logo).toBeVisible();
  await mainPage.buttons.createUnitButton.click();
  await expect(mainPage.buttons.createUnitButton).toBeVisible();
  await advertPage.buttons.servicesTab.click();
  await expect(advertPage.elements.servicesTabParagrahp).toBeVisible();
});

test("C410 - Verify creating new service", async ({ advertPage }) => {
  let newService = faker.string.alphanumeric(8);
  await advertPage.fields.servicesField.fill(newService);
  await expect(advertPage.elements.servicesDropdown).toBeVisible();
  await expect(advertPage.elements.servicesDropdownErrorMesage).toBeVisible();
  await expect(advertPage.buttons.createUnitButton).toBeVisible();
  await expect(advertPage.buttons.createUnitButtonPlus).toBeVisible();
  await expect(advertPage.buttons.createUnitButton).toHaveText(constants.serviceTab.createUnit);
  await advertPage.buttons.createUnitButton.click();
  await expect(advertPage.elements.dropdownElements).toBeVisible();
  await expect(advertPage.elements.dropdownElements).toHaveText(newService);
  await advertPage.verifyChoosedSymbolIsVisible(0);
});

test("C411 - Verify choosing multiple services", async ({ advertPage }) => {
  await advertPage.fields.servicesField.fill(constants.testData.letter1);
  await expect(advertPage.elements.servicesDropdown).toBeVisible();
  await advertPage.verifyEveryDropdownElementHasText(constants.testData.letter1);
  for (let i = 0; i <= 2; i++) {
    let dropdownElementText = await advertPage.getTextFromDropdownElement(i);
    await advertPage.clickOnDropdownElement(i);
    await advertPage.verifyChoosedSymbolIsVisible(i);
    let selectedServiceText = await advertPage.getTextFromSelectedService(i);
    await expect(dropdownElementText).toEqual(selectedServiceText);
  }
});

test("C412 - Verify removing variants from choosed list", async ({ advertPage }) => {
  await advertPage.fields.servicesField.fill(constants.testData.letter1);
  await expect(advertPage.elements.servicesDropdown).toBeVisible();
  await advertPage.verifyEveryDropdownElementHasText(constants.testData.letter1);
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
  await advertPage.buttons.servicesTab.click();
  await expect(advertPage.elements.servicesTabParagrahp).toBeVisible();
  await expect(advertPage.buttons.backButton).toHaveText(constants.serviceTab.backButton);
  await advertPage.buttons.backButton.click();
  await expect(advertPage.elements.photoTab).toBeVisible();
  expect(await advertPage.verifyLabelIsActive(constants.serviceTab.photoLabel)).toEqual(true);
});

test("C414 - Verify 'Далі' button", async ({ advertPage }) => {
  await advertPage.buttons.servicesTab.click();
  await expect(advertPage.elements.servicesTabParagrahp).toBeVisible();
  await expect(advertPage.buttons.nextButton).toHaveText(constants.serviceTab.nextButton);
  await advertPage.buttons.nextButton.click();
  await expect(advertPage.elements.chooseServiceErrorMessage).toHaveText(
    constants.serviceTab.serviceErrorMessage
  );
  expect(await advertPage.verifyServicesFieldBorderIsRed()).toEqual(true);
});

test("C591 - Verify 'Послуги' input with invalid data", async ({ advertPage }) => {
  await advertPage.buttons.servicesTab.click();
  await expect(advertPage.elements.servicesTabParagrahp).toBeVisible();
  await advertPage.fields.servicesField.fill("^{}<>");
  await advertPage.checkServicesFieldIsEmpty();
});

test("C592 - Verify 'Послуги' choosing of existing service", async ({ advertPage }) => {
  await advertPage.buttons.servicesTab.click();
  await expect(advertPage.elements.servicesTabParagrahp).toBeVisible();
  await expect(advertPage.elements.servicesTabParagrahpAsterisk).toHaveText("*");
  await expect(advertPage.elements.clueLine).toHaveText(
    constants.serviceTab.clueLineText
  );
  await advertPage.verifyMagnifyingGlassIsVisible();
  await advertPage.verifyServicesFieldToHaveAttr();
  await advertPage.fields.servicesField.fill(constants.testData.letter2);
  await expect(advertPage.elements.servicesDropdown).toBeVisible();
  await advertPage.verifyEveryDropdownElementHasText(constants.testData.letter2);
  await advertPage.fields.servicesField.clear();
  await advertPage.fields.servicesField.fill(constants.testData.word);
  await advertPage.verifyEveryDropdownElementHasText(constants.testData.word);
  await advertPage.fields.servicesField.fill(constants.testData.cLWord);
  await advertPage.verifyEveryDropdownElementHasText(constants.testData.word);
  let dropdownElementText = await advertPage.getTextFromDropdownElement(0);
  await advertPage.clickOnDropdownElement(0);
  await advertPage.verifyChoosedSymbolIsVisible(0);
  let selectedServiceText = await advertPage.getTextFromSelectedService(0);
  await expect(dropdownElementText).toEqual(selectedServiceText);
  await advertPage.fields.servicesField.clear();
  await expect(advertPage.elements.choosedServiceTitle).toHaveText(
    constants.serviceTab.serviceTitle
  );
  await expect(advertPage.buttons.removeButton).toBeVisible();
});

test("C632 - Verify entering spesial characters in the 'Послуги' field", async ({ advertPage }) => {
  await advertPage.buttons.servicesTab.click();
  await expect(advertPage.elements.servicesTabParagrahp).toBeVisible();
  await advertPage.fields.servicesField.fill("^{}<>");
  await advertPage.checkServicesFieldIsEmpty();
  await advertPage.fields.servicesField.fill(constants.testData.wordSpecialSymbols);
  await advertPage.verifyServicesFieldToHaveText(constants.testData.word);
});

test("C633 - Verify data length for 'Послуги' input field", async ({ advertPage }) => {
  await advertPage.buttons.servicesTab.click();
  await expect(advertPage.elements.servicesTabParagrahp).toBeVisible();
  await advertPage.fields.servicesField.fill(constants.testData.symbol);
  await advertPage.verifyEveryDropdownElementHasText(constants.testData.symbol);
  for (let i = 0; i <= 1; i++) {
    let dropdownElementText = await advertPage.getTextFromDropdownElement(i);
    await advertPage.clickOnDropdownElement(i);
    await advertPage.verifyChoosedSymbolIsVisible(i);
    let selectedServiceText = await advertPage.getTextFromSelectedService(i);
    await expect(dropdownElementText).toEqual(selectedServiceText);
  }
});

test("C634 - Verify the search function is not sensitive to upper or lower case", async ({ advertPage }) => {
  await advertPage.buttons.servicesTab.click();
  await expect(advertPage.elements.servicesTabParagrahp).toBeVisible();
  await advertPage.buttons.telegramCrossIcon.click();
  await advertPage.fields.servicesField.fill(constants.testData.lowerCase);
  await advertPage.verifyEveryDropdownElementHasText(constants.testData.lowerCase);
  let dropdownElementText = await advertPage.getTextFromDropdownElement(0);
  await advertPage.clickOnDropdownElement(0);
  await advertPage.verifyChoosedSymbolIsVisible(0);
  let selectedServiceText = await advertPage.getTextFromSelectedService(0);
  await expect(dropdownElementText).toEqual(selectedServiceText);
  await advertPage.clickOnRemoveButton(0);
  await advertPage.fields.servicesField.clear();
  await advertPage.fields.servicesField.fill(constants.testData.upperCase);
  await advertPage.verifyEveryDropdownElementHasText(constants.testData.upperCase);
  dropdownElementText = await advertPage.getTextFromDropdownElement(0);
  await advertPage.clickOnDropdownElement(0);
  await advertPage.verifyChoosedSymbolIsVisible(0);
  selectedServiceText = await advertPage.getTextFromSelectedService(0);
  await expect(dropdownElementText).toEqual(selectedServiceText);
});

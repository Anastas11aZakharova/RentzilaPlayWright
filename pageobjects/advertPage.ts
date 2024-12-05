import BasePage from './basePage';
import { Locator, Page } from '@playwright/test';
import { test, expect } from "../fixtures/fixtures";
import * as constants from "../data/constants.json";

export default class AdvertPage extends BasePage {
    private readonly servicesTab: Locator;
    private readonly servicesTabParagrahp: Locator;
    private readonly servicesField: Locator;
    private readonly servicesDropdown: Locator;
    private readonly servicesDropdownErrorMesage: Locator;
    private readonly createUnitButton: Locator;
    private readonly createUnitButtonPlus: Locator;
    private readonly dropdownElements: Locator;
    private readonly choosedSymbol: Locator;
    private readonly choosedService: Locator;
    private readonly removeButton: Locator;
    private readonly backButton: Locator;
    private readonly photoTab: Locator;
    private readonly tabList: Locator;
    private readonly nextButton: Locator;
    private readonly chooseServiceErrorMessage: Locator;
    private readonly servicesFieldBorder: Locator;
    private readonly servicesTabParagrahpAsterisk: Locator;
    private readonly clueLine: Locator;
    private readonly choosedServiceTitle: Locator;
    private readonly telegramCrossIcon: Locator;


    constructor(page: Page) {
        super(page);
        this.servicesTab = this.page.locator('button', { hasText: 'Послуги' })
        this.servicesTabParagrahp = this.page.getByText('Знайдіть послуги, які надає Ваш технічний засіб ');
        this.servicesField = this.page.getByPlaceholder('Наприклад: Рихлення грунту, буріння');
        this.servicesDropdown = this.page.locator('[class*=ServicesUnitFlow_searchedServicesCatWrapper]');
        this.servicesDropdownErrorMesage = this.page.getByTestId('p2-notFound-addNewItem');
        this.createUnitButton = this.page.getByTestId('btn-addNewItem');
        this.createUnitButtonPlus = this.page.getByTestId('svg-plus-addNewItem');
        this.dropdownElements = this.page.locator('[class*=ServicesUnitFlow_searchListItem]');
        this.choosedSymbol = this.page.locator("//button[@data-testid='unitServicesButton']//*[local-name()='svg']");
        this.choosedService = this.page.locator('[class*=ServicesUnitFlow_serviceText]');
        this.removeButton = this.page.getByTestId('remove-servicesUnitFlow');
        this.backButton = this.page.getByText('Назад');
        this.photoTab = this.page.locator('span', { hasText: 'Фотографії' })
        this.tabList = this.page.getByRole('tablist')
        this.nextButton = this.page.getByTestId('nextButton')
        this.chooseServiceErrorMessage = this.page.getByTestId('add-info')
        this.servicesFieldBorder = this.page.getByTestId('searchResult')
        this.servicesTabParagrahpAsterisk = this.page.locator("//div[@class='ServicesUnitFlow_paragraph__ATZCK']//span[text()='*']")
        this.clueLine = this.page.getByText('Додайте в оголошення принаймні 1 послугу');
        this.choosedServiceTitle = this.page.getByText('Послуги, які надає технічний засіб: ');
        this.telegramCrossIcon = this.page.getByTestId('crossIcon');
    }
    
    async clickOnServicesTab() {
       await this.servicesTab.click()
    }
    async verifyServicesTabParagrahpIsVisible() {
        await expect(this.servicesTabParagrahp).toBeVisible()
    }
    async enterInvalidDataInServicesField(text: string) {
        await this.servicesField.fill(text)
    }
    async verifyServicesDropdownIsVisible() {
        await expect(this.servicesDropdown).toBeVisible()
    }
    async verifyServicesDropdownErrorMessageIsVisible() {
        await expect(this.servicesDropdownErrorMesage).toBeVisible()
    }
    async verifyCreateUnitButtonIsVisible() {
        await expect(this.createUnitButton).toBeVisible()
    }
    async verifyCreateUnitButtonPlusIsVisible() {
        await expect(this.createUnitButtonPlus).toBeVisible()
    }
    async verifyCreateUnitButtonTextIsCorrect() {
        await expect(this.createUnitButton).toHaveText(constants.serviceTab.createUnit)
    }
    async clickOnCreateUnitButton() {
        await this.createUnitButton.click()
    }
    async verifyDropdownElementIsVisible() {
        await expect(this.dropdownElements).toBeVisible()
    }
    async verifyDropdownElementToHaveText(text: string) {
        await expect(this.dropdownElements).toHaveText(text)
    }
    async verifyChoosedSymbolIsVisible(number: number) {
        await expect(this.choosedSymbol.nth(number)).toHaveAttribute('width','15')
    }
    async enterDataInServicesField(text: string) {
        await this.servicesField.fill(text)
    }
    async verifyEveryDropdownElementHasText(text: string) {
        for(let i = 0; i < await this.dropdownElements.count(); i++){
          const initialText = await this.dropdownElements.nth(i).textContent()
          const upper =  initialText?.toUpperCase()
         expect(upper).toContain(text.toUpperCase())
        }
    }
    async clickOnDropdownElement(number: number) {
        await this.dropdownElements.nth(number).click()
    }
    async getTextFromDropdownElement(number: number) {
        return await this.dropdownElements.nth(number).textContent()
    }
    async getTextFromSelectedService(number: number) {
        return await this.choosedService.nth(number).textContent()
    }
    async clickOnRemoveButton(number: number) {
        await this.removeButton.nth(number).click()
    }
    async checkChoosedServiceIsNotVisible(number: number) {
        await expect(this.choosedService.nth(number)).not.toBeVisible()
    }
    async checkServicesTabParagrahpIsNotVisible(number: number) {
        await expect(this.servicesTabParagrahp.nth(number)).not.toBeVisible()
    }
    async verifyBackButtonToHaveText(text: string) {
        await expect(this.backButton).toHaveText(text)
    }
    async clickOnBackButton() {
        await this.backButton.click()
    }
    async verifyPhotoTabIsVisible() {
        await expect(this.photoTab).toBeVisible()
    }
    public async verifyLabelIsActive(label: string): Promise<boolean> {
        label = label.charAt(0).toUpperCase() + label.slice(1);
        let cls = await this.tabList
          .locator("//span[text()='" + label + "']//..//div[@data-testid='label']")
          .getAttribute("class");
        if (cls.includes("Active")) {
          return true;
        } else {
          return false;
        }
      }
    async verifyNextButtonToHaveText(text: string) {
        await expect(this.nextButton).toHaveText(text)
    }  
    async clickOnNextButton() {
        await this.nextButton.click()
    }
    async chooseServiceErrorMessageToHaveText(text: string) {
        await expect(this.chooseServiceErrorMessage).toHaveText(text)
    } 
    public async verifyServicesFieldBorderIsRed(): Promise<boolean> {
        let cls = await this.servicesFieldBorder.getAttribute("class");
        if (cls.includes("error")) {
          return true;
        } else {
          return false;
        }
      }
    async enterSpecialSymbolsInServicesField() {
        await this.servicesField.fill("^{}<>")
    }
    async checkServicesFieldIsEmpty() {
        await expect(this.servicesField).toHaveAttribute("value","")
    }
    async verifyServicesTabParagrahpAsteriskToHaveText(text: string) {
        await expect(this.servicesTabParagrahpAsterisk).toHaveText(text)
    } 
    async verifyClueLineToHaveText(text: string) {
        await expect(this.clueLine).toHaveText(text)
    }
    async verifyMagnifyingGlassIsVisible() {
        await expect(this.servicesField.locator('xpath=preceding-sibling::*')).toBeVisible()
    } 
    async verifyServicesFieldToHaveAttr() {
        await expect(this.servicesField).toHaveAttribute("placeholder","Наприклад: Рихлення грунту, буріння")
    } 
    async clearTheServicesField() {
        await this.servicesField.clear()
    } 
    async verifyChoosedServiceTitleToHaveText(text: string) {
        await expect(this.choosedServiceTitle).toHaveText(text)
    } 
    async verifyRemoveButtonIsVisible() {
        await expect(this.removeButton).toBeVisible()
    }
    async verifyServicesFieldToHaveText(text: string) {
        await expect(this.servicesField).toHaveAttribute("value",text)
    } 
    async clickOnTelegramCrossButton() {
        await this.telegramCrossIcon.click()
    }
}

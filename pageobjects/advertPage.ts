import BasePage from './basePage';
import { expect, Locator, Page } from '@playwright/test';

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

    constructor(page: Page) {
        super(page);
        this.servicesTab = this.page.getByText('Послуги');
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
        await expect(this.createUnitButton).toHaveText('Створити послугу')
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
    async enterLetterInServicesField(text: string) {
        await this.servicesField.fill(text)
    }
    async verifyEveryDropdownElementHasText(text: string) {
        for(let i = 0; i < await this.dropdownElements.count(); i++){
          const initialText = await this.dropdownElements.nth(i).textContent()
          const upper =  initialText?.toUpperCase()
         expect(upper).toContain(text)
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

}
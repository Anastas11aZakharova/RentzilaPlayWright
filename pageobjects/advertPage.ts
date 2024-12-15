import BasePage from "./basePage";
import { Locator, Page } from "@playwright/test";
import { expect } from "../fixtures/fixtures";
import * as constants from "../data/constants.json"; 

export default class AdvertPage extends BasePage {
  readonly fields: Record<string, Locator>;
  readonly buttons: Record<string, Locator>;
  readonly elements: Record<string, Locator>;

  constructor(page: Page) {
    super(page);
    this.fields = {
      servicesField: page.getByPlaceholder(
        "Наприклад: Рихлення грунту, буріння"
      )
    };

    this.buttons = {
      servicesTab: page.locator("button", { hasText: "Послуги" }),
      createUnitButton: page.getByTestId("btn-addNewItem"),
      createUnitButtonPlus: page.getByTestId("svg-plus-addNewItem"),
      removeButton: page.getByTestId("remove-servicesUnitFlow"),
      backButton: page.getByText("Назад"),
      nextButton: page.getByTestId("nextButton"),
      telegramCrossIcon: page.getByTestId("crossIcon")
    };
      
    this.elements = {
      servicesTabParagrahp: page.getByText(
        "Знайдіть послуги, які надає Ваш технічний засіб "
      ),
      servicesDropdown: page.locator(
        "[class*=ServicesUnitFlow_searchedServicesCatWrapper]"
      ), 
      servicesDropdownErrorMesage: page.getByTestId(
        "p2-notFound-addNewItem"
      ),
      dropdownElements: page.locator(
        "[class*=ServicesUnitFlow_searchListItem]"
      ),
      choosedSymbol: page.locator(
        "//button[@data-testid='unitServicesButton']//*[local-name()='svg']"
      ),
      choosedService: page.locator(
        "[class*=ServicesUnitFlow_serviceText]"
      ),
      photoTab: page.locator("span", { hasText: "Фотографії" }),
      tabList: page.getByRole("tablist"),
      chooseServiceErrorMessage: page.getByTestId("add-info"),
      servicesFieldBorder: page.getByTestId("searchResult"),
      servicesTabParagrahpAsterisk: page.locator(
        "//div[@class='ServicesUnitFlow_paragraph__ATZCK']//span[text()='*']"
      ),
      clueLine: page.getByText(
        "Додайте в оголошення принаймні 1 послугу"
      ),
      choosedServiceTitle: page.getByText(
        "Послуги, які надає технічний засіб: "
      ),
      magnifyingGlassIcon: this.fields.servicesField.locator("xpath=preceding-sibling::*")
    };
  }

  async verifyChoosedSymbolIsVisible(number: number) {
    await expect(this.elements.choosedSymbol.nth(number)).toHaveAttribute("width", "15");
  }

  async verifyEveryDropdownElementHasText(text: string) {
    for (let i = 0; i < (await this.elements.dropdownElements.count()); i++) {
      const initialText = await this.elements.dropdownElements.nth(i).textContent();
      const upper = initialText?.toUpperCase();
      expect(upper).toContain(text.toUpperCase());
    }
  }

  async clickOnDropdownElement(number: number) {
    await this.elements.dropdownElements.nth(number).click();
  }

  async getTextFromDropdownElement(number: number) {
    return await this.elements.dropdownElements.nth(number).textContent();
  }

  async getTextFromSelectedService(number: number) {
    return await this.elements.choosedService.nth(number).textContent();
  }

  async clickOnRemoveButton(number: number) {
    await this.buttons.removeButton.nth(number).click();
  }

  async checkChoosedServiceIsNotVisible(number: number) {
    await expect(this.elements.choosedService.nth(number)).not.toBeVisible();
  }

  async checkServicesTabParagrahpIsNotVisible(number: number) {
    await expect(this.elements.servicesTabParagrahp.nth(number)).not.toBeVisible();
  }

  public async verifyLabelIsActive(label: string): Promise<boolean> {
    label = label.charAt(0).toUpperCase() + label.slice(1);
    let cls = await this.elements.tabList
      .locator("//span[text()='" + label + "']//..//div[@data-testid='label']")
      .getAttribute("class");
    if (cls.includes("Active")) {
      return true;
    } else {
      return false;
    }
  }

  public async verifyServicesFieldBorderIsRed(): Promise<boolean> {
    let cls = await this.elements.servicesFieldBorder.getAttribute("class");
    if (cls.includes("error")) {
      return true;
    } else {
      return false;
    }
  }

  async checkServicesFieldIsEmpty() {
    await expect(this.fields.servicesField).toHaveAttribute("value", "");
  }

  async verifyMagnifyingGlassIsVisible() {
    await expect(
     this.elements.magnifyingGlassIcon
    ).toBeVisible();
  }

  async verifyServicesFieldToHaveAttr() {
    await expect(this.fields.servicesField).toHaveAttribute(
      "placeholder",
      constants.serviceTab.placeholderText
    );
  }

  async verifyServicesFieldToHaveText(text: string) {
    await expect(this.fields.servicesField).toHaveAttribute("value", text);
  }
}

import BasePage from "./basePage";
import { Locator, Page } from "@playwright/test";

export default class MyUnitsPage extends BasePage {
  readonly buttons: Record<string, Locator>;
  readonly elements: Record<string, Locator>;

  constructor(page: Page) {
    super(page);
    this.buttons = {
      units: page.getByTestId("units"),
      myUnits: page.getByText("Мої оголошення"),
      waiting: page.getByText("Очікуючі"),
    };
    this.elements = {
      firstUnitName: page.locator("[class*=OwnerUnitCard_name]").nth(0),
    };
  }
}

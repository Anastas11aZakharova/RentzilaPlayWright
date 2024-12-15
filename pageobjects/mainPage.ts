import BasePage from "./basePage";
import { Locator, Page } from "@playwright/test";
import * as dotenv from "dotenv";

dotenv.config();
const validEmail = process.env.MY_EMAIL || "default_email@example.com";
const validPassword = process.env.MY_PASSWORD || "default_password";

export default class MainPage extends BasePage {
  readonly fields: Record<string, Locator>;
  readonly buttons: Record<string, Locator>;
  readonly elements: Record<string, Locator>;

  constructor(page: Page) {
    super(page);
    this.fields = {
      emailOrPhoneNumberField: page.getByPlaceholder(
        "Введіть e-mail або номер телефону"
      ),
      passwordField: page.getByPlaceholder("Введіть пароль")
    };

    this.buttons = {
      createUnitButton: page.getByText("Подати оголошення"),
      loginButton: page.getByText("Вхід"),
      enterButton: page.getByRole("button", {
        exact: true,
        name: "Увійти",
      })
    };

    this.elements = {
        logo: page.locator("[class*=Navbar_logoWrapper]")
    };
  }
}

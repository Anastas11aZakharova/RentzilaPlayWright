import BasePage from './basePage';
import { expect, Locator, Page } from '@playwright/test';
import * as dotenv from "dotenv";

dotenv.config();
const validEmail = process.env.MY_EMAIL || "default_email@example.com";
const validPassword = process.env.MY_PASSWORD || "default_password";

export default class MainPage extends BasePage {
    private readonly createUnitButton: Locator;
    private readonly loginButton: Locator;
    private readonly enterButton: Locator;
    private readonly emailOrPhoneNumberField: Locator;
    private readonly passwordField: Locator;
    private readonly logo: Locator;
    private readonly createUnitTitle: Locator;
    
    constructor(page: Page) {
        super(page);
        this.createUnitButton = this.page.getByText('Подати оголошення');
        this.loginButton = this.page.getByText('Вхід');
        this.enterButton = this.page.getByRole('button',{exact:true, name: 'Увійти'});
        this.emailOrPhoneNumberField = this.page.getByPlaceholder('Введіть e-mail або номер телефону');
        this.passwordField = this.page.getByPlaceholder('Введіть пароль');
        this.logo = this.page.locator('[class*=Navbar_logoWrapper]');
        this.createUnitTitle = this.page.getByText('Створити оголошення');
    }
    
    async clickOnCreateUnitButton() {
       await this.createUnitButton.click()
    }
    async clickOnLoginButton() {
        await this.loginButton.click()
     }
    async verifyEnterButtonIsVisible() {
        await expect(this.enterButton).toBeVisible()
    }
    async enterEmailInEmailOrPhoneNumberField() {
        await this.emailOrPhoneNumberField.fill(validEmail)
    }
    async enterPasswordInPasswordField() {
        await this.passwordField.fill(validPassword)
    }
    async clickOnEnterButton() {
        await this.enterButton.click()
    }
    async verifyLogoIsVisible() {
        await expect(this.logo).toBeVisible()
    }
    async verifyCreateUnitTitleIsVisible() {
        await expect(this.createUnitButton).toBeVisible()
    }
}
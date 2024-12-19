import { test as base } from "@playwright/test";
import MainPage from "../pageobjects/mainPage";
import AdvertPage from "../pageobjects/advertPage";
import MyUnitsPage from "../pageobjects/myUnittPage";

type MyFixtures = {
  mainPage: MainPage;
  advertPage: AdvertPage;
  myUnitsPage: MyUnitsPage;
};

export const test = base.extend<MyFixtures>({
  mainPage: async ({ page }, use) => {
    const mainPage = new MainPage(page);
    await use(mainPage);
  },
  advertPage: async ({ page }, use) => {
    const advertPage = new AdvertPage(page);
    await use(advertPage);
  },
  myUnitsPage: async ({ page }, use) => {
    const myUnitsPage = new MyUnitsPage(page);
    await use(myUnitsPage);
  },
});

export const expect = test.expect;

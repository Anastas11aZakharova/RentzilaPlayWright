import { test as base } from "@playwright/test";
import MainPage from "../pageobjects/mainPage";
import AdvertPage from "../pageobjects/advertPage";

type MyFixtures = {
  mainPage: MainPage;
  advertPage: AdvertPage;
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
});

export const expect = test.expect;

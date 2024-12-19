import { test, expect } from "../fixtures/fixtures";
import * as dotenv from "dotenv";
import { faker } from "@faker-js/faker";
import axios from "axios";

dotenv.config();
const validEmail = process.env.MY_EMAIL || "default_email@example.com";
const validPassword = process.env.MY_PASSWORD || "default_password";
const baseUrl = process.env.BASE_URL || "base_url";
let config;
let unitId;
let unitName;

test.beforeAll(async ({}) => {
  const authBodyParameters = {
    email: validEmail,
    password: validPassword,
  };

  let response = await axios.post(
    baseUrl + "api/auth/jwt/create/",
    authBodyParameters
  );

  let token = response.data.access;
  config = {
    headers: { Authorization: `Bearer ` + token },
  };
  unitName = faker.string.alphanumeric(10);
  const unitBodyParameters = {
    category: 146,
    description: "",
    features: "",
    first_name: "",
    last_name: "",
    lat: 50.452542076439435,
    lng: 30.440231314860288,
    manufacturer: 363,
    minimal_price: 1000,
    model_name: "",
    money_value: "UAH",
    name: unitName,
    owner: 1774,
    payment_method: "CASH_OR_CARD",
    phone: "",
    services: [631],
    time_of_work: "",
    type_of_work: "HOUR",
  };
  response = await axios
    .post(baseUrl + "api/units/", unitBodyParameters, config)
    .catch((error) => {
      console.error("Error response:", error.response.data);
    });
  unitId = response.data.id;
});

test("Create unit API", async ({ mainPage, myUnitsPage }) => {
  await mainPage.goto("/");
  await mainPage.buttons.loginButton.click();
  await expect(mainPage.buttons.enterButton).toBeVisible();
  await mainPage.fields.emailOrPhoneNumberField.fill(validEmail);
  await mainPage.fields.passwordField.fill(validPassword);
  await mainPage.buttons.enterButton.click();
  await expect(mainPage.elements.logo).toBeVisible();
  await mainPage.buttons.myPage.click();
  await expect(myUnitsPage.buttons.units).toBeVisible();
  await myUnitsPage.buttons.units.click();
  await expect(myUnitsPage.buttons.myUnits).toBeVisible();
  await myUnitsPage.buttons.waiting.click();
  await expect(myUnitsPage.elements.firstUnitName).toHaveText(unitName);
});

test.afterAll(async ({}) => {
  await axios
    .delete(baseUrl + "api/units/" + unitId + "/", config)
    .catch((error) => {
      console.error("Error response:", error.response.data);
    });
});

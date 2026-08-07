// import{test,expect}from "@playwright/test"
// import { SauceLoginPage} from "../Pages/SauceLoginPage"
// import env from "../config/env.config.js";

// test("SauceDemo Login+Logout", async({page})=>{

//     const sauceloginpage =new SauceLoginPage(page);

//     await sauceloginpage.goto();
//     await sauceloginpage.login(  env.users.standard,
//         env.password);
//     await sauceloginpage.VerifyInventoryPage();
//     await sauceloginpage.logout();


// })
import { test, expect } from "../fixtures/baseFixture.js";
import Logger from "../utils/logger.js";

//Git Branch Practice
console.log("SauceLogin through VS command")

test("Verify Inventory Page", async ({ loggedInPage }) => {

    Logger.testStart("Verify Inventory Page should display successfully");

    try {

        await expect(loggedInPage).toHaveURL(/inventory/);

        Logger.testPass("Verify Inventory Page");

    } catch (error) {

        Logger.testFail("Verify Inventory Page", error.message);

        throw error; // Playwright ला test fail असल्याचं कळण्यासाठी

    }
});
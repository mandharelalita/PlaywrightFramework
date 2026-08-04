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

test("Verify Inventory Page", async ({ loggedInPage }) => {

    Logger.testStart("Verify Inventory Page");

    try {

        await expect(loggedInPage).toHaveURL(/wrongurl/);

        Logger.testPass("Verify Inventory Page");

    } catch (error) {

        Logger.testFail("Verify Inventory Page", error.message);

        throw error; // Playwright ला test fail असल्याचं कळण्यासाठी

    }
});
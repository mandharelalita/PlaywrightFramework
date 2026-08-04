import{test as base,expect} from "@playwright/test"
import {SauceLoginPage} from "../Pages/SauceLoginPage"
import env from "../config/env.config.js";
import { readJSON } from "../utils/dataReader.js";

//used for data driven testing scenario 
const users = readJSON("users.json");

const test = base.extend({
loginPage:async({page},use)=>{
    await use((new SauceLoginPage(page)))
},

loggedInPage :async({page},use)=>{
    const loginPage =new SauceLoginPage(page);
    await loginPage.goto();
    await loginPage.login(
        //used when data fetch from env file
       // env.users.standard, env.password
       //used fro data driven testing scenarios 
           users.standardUser.username,
            users.standardUser.password
    )

        await page.waitForURL(/inventory/)
        await use(page);
}
})
export { test, expect };
import{test,expect} from "@playwright/test"
import { BasePage } from "./BasePage"
import { ROUTES, TITLES } from "../utils/constants";
import env from "../config/env.config.js";
import Logger from "../utils/logger.js";


export class SauceLoginPage extends BasePage{
    constructor(page){
        super(page);

        //Login Page Locators 
        this.usernameInput=page.locator("#user-name");
        this.passwordInput=page.locator("#password");
        this.loginButton=page.locator("#login-button");

        //Inventory Page locators 
        this.pageTitle =page.locator(".title");
        this.menuButton = page.locator("#react-burger-menu-btn");
        this.logoutButton = page.locator("#logout_sidebar_link");
    }

    //Navigate to Saucedemo 
    async goto(){
        Logger.info("Opening SauceDemo application");
        await this.navigate(env.baseURL)
    }

    async login(username,password){
         Logger.info("Entering username");
         await this.type(this.usernameInput,username);
         Logger.info("Entering password");
         await this.type(this.passwordInput,password);
         Logger.info("Clicking Login button");
         await this.click(this.loginButton);

    }

    async VerifyInventoryPage(){
          Logger.info("Verifying Inventory Page");

        await expect(this.pageTitle).toHaveText(TITLES.PRODUCTS)
        //await expect(this.pageTitle).toHaveText("Dashboard")
        //OR 
        // await this.waitForVisible(this.pageTitle);
    }

    //Logout
    async logout(){
          Logger.info("Logging out");
          await this.click(this.menuButton);
          await this.click(this.logoutButton);
    }


}

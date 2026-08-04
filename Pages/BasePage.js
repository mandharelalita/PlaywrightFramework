export class BasePage{
    constructor(page){
        this.page=page;
    }
    //Navigate to URL 
    async navigate(url){
        await this.page.goto(url);
    }
    //Click on an element 
    async click(locator){
        await locator.click();
    }
    //Enter text into an inputfield 
    async type (locator,text){
        await locator.fill(text);
    }
    //get text from an element 
    async getText(locator){
        return await locator.textContent();
    }
    //wait until an element is visible 
    async waitForVisible(locator){
        await locator.waitFor({state : "visible"});
    }
    //get page title 
    async getTitle(){
       return await this.page.getTitle();
    }
    //get current url 
    async getURL(){
       return await this.page.getURL();
    }
    //Check whether an element is visible 
    async isVisible(locator){
      return await locator.isVisible();
    }
    //clear an inputfield 
    async clear(locator){
        await locator.clear();
    }
    //Press a keyboard key 
    async press(locator,key){
        await locator.press(key);
    }
    // Check a checkbox 
    async check(locator){
        await locator.check();
    }
    //Uncheck a checkbox 
    async Uncheck(locator){
        await locator.Uncheck();
    }
    //wait for pageload 
    async waitForLoad(){
        await this.page.waitForLoadState("load")
    }


}
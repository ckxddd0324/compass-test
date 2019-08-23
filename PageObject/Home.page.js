import Page from './Page';
import LoginModal from './Component/LoginModal.component';
import ListingRow from './Component/ListingRow.component';

class HomePage extends Page {

    //listing related locators
    get listingCard() { return $('div.uc-lolCardView-cardsContainer > div > uc-listing-card'); } 
    get listingRowTotal() { return $$('div.ag-body-viewport-wrapper > div > div > div'); }
    get listingFrame() { return $('iframe[class="listing-iframe"]'); }
    get listingFrameTitle() { return $("p[class='textIntent-title1']"); }
    get listingUrl() { return $(".uc-listingNavigation-externalLink"); }
    get listingFramePrice() { return $(`.u-flexContainer--row div[data-tn="listing-page-summary-price"] .textIntent-title2`); }
    get closeListingFrameBtn() { return $(".uc-listingNavigation-close"); }
    get nextListingBtn() { return $(`listing-navigation > button:nth-child(4) > span`); }

    //login related locators
    get loginBtn() { return $('button.uc-corpNav-button.uc-corpNav-menuItem.textIntent-caption1.uc-corpNav-authBtn.uc-corpNav-loginBtn'); }
    get loginModal() { return new LoginModal($('div.cx-authModal-body')) }
    get loginView() { return $('body > ui-view > main-search-view'); }

    //filter related locators
    get locationsFilterDropDown() { return $('uc-search-bar > uc-search-bar-toggle-menu:nth-child(6) > dl > dt > span'); } 
    get resultCount() { return $('div.uc-lolActionBar-results.textIntent-caption2 > div > span'); }
    get allManhattanOption() { return $('div.uc-searchBarTooAccordionMenuItemSections > search-select > div > div > div.searchFilter-section-container > div > label:nth-child(1)'); }

    //main body related locators
    get mainBodyListView() { return $('#center > div > div.ag-body > div.ag-body-viewport-wrapper > div > div'); }
    get priceSort() { return $('div > div > div:nth-child(4) > div.ag-header-cell-label'); }
    

    clickFilter(type) {
        const typeObj = {
            'locations': this.locationsFilterDropDown.click()
        }
        typeObj[type];
    }

    setFilter(filterType, filterOption) {
        const optionObj = {
            'allManhattanOption': this.allManhattanOption.click()
        }
        optionObj[filterOption]
    }


    switchToSecondaryFrame() {
        browser.waitUntil(() => { 
            return this.listingFrame.isExisting() === true
        }, 5000, 'Unable to locate the listing frame');

        browser.switchToFrame(this.listingFrame);
    }

    switchToMainFrame() {
        browser.switchToParentFrame();
    }

    loopOnListingRow(listingCount) {
        const exportData = [];

        for(let x = 1; x < listingCount; x++) {
            const obj = {}
            // listing row
            $(`div.ag-body-viewport-wrapper > div > div > div:nth-child(${x})`).click();
            //switch to listing iframe

            this.switchToSecondaryFrame();
            obj[`Top ${x.toString()} price`] = this.listingFramePrice.getText();

            browser.waitUntil(() => { 
                return this.listingFrameTitle.isDisplayedInViewport() === true
            }, 5000, 'Unable to load the listing title inside the listing frame');
            //switch back to main frame
            this.switchToMainFrame();

            this.listingUrl.waitForDisplayed();

            obj[`Top ${x.toString()} listing`] = this.listingUrl.getAttribute('href');
            
            this.closeListingFrameBtn.click();

            exportData.push(obj)
        }
        return exportData;
    }

    waitForListingRowLoaded() {
        browser.waitUntil(() => { 
            return this.listingRowTotal.length === 24;
        }, 5000, 'Unable to load all the row');
    }

    sortingOnSelection(option) {
        switch(option) {
            case 'ascending':
                this.waitForListingRowLoaded();
                this.priceSort.click();
                break;
            case 'descending':
                for(let x=0; x < 2; x++) {
                    this.waitForListingRowLoaded();
                    this.priceSort.click();
                }
                break;
        }
    }

    waitForMainBodyLoaded() {
        browser.waitUntil(() => { 
            return this.mainBodyListView.isExisting() === true;
        }, 5000, 'Unable to load the main body of the page');
    }
    
    loopingOnListViewWithNextBtn(listingCount) {
        $(`div.ag-body-viewport-wrapper > div > div > div:nth-child(1)`).click();

        const exportData = [];

        for(let x = 1; x < listingCount; x++) {
            const obj = {}
            // listing row
            //switch to listing iframe
            this.switchToSecondaryFrame();
            obj[`Top ${x.toString()} price`] = this.listingFramePrice.getText();

            browser.waitUntil(() => { 
                return this.listingFrameTitle.isDisplayedInViewport() === true
            }, 5000, 'Unable to load the listing title inside the listing frame');
            
            //switch back to main frame
            this.switchToMainFrame();

            this.listingUrl.waitForDisplayed();

            obj[`Top ${x.toString()} listing`] = this.listingUrl.getAttribute('href');
            
            this.nextListingBtn.click();

            exportData.push(obj)
            
        }
        return exportData;

    }

    clickNthRow(rowNum) {
        $(`div.ag-body-viewport-wrapper > div > div > div:nth-child(${rowNum})`).click();
    }

    
}

export default new HomePage();

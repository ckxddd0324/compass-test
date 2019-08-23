import HomePage from './../../PageObject/Home.page';
import { exportResultsToJson, createDirectory } from './../../helper/helper';

describe('Search for 5 most expansive sale listings in NYC', () => {

    beforeEach('login step', ()=> {
        HomePage.openUrl('https://www.compass.com/search/sales/nyc/');
        HomePage.loginBtn.click();
        HomePage.loginModal.login();
        HomePage.waitForMainBodyLoaded();    
    });

    afterEach('logout step', ()=> {
        browser.deleteCookies();
    });

    it('looping on opening each listing and get the listing url from listing iframe', () => {
        // TODO: go to the 'https://www.compass.com/search/sales/nyc/' again
        // because once the user is logined, the url param is set with multiple location
        // including Long island and westchester ny
        HomePage.openUrl('https://www.compass.com/search/sales/nyc/');
        
        HomePage.clickFilter('locations');
        HomePage.setFilter('allManhattanOption');
        HomePage.sortingOnSelection('descending');

        // Looping on getting the 5 most expansive sale listings
        const exportData = HomePage.loopOnListingRow(6);

        // print the top 5 listing on the console
        console.log('******Test 1 Result Output******')
        console.log(JSON.stringify(exportData, null, 4));
        console.log('**************END********************')

        // export the top 5 listing to json
        exportResultsToJson('topFiveListingWithClickingRows', exportData);
    });

    it('looping on opening each listing and get the listing url from listing iframe', () => {
        // TODO: go to the 'https://www.compass.com/search/sales/nyc/' again
        // because once the user is logined, the url param is set with multiple location
        // including Long island and westchester ny
        HomePage.openUrl('https://www.compass.com/search/sales/nyc/');
        
        HomePage.clickFilter('locations');
        HomePage.setFilter('allManhattanOption');
        HomePage.sortingOnSelection('descending');

        //click first row from the listing view
        const exportData = HomePage.loopingOnListViewWithNextBtn(6);

        console.log('******Test 2 Result Output******')
        console.log(JSON.stringify(exportData, null, 4));
        console.log('**************END********************')

        exportResultsToJson('topFiveListingWithNextBtn', exportData);
    });
});
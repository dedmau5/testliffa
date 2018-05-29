//import { baseUrls } from "../confs/urls";
import { getElements, getTextAsInteger } from '../../../tools/elements';
import { Translate } from '../../../tools';
import PageBase from '../../../pages/page-base.js';

import Auth from '../../../auth.js';
import { LoginPage } from '../../../pages/login-page';
import { validateLocaleAndSetLanguage } from "../../../node_modules/typescript";


/**
 * pageobject for payment startpage.
 */
class payment_startpage{
    constructor(){
        this.selectors = {  
            loaded1:".checkout__progress-container",
            loaded2:".thanks_panel--inner-containers",
            loaded3:"#rememberMeDeviceUnknown",
            paymentDropdown:".webui-list-box__select",
            amount:"50",
            endPayment:".payment_information__section_upcomingPayments :nth-child(2) .payment_information__section_upcomingPayments_item_right",
            depositPayment:".payment_information__section_upcomingPayments :last-child .payment_information__section_upcomingPayments_item_right",
            paymentPrice:".payment_information__section_total",
            paidPayment:".payment_information__left_offset > div :nth-child(2) > b",
            restPayment:".payment_information__section_left_to_pay",
            FullPayment:" .FULL_PAYMENT + .payment__payment-type-pill--selected",
            DepositPayment:".DEPOSIT_PAYMENT+.payment__payment-type-pill"
        };
    }

    navigateTo(){
        //  browser.url("http://acs-preprod.prod.int/checkout/payment?paymentKey=1561aa7a-1c2f-44b3-aafc-fb9a92131f4f");
        //  browser.url("https://checkout.dev.int/payment?paymentKey=e3cf936a-ccd5-4960-9768-56a01df31ff1&modelVersion=1");
        browser.url("http://checkout.dev.int/payment?paymentKey=31a24e94-76fe-42d6-86ae-d558f9538181&modelVersion=1");
        this.verifyPage('1');
    }

    verifyPage(page){
        switch(page){
        case '1':
            this.waitUntilLoaded(this.selectors.loaded1);
            break;
        case '2':
            this.waitUntilLoaded(this.selectors.loaded2);
            break;
        }
    }

    verifyNets(){
        this.waitUntilLoaded(this.selectors.loaded3)
    }

    waitUntilLoaded(loaded){
        browser.waitForExist(loaded);
    }

    //Choose installment, deposit or full payment
    choosePaymentModule(belopp){
        let betalning = (`.payment_typelist--component div[class="${belopp}"]`);
        switch(belopp){
        case 'FULL_PAYMENT':        //hela beloppet
            browser.click(betalning);
            browser.pause(1000);
            break;
        case 'INSTALLMENT_PAYMENT': //delbelopp
            browser.click(betalning);
            browser.pause(10000);
            console.log('nu ska vi betala');
            this.enterAmount();
            break;
        case 'DEPOSIT_PAYMENT':     //anmälningsavgift
            browser.click(betalning);
            browser.pause(1000);
            break;    
        }
        
      //  var type = Math.floor(Math.random() * (6 - 3 + 1)) + 3;
      //  this.choosePaymentType(type);
      //  browser.click('');      //klicka på gå vidare till betalningsalternativet
    }
    
    enterAmount(){
        console.log('nu ska vi snart betala');
        const enterAmount=browser.element('input[type="number"]');//('.payment__number-input');//('#installmentPayment'); //('.payment__number-input');
            browser.pause(1000);
            enterAmount.setValue(this.selectors.amount);
            console.log('blev det något');
            browser.pause(1000);
    }

    openGiftCardDropDownBar(){
        browser.click('.payment__container .payment_giftcard--header-wrapper');
        browser.pause(1000);
        let a = '#giftcardNumber';
        let giftCardNr ='0166768755788256';   //0       //hämta numren via script eller hårdkoda.. kräver uppdateringar så småningom
        this.enterGiftCardCredentials(a, giftCardNr); //   var type = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
        
        let b = '#giftCardCode';
        let safetyCode = '25106'
        this.enterGiftCardCredentials(b, safetyCode);

        browser.click('.payment_giftcard--button button');
        browser.pause(1000);
        let c ='#giftCardAmount';
        let amount='10';
        this.enterGiftCardCredentials(c, amount);
        
        browser.click('.payment_giftcard--button button');

    }

    enterGiftCardCredentials(selector, number){
        browser.pause(1000);
        console.log('letar efter fält att fylla i');
        const enterNumber=browser.element(selector);
        console.log('fyller i nummer i', selector);
        enterNumber.setValue(number);
        console.log('numret ifyllt');
        browser.pause(1000);
    }

    choosePaymentType(type){
        browser.pause(1000);
        let dropDownSelector = this.selectors.paymentDropdown;
        browser.click(`label[for="${type}"] .webui-radiobutton__circle`);
        switch (type){
            case '5':
              //default-värde
                browser.pause(1000);
                break;
            case '3':
                browser.click(dropDownSelector);     //behövs ej, men emulerar användare...
                browser.pause(10000);
                browser.click("#paymentPlans option[value='306']")
                browser.pause(10000);
                break;
            case '4':
                browser.click(dropDownSelector);     //behövs ej, men emulerar användare...
                browser.pause(10000);
                browser.click("#paymentTypes option[value='SEB']");
                browser.pause(10000);    
                break;
        }
        browser.pause(1000);
        this.continueToNetsPayment();
    }

    continueToNetsPayment(){
        browser.pause(10000);
        browser.click('.payment_item--container button');
        browser.pause(10000);
    }

    netsPayment(choice){
        switch(choice){
            case 'cancelButton':
                console.log('cancellering på gång', choice);
                browser.pause(1000);
                break;
            case 'okButton':
                console.log("går vidare och betalar", choice);
                browser.pause(10000);
                break;
        }
        browser.pause(1000);   
        console.log('klickar på nets-knapp') 
        browser.click(`#${choice}`);    
    }

    enterCardNumber(){
        console.log("framme i entercardnumber")
        browser.pause(10000);
        this.waitUntilLoaded(this.selectors.loaded3);
        browser.setValue('#cardNumber', '4925000000000004');
        browser.selectByValue('#month', '05');
        browser.setValue('#securityCode', '123');
    }

    newPayment(){
        browser.pause(10000);
        console.log('väntar på att tack-sidan ska laddas.')
//        browser.click('.payment_information__button-div button[type="button"]');
        browser.click('.webui-button');
        browser.pause(10000);       //den timear ut... kolla vad som sker
    }

    verifyPrices(page){
        switch (page){
            case 'thanks':
                console.log(page);
                var arr = [this.selectors.endPayment, this.selectors.depositPayment, this.selectors.paymentPrice, this.selectors.paidPayment, this.selectors.restPayment]
                var neWa = [];
                this.getAllNumbers(arr, neWa);
                console.log('hela arrayen', neWa);
                this.countPrices(neWa);
                console.log('första räkningen');
                break;
            case 'payment':
                console.log(page);
                var arr = [this.selectors.endPayment, this.selectors.depositPayment, this.selectors.paymentPrice, this.selectors.paidPayment, this.selectors.restPayment, this.selectors.FullPayment, this.selectors.DepositPayment]
                var neWa = [];
                this.getAllNumbers(arr, neWa);
                console.log('hela arrayen', neWa);
                this.countPrices(neWa);
                console.log('räknat');
                this.comparePrices(neWa);
                console.log('jämfört');
                break;
        }
    }

    getAllNumbers(arr, neWa){
        for(var i of arr){
            console.log(arr.length);
            var number = browser.getText(`${i}`);
            console.log(i,"tillbaka med slutsumman", number);
            neWa.push(this.turnTextIntoNumber(number));
            console.log(i,"tvättat via funktion",neWa);
        }
    }

    turnTextIntoNumber(text){
        console.log("tillbaka med siffror i ett annant ställe", text);
        var regExp = new RegExp('\\D','gm');
        var newText = text.replace(regExp, '');
        console.log(newText);
        return parseInt(newText);
    }

    countPrices(neWa){
        console.log('exporterad array för räkning', neWa);
        if(neWa[0]+neWa[1]+neWa[3]===neWa[2]){
            console.log('Priserna stämmer överens.', neWa[2]);
        }   
        else {
            console.log('Priserna stämmer inte överens.', neWa[2]);  
        }
        if(neWa[2]-neWa[3]===neWa[4]){
            console.log('"Kvar att betala" stämmer mot vad du redan har betalt.', neWa[4]);
        }   
        else {
            console.log('"Kvar att betala" stämmer inte mot vad du redan har betalt.', neWa[4]);  
        }
    }

    comparePrices(neWa){
        console.log('exporterad array för jämförelse', neWa);
        if(neWa[4]==neWa[5]){
            console.log('the price is correct')
        } 
        else {
            console.log('11111 det stämmer inte', neWa[4], neWa[5]); 
        }
        if(neWa[0]==neWa[6]){
            console.log('the price is correct')
        }
        else {
            console.log('11111 det stämmer inte', neWa[0], neWa[6]); 
        }
    }

}
export default new payment_startpage();
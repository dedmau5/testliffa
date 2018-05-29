import payment_startpage  from '../../../pages/apps/payment/payment_startpage.js';
import Auth from '../../../auth.js';
//import Auth from '../auth_pbc';
import { LoginPage } from '../../../pages/login-page';

//import { CanLogin, CanLogout } from 'tests/system/sanity/login-logout/login-logout.js';
//import { textChangeRangeIsUnchanged } from '../node_modules/typescript';



describe("Opens startpage", ()=> {

//ladda bokning med script
/*
    it("Load and verify startpage", ()=> {
        payment_startpage.navigateTo();
    })

    it("Choose full payment.", ()=> {
        payment_startpage.choosePaymentModule('FULL_PAYMENT');
    })

    // Siffror avgör typ av betalningssätt; 
    // VHC='3', bank='4', card='5'
    it("Choose payment type; VHC.", ()=> {
        payment_startpage.choosePaymentType('3');
    })

    //abort or continue  cancelButton/okButton                                                             
    it("Choose wether to continue or abort payment; cancel", ()=> { 
        payment_startpage.netsPayment('cancelButton');
    })

    it("Return to payment options", ()=> {
        payment_startpage.newPayment();
    })*/
    
    it("Choose installment payment.", ()=> {
        payment_startpage.choosePaymentModule('INSTALLMENT_PAYMENT');
    })

    // VHC='3', bank='4', card='5'
    it("Choose payment type; card.", ()=> {
        payment_startpage.choosePaymentType('5');
    })
 
    it('Wait for Nets to load.', ()=>{
    payment_startpage.verifyNets();
    })
/*
    it('', ()=>{
        payment_startpage.enterCardNumber();
    })
*/
    it('Submit card credentials', function () {
        browser.setValue('#cardNumber', '4925000000000004');
        browser.selectByValue('#month', '05');
        browser.setValue('#securityCode', '123');
        browser.submitForm('#form1');
    });

    //abort or continue  cancelButton/okButton                                                             
    it("Choose wether to continue or abort payment; continue.", ()=> { 
    payment_startpage.netsPayment('okButton');
    })
   
    it('Load and verify thank-you-page', ()=> {
        payment_startpage.verifyPage('2');
    })

    it("Verify prices after payment.", ()=>{
        console.log('nu då');
        payment_startpage.verifyPrices('thanks');
    })
        
    it("Return to payment options.", ()=> {
        payment_startpage.newPayment();
    })

    it("Verify prices before a new payment is done.", ()=>{
        payment_startpage.verifyPrices('payment');
    })
/*
    it("Pay with a giftcard.", ()=> {
        payment_startpage.openGiftCardDropDownBar();
    })  
        
    it('Load and verify payment-page', ()=> {
        payment_startpage.verifyPage('2');
    })
    
    it("Verify prices after payment", ()=>{
        payment_startpage.verifyPrices('thanks');
    })

    it("Return to payment options.", ()=> {
        payment_startpage.newPayment();
    })

    it("Verify prices before another payment is done.", ()=>{
        payment_startpage.verifyPrices('payment');
    })

    it("Choose full payment.", ()=> {
        payment_startpage.choosePaymentModule('DEPOSIT_PAYMENT');
    })
/*
    // VHC='3', bank='4', card='5'
    it("Choose payment type; card.", ()=> {
        payment_startpage.choosePaymentType('4');
    })

    //abort or continue  cancelButton/okButton 
    it("Choose wether to continue or abort payment; cancel.", ()=> {    
        payment_startpage.netsPayment('cancelButton');
    })
*/

    //betala med bank, avbryt och delbetala med presentkort 
    //(eventuellt hämta kortnummer), verifiera att rätt summa
    //dragits och att slutsumma och anmälningsavgift räknats ner.
    //betala anmälningsavgift med kort gå tillbaka och 
    //betala resten, verifiera att betalning är gjord.
    //Avboka resan.


})
import moment from 'moment';
import chalk from 'chalk';
const log = console.log;

import { getRandomIntegerBetween, Translate } from "../../../../../tools/index.js";
import { DynamicPackagingTranslations } from "../../../../../localization/booking/dynamic-packaging/index.js";
import { HandleTheNameCollection } from "../../common/name-collection/index.js";
import { CanConfirmTheBooking } from "../../common/booking/can-confirm-the-booking.js";

import { StartPage } from "../../../../../pages/start-page.js";
import { Cruises } from "../../../../../pages/apps/cruises/index";
import { Cruise } from "../../../../../pages/apps/cruises/cruise";
import { GenericBookingStart } from "../../../../../pages/apps/generic-booking-start";
import { Settings } from "../../../../../pages/apps/generic-booking-start/settings";
import DynamicPackagingBooking from "../../../../../pages/booking/dynamic-packaging/index.js";


const browserName = browser.options.desiredCapabilities.browserName;
let sharedData = {
    cruiseName: "",
    duration: "",
    cabins: [],
    flights: [],
    totalPrice: 0,
    adults: 0,
    agesOfChildren: new Array()
};

describe('Cruise to Caribbean', () => {
// let CruiseToCaribbean = class CruiseToCaribbean {

    // before() {
    //     StartPage.open();
    //     browser.pause(3000); // To allow the asynchronous DOM to finish rendering.
    // }

    it("Can make Booking Start settings and perform a search (Cruise)", () => {
        const BookingStart = new GenericBookingStart();

        const From = moment()
            .add(3, "months");
        From.add(Math.floor(Math.random() * From.daysInMonth()), "days");

        const settings = new Settings.Cruise({
            departFrom: Translate({
                dk: "København",
                fi: "Helsinki",
                no: "Oslo",
                se: "Stockholm",
                globe: "Stockholm"
            }),
            destination: Translate({
                dk: "Caribien",
                fi: "Karibia",
                no: "Karibia",
                se: "Karibien",
                globe: "Karibien"
            }),
            date: {
                From: From,
                AllowChoosingNearbyDates: true,
                NumberOfNearbyMonthsToAllow: 3
            },
            travellers: {
                AdultsAndChildren: Translate({
                    dk: "2 voksne, 2 børn",
                    fi: "2 aikuista, 2 lasta",
                    no: "2 voksne, 2 barn",
                    se: "2 vuxna, 2 barn",
                    globe: "2 vuxna, 2 barn"
                }),
                Children: [6, 10]
            },
        });

        BookingStart.waitUntilLoaded();
        BookingStart.performSettings(settings);

        if (Array.isArray(settings.travellers.Children)) {
            // Reversing the list to make sure we can pop() the first child's age first.
            sharedData.agesOfChildren = settings.travellers.Children.reverse();
        }

        log(chalk.underline.cyan("\nSearch Settings"));
        log(`Depart from is set to ${chalk.bold(settings.departFrom)}`);
        log(`Destination is set to ${chalk.bold(settings.destination)}`);
        log(`${chalk.bold("Date")}`);
        log(`  is set to ${chalk.bold(From.toLocaleString())}`);
        log(`  allow choosing nearby dates: ${chalk.bold(settings.date.AllowChoosingNearbyDates)}`);
        log(`  number of nearby months to allow: ${chalk.bold(settings.date.NumberOfNearbyMonthsToAllow)}`);
        log(`${chalk.bold("Travellers")}`);
        log(`  adults and children: ${chalk.bold(settings.travellers.AdultsAndChildren)}`);
        log(`  ages of children: ${chalk.bold(settings.travellers.Children)}\n`);

        BookingStart.search();
    });

    it("Can View Cruises for the Caribbean", () => {
        Cruises.waitForCruisesPage();
        Cruises.waitForCruises();
        expect(Cruises.isCruiseListEmpty()).to.equal(false);
    });

    it("Can Choose a Cruise", () => {
        const cruises = Cruises.cruises;
        const cruise = cruises[getRandomIntegerBetween(0, cruises.length)];
        cruise.button.click();
        Cruise.waitForCruisePage();
    });

    it("Can See the Cruise's Travel Information, Book the Cruise and Handle a Sudden Change of Price", () => {
        for (let i = 0; i < 10; i++) {
            const cabins = Cruise.cabins;
            expect(cabins).to.not.be.empty;
            sharedData.cabins = cabins;

            const flights = Cruise.flights;
            expect(flights).to.not.be.empty;
            sharedData.flights = flights;

            sharedData.cruiseName = Cruise.cruiseName;
            sharedData.duration = Cruise.duration;
            sharedData.totalPrice = Cruise.totalPrice;

            log(chalk.underline.cyan("\nCruise Information"));
            log(`Name: ${chalk.bold(sharedData.cruiseName)}`);
            log(`Duration: ${chalk.bold(sharedData.duration)}`);
            log(`Total price: ${chalk.bold(sharedData.totalPrice)}`);
            log(`Number of cabin choices: ${chalk.bold(cabins.length)}`);
            log(`Number of flights: ${chalk.bold(flights.length)}\n`);

            Cruise.buttons.book.click();

            browser.pause(1000);

            if (Cruise.loadingScreen.isExisting()) {
                Cruise.loadingScreen.waitUntilItDisappears();

                browser.pause(100);

                let isInNameCollection, isInCruiseBooking;

                browser.waitUntil(() => {
                    isInNameCollection = browser.getUrl().includes("/passengerdetails");
                    isInCruiseBooking = Cruise.cabins.length !== 0 && Cruise.flights.length !== 0;
                    return isInNameCollection || isInCruiseBooking;
                }, 60000);

                if (isInNameCollection) {
                    break;
                }
            }
        }
    });

    it("Can Handle the Name Collection", () => {
        HandleTheNameCollection(sharedData, { mode: "dynamic-packaging" });
    });

    it("Can Confirm the Booking", () => {
        if (browserName !== "MicrosoftEdge") {
            CanConfirmTheBooking(sharedData, DynamicPackagingBooking, DynamicPackagingTranslations);
        }
    });
});
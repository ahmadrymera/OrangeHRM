/// <reference types="cypress" />

const { Given, Then, When, Step } = require("@badeball/cypress-cucumber-preprocessor");
const { faker } = require("@faker-js/faker");
let firstName, middleName, lastName, userName, password;

/**
 * Navigate to the login page
 * and enter credential with following data
 * and click on the login button
 * and verify the user should redirected to the dashboard page
 * 
 * this re-using step in common.js
 * 
 * @param {object} dataTable - The data table
 * 
 * @example
 * Given the user login using the following credentials:
      | username | Admin    |
      | password | admin123 |
 */
Given("the user login using the following credentials:", function (dataTable) {
  Step(this, "the user navigates to the login page");
  Step(this, "the user enters credentials with the following data:", dataTable);
  Step(this, "the user clicks on the login button");
  Step(this, "the user should redirected to the dashboard page");
});

/**
 * Navigate to the dashboard page
 * and select menu in the left menu
 *
 * @param {string} menu - The menu name
 *
 * @example
 * When the user selects "PIM" in the left menu
 */
When("the user selects {string} in the left menu", (menu) => {
  let header = {
    PIM: "Employee Information",
    Admin: "System Users",
  };
  cy.get(".oxd-main-menu-item").contains(menu).click();
  cy.get(".oxd-table-filter-header", { timeout: 10000 }).should("be.visible").should("contain.text", header[menu]);
});

/**
 * Add new employee with following data
 * 
 * @param {object} dataTable - The data table
 * 
 * @example
 * When the user adds new employee with following data:
      | firstname | random |
      | middlename | random |
      | lastname | random |
 */
When("the user adds new employee with following data:", (dataTable) => {
  // set random data
  firstName = faker.person.firstName();
  middleName = faker.person.middleName();
  lastName = faker.person.lastName();
  userName = firstName + middleName + lastName + faker.number.int({ max: 100000 });
  password = faker.internet.password() + faker.number.int({ max: 100000 });

  cy.get(".orangehrm-header-container > .oxd-button", { timeout: 10000 }).should("be.visible").click();
  let data = dataTable.rowsHash();
  if (data["firstname"])
    cy.get('[name="firstName"]', { timeout: 10000 })
      .should("be.visible")
      .type(data["firstname"].includes("random") ? firstName : data["firstname"], {
        parseSpecialCharSequences: false,
      });
  if (data["middlename"])
    cy.get('[name="middleName"]', { timeout: 10000 })
      .should("be.visible")
      .type(data["middlename"].includes("random") ? middleName : data["middlename"], {
        parseSpecialCharSequences: false,
      });
  if (data["lastname"])
    cy.get('[name="lastName"]', { timeout: 10000 })
      .should("be.visible")
      .type(data["lastname"].includes("random") ? lastName : data["lastname"], {
        parseSpecialCharSequences: false,
      });

  cy.get(".oxd-grid-2")
    .find(".oxd-input")
    .clear()
    .type(faker.number.int({ max: 100000 }));

  cy.get(".oxd-button--secondary").contains("Save").click();
  cy.get(".oxd-toast-content").should("contain.text", "Successfully Saved");
  cy.get(".orangehrm-edit-employee-name", { timeout: 10000 })
    .should("be.visible")
    .should("contain.text", firstName + " " + lastName);
});

/**
 * Add new system user with new employee data
 *
 * @param {string} userType - The user type
 * @param {string} status - The status
 *
 * @example
 * When the user adds new "Admin" system user with "Active" status based on the new employee data
 *
 */
When(
  "the user adds new {string} system user with {string} status based on the new employee data",
  (userType, status) => {
    let selectStatus = {
      Active: "Enabled",
      Inactive: "Disabled",
    };
    cy.get(".orangehrm-header-container > .oxd-button", { timeout: 10000 }).should("be.visible").click();
    cy.get(".oxd-label")
      .contains("User Role")
      .parentsUntil(".oxd-grid-item")
      .find(".oxd-select-wrapper")
      .click()
      .find(".oxd-select-dropdown")
      .contains(userType)
      .click();

    cy.get(".oxd-label")
      .contains("Status")
      .parentsUntil(".oxd-grid-item")
      .find(".oxd-select-wrapper")
      .click()
      .find(".oxd-select-dropdown")
      .contains(selectStatus[status])
      .click();

    cy.get(".oxd-autocomplete-text-input > input").type(firstName + " " + middleName + " " + lastName);
    cy.get(".oxd-autocomplete-option", { timeout: 10000 })
      .contains(firstName + " " + middleName + " " + lastName)
      .click();

    cy.get(".oxd-label").contains("Username").parentsUntil(".oxd-grid-item").find(".oxd-input").type(userName);
    cy.get(".oxd-label").contains("Password").parentsUntil(".oxd-grid-item").find(".oxd-input").type(password);
    cy.get(".oxd-label").contains("Confirm Password").parentsUntil(".oxd-grid-item").find(".oxd-input").type(password);
    cy.get(".oxd-button--secondary").contains("Save").click();
    cy.get(".oxd-toast-content").should("contain.text", "Successfully Saved");
    cy.get(".oxd-table-filter-header", { timeout: 10000 }).should("be.visible").should("contain.text", "System Users");
  }
);

/**
 * Verify the new system user should be able to login
 *
 * @param {string} status - The status
 *
 * @example
 * Then the new system user should be "success" to login
 * Then the new system user should be "failed" to login
 */
Then("the new system user should be {string} to login", function (status) {
  cy.get(".oxd-userdropdown-tab").click();
  cy.get(".oxd-userdropdown-link").should("be.visible").contains("Logout").click();
  cy.get(".orangehrm-login-branding", { timeout: 10000 }).should("be.visible");
  if (status.toLowerCase() == "success") {
    Step(this, "the user navigates to the login page");
    Step(this, `the user enter "${userName}" as username`);
    Step(this, `the user enter "${password}" as password`);
    Step(this, "the user clicks on the login button");
    Step(this, "the user should redirected to the dashboard page");
  } else if (status.toLowerCase() == "failed") {
    Step(this, "the user navigates to the login page");
    Step(this, `the user enter "${userName}" as username`);
    Step(this, `the user enter "${password}" as password`);
    Step(this, "the user clicks on the login button");
    Step(this, `the user should see the error message "Account disabled"`);
  }
});

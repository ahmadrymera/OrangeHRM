/// <reference types="cypress" />

const { Given, Then, When, Step } = require("@badeball/cypress-cucumber-preprocessor");

/**
 * Navigate to the login page
 *
 * @example
 * Given the user navigates to the login page
 */
Given("the user navigates to the login page", () => {
  cy.visit("/");
});

/**
 * Enter credential with following data
 * 
 * @param {object} dataTable - The data table
 * 
 * @example
 *  When the user enters credentials with the following data:
      | username | Admin    |
      | password | admin123 |
 * 
*/
When("the user enters credentials with the following data:", (dataTable) => {
  let credential = dataTable.rowsHash();
  if (credential["username"]) cy.get('[name="username"]', { timeout: 10000 }).type(credential["username"]);
  if (credential["password"]) cy.get('[name="password"]', { timeout: 10000 }).type(credential["password"]);
});

/**
 * Enter username
 * 
 * @param {string} username - The username
 * 
 * @example
 * When the user enter "Admin" as username
 */
When("the user enter {string} as username", (username) => {
  cy.get('[name="username"]', { timeout: 10000 }).type(username)
})

/**
 * Enter password
 * 
 * @param {string} password - The password
 * 
 * @example
 * When the user enter "admin123" as password
 */
When("the user enter {string} as password", (password) => {
  cy.get('[name="password"]', { timeout: 10000 }).type(password)
})

/**
 * Click on the login button
 *
 * @example
 * When the user clicks on the login button
 */
When("the user clicks on the login button", () => {
  cy.get('button[type="submit"]').click();
});

/**
 * Verify the error message
 * @param {string} message - The error message
 *
 * @example
 * Then the user should see the error message "Invalid credentials"
 */
Then("the user should see the error message {string}", (message) => {
  cy.get(".orangehrm-login-error").find("p").should("contain", message);
});

/**
 * Verify the field should show required message
 *
 * @example
 * Then the field should show required message
 */
Then("the field should show required message", () => {
  cy.get(".oxd-input-group > .oxd-text").should("contain", "Required");
});

/**
 * Verify the dashboard page
 *
 * @example
 * Then the user should redirected to the dashboard page
 */
Then("the user should redirected to the dashboard page", () => {
  cy.url().should("include", "/dashboard");
  cy.get(".oxd-topbar-header-title", { timeout: 10000 }).should("contain", "Dashboard");
});

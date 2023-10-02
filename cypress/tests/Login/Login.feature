@login
Feature: Login

  As a user,
  I want to be able to login to the application
  so that I can access my account.

  Scenario Outline: Failed login with wrong "<scenario>"
    Given the user navigates to the login page
    When the user enters credentials with the following data:
      | username | <username> |
      | password | <password> |
    And the user clicks on the login button
    Then the user should see the error message "<message>"

    Examples:
      | scenario            | username      | password | message             |
      | username            | administrator | admin123 | Invalid credentials |
      | password            | Admin         | root     | Invalid credentials |
      | username & password | administrator | root     | Invalid credentials |

  Scenario Outline: Failed login with empty <field>
    Given the user navigates to the login page
    When the user enters credentials with the following data:
      | username | <username> |
      | password | <password> |
    And the user clicks on the login button
    Then the field should show required message

    Examples:
      | field    | username | password | message             |
      | username |          | admin123 | Invalid credentials |
      | password | Admin    |          | Invalid credentials |

  Scenario: Successful login with valid credentials
    Given the user navigates to the login page
    When the user enters credentials with the following data:
      | username | Admin    |
      | password | admin123 |
    And the user clicks on the login button
    Then the user should redirected to the dashboard page
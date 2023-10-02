@add-user
Feature: Add User

  As a user,
  I want to be able to add a new user to the system.
  so that I can add new users to the system.

  Scenario Outline: Success add <userType> User with <status> status
    Given the user login using the following credentials:
      | username | Admin    |
      | password | admin123 |
    When the user selects "PIM" in the left menu
    And the user adds new employee with following data:
      | firstname  | random |
      | middlename | random |
      | lastname   | random |
    And the user selects "Admin" in the left menu
    And the user adds new "<userType>" system user with "<status>" status based on the new employee data
    Then the new system user should be "<loginStatus>" to login

    Examples:
      | userType | status   | loginStatus |
      | Admin    | Active   | Success     |
      | ESS      | Active   | Success     |
      | Admin    | Inactive | Failed      |
      | ESS      | Inactive | Failed      |

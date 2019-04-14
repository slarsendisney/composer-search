Feature: checkTitle
  In order write BDD tests
  As a developer
  I want check the page's title
  
  Scenario: Check title
    When  I open the url "http://fullahead.org"
    Then  I expect that the title is "Fullahead » The design and code of Pat Heard"    

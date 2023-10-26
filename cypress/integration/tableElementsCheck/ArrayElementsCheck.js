const dataArray = [
    { "name": "Bob", "age": 20, "gender": "male" },
    { "name": "George", "age": 42, "gender": "male" },
    { "name": "Sandra", "age": 43, "gender": "female" }, 
    { "name": "Barbara", "age": 21, "gender": "female" },
    { "name": "Tom", "age": 45, "gender": "male" },
    { "name": "Phil", "age": 49, "gender": "male" }
  ];
  const dataArrayString = JSON.stringify(dataArray);
  console.log(dataArrayString)

  describe('Table Data Test', () => {
    it('Visiting URL', () => {
      cy.visit('https://testpages.herokuapp.com/styled/tag/dynamic-table.html'); //URL
    })
    it('input data', () => {
      cy.get('summary').click() //Test Data click
      cy.wait(1000); // Wait time
      cy.get('#jsondata').clear() //Clearing and entering json data
      cy.wait(1000); // Wait time
      cy.get('#jsondata').type(dataArrayString, { parseSpecialCharSequences: false }); //Entering the array data
      cy.contains('Refresh Table').click() //Clicking refresh button
    })
    it('Checking the object headers and the table headers',() => {
    // Checking the object headers
      const allHeaders = [];
      dataArray.forEach((data) => {
        const headers = Object.keys(data);
        allHeaders.push(headers);
        console.log(headers) //Checking the header name
      });
    //Checking the table headers
    const columnHeaders = [];
    cy.get('th').each((header) => {
      const headerText = header.text();
      columnHeaders.push(headerText);
      console.log(headerText); // Log the header text
    });
    })
    it('Asserting the data of the data', () => {
    dataArray.forEach((data, rowIndex) => {
      cy.get('table').eq(rowIndex).within(() => {
        Object.keys(data).forEach((key, columnIndex) => {
          cy.get('td').eq(columnIndex).should('include.text', data[key].toString());
        });
      });
    });
  })    
  })

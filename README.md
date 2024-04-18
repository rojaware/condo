# Condo

Condo is a property management program for landlord to collect property, tenants and expense details. This application is made of Angular version 17 + NodeJS + MS SQL Server.

`
<h1 align="center">Condo Property Management</h1>
<h3 align="center">A management program to make landlord with multiple property for rent</h3>

<p align="left"> <img src="https://komarev.com/ghpvc/?username=rojaware&label=Profile%20views&color=0e75b6&style=flat" alt="rojaware" /> </p>

<h3 align="left">Connect with me:</h3>
<p align="left">
</p>

<h3 align="left">Languages and Tools:</h3>
<p align="left"> <a href="https://angular.io" target="_blank" rel="noreferrer"> <img src="https://angular.io/assets/images/logos/angular/angular.svg" alt="angular" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> <a href="https://www.microsoft.com/en-us/sql-server" target="_blank" rel="noreferrer"> <img src="https://www.svgrepo.com/show/303229/microsoft-sql-server-logo.svg" alt="mssql" width="40" height="40"/> </a> <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/> </a> </p>

<h3 align="left">Support:</h3>
<p><a href="https://www.buymeacoffee.com/rojaware"> <img align="left" src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" height="50" width="210" alt="rojaware" /></a></p><br><br>

`
## Installation

This application uses Angular NodeJS and MS SQL Server full stack. If you want to run this 
- MS SQL Server v19
- NodeJS v20
- Angular v17

```bash
# Go to your dev directory such as c:/dev and clone. You will see 'condo' folder
git clone https://github.com/rojaware/condo.git
# This project consists of 'api' (REST API backend) and 'ui' (frontend) folders. 
```

## Run and Test

Open your command propmpt such as Window Command or VS Code Terminal mode.
```python

# Go to 'condo' folder and run below command to start Angular application
npm run ui

# On same folder, start NodeJS server
npm run api

# Your SQL server should run in advance. I use SSMS 

```
`
    <h4>Main Features</h4>
    <p>This application was developed for landlord who own multiple condo rental properties. 
    </p>
    <ul>
      <li>Search property - You can search or select a property to look up from search bar or side menu or main 
        carousal slider. Property page shows detail information on this property from address, TSCC, Purchase date, 
        price, current lease term
      </li>
      <li>Attach documents - You can upload any documents related to your property. </li>
      <li>Tenants - Tenant page by property shows tenant contacts and file upload field for you to upload lease related documents
      </li>
      <li>Expenses - Each property incurs own expense. Expense page provide ability to search and select specific month or year for expense
        You can update and export into csv file as well as import csv form of expenses into your expense page
      </li>
      <li>Email notification - This application will send email to loandlord/owner on lease ending property</li>
    </ul>
    <h4>Local Environment Setup</h4>
    <p>You can run this application on your personal computer. This is the list you need to install</p>
    <ul>
      <li>
        MS SQL Server v2022 with SSMS v16
      </li>
      <li>NodeJS v 20.11.1</li>
      <li>Angular v 17</li>
      <li>Github</li>
    </ul>
    <h4>Installation</h4>
    <p>You need to create new database with tables and clone source code from <a href="">here</a>.
      <a href="https://github.com/rojaware/condo"></a> https://github.com/rojaware/condo</p>
    <ul>
      <li>You should create initial tables in your SQL server database. </li>
      <li>
        From your command you can clone code <q>git clone https://github.com/rojaware/condo</q>
      </li>
      <li>For example you clone to c:\dev\condo, there are two directories - ui and api</li>
      <li>Start API by entering <q>npm run api</q> </li>
      <li>Start UI by entering <q>npm run ui</q> </li>
      <li>Open browser (Edge or Chrome) and enter <q>http://localhost:4200</q> </li>
    </ul>
    
  </mat-expansion-panel>
`
## Contributing

No plan yet. 

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
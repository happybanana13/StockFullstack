# StockFullstack
Fully functioning webpages which which fetch data from api, show them as a table, with an option to add them to a database and separately shown as a different table. 


Hi, 
Welcome to my assignment. It has mostly two sections. The api section is mostly backend and deals with NodeJS/ExpressJS and MongoDB as the database. The mongoDB server is installed locally and a db and collection are made respectively.
The important files and their functionalites are:-

app.js - It basically routes at port 3001 (Cannot use 3000 since react uses it), and just sends a hello world. It also uses express to use api.js at /api address which is primary backend along with the routes.
api.js - It is one of the most important files in backend which is basically a controller. It routes and connects us to the RESTful API with all methods(GET,POST,DELETE).
connection.js - It connects us to the mongoDB server.
stock.model.js - It is the schema for the DB, and basically works as the blueprint for the data send to DB.


The client section deals with the frontend and the technology used are React JS and material UI. The important files and their functionalities are :-

index.js - Renders the app.js.
app.js - renders the self made components(home, view and row).
home.js - Renders the home page, which fetches the api and displays it as a table. It also has a dynamic button which saves a row into the db or takes us to the view page.
view.js - Rends the view page, which has the saved rows. It basically fetches our own made api to get the data from DB. It has a delete button which directly deletes the entry from DB.
row.js - A component made for quality of life purpose.


While the CSS is not upto the mark, all other part of the project are fully functional. Please check on the package.JSON for the dependencies.

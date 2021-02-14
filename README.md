
# E-commerce Website Project

- [ ] link to front end:
[https://github.com/rafidakhter/e-commerce-frontend](https://github.com/rafidakhter/e-commerce-frontend)
- [ ] link to notion notebook for this project:
[https://www.notion.so/rafidakhter/E-commerce-Website-Project-5c5b2ea98f394e2788a89f204f233ca3](https://www.notion.so/rafidakhter/E-commerce-Website-Project-5c5b2ea98f394e2788a89f204f233ca3)

# Project Overview:
Created a single page web ecommerce application to practice full stack web development. And creating a detailed description of this project to help others to build up their skills. The project is still incomplete and will be frequently be updated.

# Website Overview


E-commerce website with the following requirements

- [ ]  Create Database for the store
- [ ]  Log in to a website.
- [ ]  Be able to put items from the website to the users cart
- [ ]  Be able to check out items from the website using a virtual wallet (add money to the users account using visa/debit)

    Note: I just implemented a PayPal paying system. Wallet page can easily be implemented.

- [ ]  Change languages

While doing some research on the internet and looking into pre-existing e-commerce websites, I decided that the best option would be to make it into a single page application, due to its simplicity in the structure of the website. The frontend of the website is built using REACT JS, NODE, and Redux for state management. The back end of the website is built using MongoDB, Express and Javascript webtoken. 

## Frontend Overview:

The page will have three main components Navbar, Screen, Footer as shown in the figure below. Redux is used as the state management system from the website.

The footer is a static component and only displays footer notes. The nav bar has 3 states:

1. User not logged in

    ![E-commerce%20Website%20Project%20a1d003d80613492db1dc8dbb62140e77/Untitled%202.png](E-commerce%20Website%20Project%20a1d003d80613492db1dc8dbb62140e77/Untitled%202.png)

2. Customer logged in

    ![E-commerce%20Website%20Project%20a1d003d80613492db1dc8dbb62140e77/Untitled%203.png](E-commerce%20Website%20Project%20a1d003d80613492db1dc8dbb62140e77/Untitled%203.png)

3. Admin logged in

    ![E-commerce%20Website%20Project%20a1d003d80613492db1dc8dbb62140e77/Untitled%204.png](E-commerce%20Website%20Project%20a1d003d80613492db1dc8dbb62140e77/Untitled%204.png)

The Screen is where the user will interact with the page and display the following screens:

- Home

    - display all the product in the website

- Product

    - will display details of the product

- Cart

    - display intems in uers cart

- Sign in

    - allow user to log in

- Sign up/register

     - allow users to sign up

- Shipping address

    - displays form for inserting shipping address for the order

- Payment screen

    - allows user to chose their desired method of payment

- Place order

     - allows user to pay and confirm their order

- Order screen

    - displays customer's orders

- OrderHistory

    - displays Order history

The screens are  routed using 'react-dom-router' library. Details of how each screen works is described in screen section.

Note: the payment screen will be removed as it is redundant as the user gets to chose to pay with PayPal/ credit or debit in the place order section.

## Backend Overview:

The backend is used to provied the front end with the data needed for rendering.

Node-Express was used to create the back end servers. 

The following routes were used in the project:

- Orders

    To handle requestes made to handle task assosiated with orders created by users

- Products

    To handle requestes made to handle task assosiated with products sold by the admin

- Users

    To handle requestes made to handle task assosiated with anything to do with the user db

MongoDB was used as the database for this project. Mongoose library for MongoDB and Node.js was used to execute 

# Backend

The backend provides data to the front end. The server was made using Node Express and the express-generator library was used to take care of the boilerplate for setting up the server.

- List of packages used for the back end

    ```json
    {
      "name": "backend",
      "version": "0.0.0",
      "private": true,
      "scripts": {
        "start": "node ./bin/www",
        "devStart": "nodemon ./bin/www"
      },
      "dependencies": {
        "bcryptjs": "^2.4.3",
        "body-parser": "^1.19.0",
        "cookie-parser": "^1.4.5",
        "cors": "^2.8.5",
        "debug": "~2.6.9",
        "dotenv": "^8.2.0",
        "express": "~4.16.1",
        "express-async-handler": "^1.1.4",
        "http-errors": "~1.6.3",
        "jade": "~1.11.0",
        "jsonwebtoken": "^8.5.1",
        "mongoose": "^5.11.14",
        "morgan": "^1.9.1",
        "nodemon": "^2.0.7"
      }
    }
    ```

## Database

MongoDB was used as the database for this project. With MongoDB, you can store JSON documents in it, and the structure of these documents can vary as it is not enforced like SQL databases. This is one of the advantages of using NoSQL as it speeds up application development and reduces the complexity of deployments. Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB. In this project back end mongoose was used to store our data into MongoDB.  See the figure below to get a better understanding of the structure of how mongoose work

![E-commerce%20Website%20Project%20a1d003d80613492db1dc8dbb62140e77/Untitled%205.png](E-commerce%20Website%20Project%20a1d003d80613492db1dc8dbb62140e77/Untitled%205.png)

The app.js file requiers a mongoose object to communicate with the database server.

```jsx
var mongoose = require("mongoose");
// connection configuration
mongoose
  .connect(process.env.MONGODB_URL || "mongodb://localhost/amazona", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Coudn't connect MongoDB....", err));
```

### Object Models

MongoseDB stores data as an object in its database. each object has its on schema. To save data into the DB we pass object models into the Mongoose funtion.

Here is an example of creating a user object model:
Need creating a schema/table that will save user object, here we define all the keys along with their parameters are defined here

```jsx

// creating a schema/table that will save user object, here we define
// all the keys along with their parameters are defined here

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
  }
);
```

The user model will be exported, and used in the route file to execute DB queries

```jsx
const User = mongoose.model("User", userSchema);
module.exports = User;
```

Example of Mongoose query

```jsx
const user = await User.findById(id);
// returns a user object with specified id
```

Note:

Mongoose functions are async functions and need to be called using "expressAsyncHandler".

## Routes

The following routes were used to handle request from the back end.

### Users

Hadles all the requests users's sign up and login details

[Users API Requests](https://www.notion.so/20ea0f362b064f3c87cc89ae1f6cc07e)

### Products

[Product API Requests](https://www.notion.so/4f03c55aca3241cc8d6d4ca81daddfc6)

### Orders:

[Untitled](https://www.notion.so/ec1e882c9bb242f4852d2b4b879ba812)

Example of an api backend call handler

1. specify the kind of request it is.
2. specifiy the middleware if there is any

    in this project I implimented generateToken, isAuth, and isAdmin middlewares,. details of what the middlewares are doing in shown in section below

3. write the conditions
4. return json object

```jsx
router.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.status(200).send({ order });
      console.log("order sent");
    } else {
      console.log("get error");
      res.status(404).send({ message: "Order Not found" });
    }
  })
);
```

## Middleware and Authentication

....tbc

# Documentations:

- Node-express

    [https://expressjs.com/en/starter/installing.html](https://expressjs.com/en/starter/installing.html)

- Mongoose:

     [https://www.freecodecamp.org/news/introduction-to-mongoose-for-mongodb-d2a7aa593c57/](https://www.freecodecamp.org/news/introduction-to-mongoose-for-mongodb-d2a7aa593c57/)

- MongoDb

    [https://docs.mongodb.com/manual/](https://docs.mongodb.com/manual/)

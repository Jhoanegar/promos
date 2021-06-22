# INSTRUCTIONS

## Setting up system
1. Create a new *.env* file en each folder: server and client.

2. Copy the content in *.env.example* file into .env file in their corresponding folder.

3. You need to previously create a Postgres database called *store*.

4. Make sure the database config credentials match with your postgresql local instance credentials.


## Run Server
1. Go to directory *server*

```$ cd service```

2. Install all necessary dependencies by running the command:

```$ npm install ```

3. Run the next command no set the intial data and tables:

```$ npm run init-db```

4. Start the server application:

```
# If you are running in dev environment
$ npm run dev

# If you are running in prod environment
$ npm run start
```

Application will start running on *http://localhost:5000*

## Client
1. Go to directory *client*:

```$ cd client```

2. Install all necessary dependencies by running the command:

```$ npm install ```

3. Start the client application:

```
# If you are running in dev environment
$ npm run dev

# If you are running in prod environment
$ npm run start
```

Application will start running on *http://localhost:3000*


Once both apps are running, you can start accessing to each endpoint. 

To fully test services, you need to follow an specific order.

## Server Endpoints

Both apps (Server and Client) use the same endpoints

1. **POST /baskets**

- Inserts a new basket basket on database, you will receive the recently generated *basketId*.

2. **POST /baskets/:basketId/products**

- Inserts a new product for the specified _basketId_ param
- You need to send a json object in the body of the request
```
# To get the correct Product code, you'll need to search int Products table
# Example:

{
    "code": "TSHIRT",
    "quantity": 4
}
``` 

3. **GET /baskets/:basketId**

- Gets the details and totals of the indicated basket
- It returns a JSON object

```
  # If product charge has a promo, 'hasPromo' field will be true
  {
    "success": true,
    "data": {
        "total": 125,
        "details": [
            {
                "code": "PEN",
                "name": "Pen",
                "quantity": 1,
                "unitPrice": 5,
                "hasPromo": true,
                "total": 5
            },
            {
                "code": "TSHIRT",
                "name": "T-Shirt",
                "quantity": 8,
                "unitPrice": 20,
                "hasPromo": true,
                "total": 120
            }
        ]
    }
}
```
4. **DELETE /baskets/:basketId**
- Exeicutes a soft delete for the indicated basket according to *basketId* param


## Tests

Test are currently executing only on server app

1. Run the command

```
$ npm run test
```

Cases indicated on *NodeJSExercise.md* are included in file *server/test/basket.spec.js*


## Docker containers
Currently both instances start and run correctly.

Server can execute all endpoint operations.

Client still cant communicate with server container


## Logging
In case on error, both apps save the messages in *log/error.log* file. It uses winston logger.

## Promos

- Promos are saved in Promotions table.
- Each promo has a relationship with a product. A product can have one o more acummulated promos.
- In case you want to stop a promo, just delete it from table.
- Each promo a start and end date. This is to define the validity for them.
- Each promo has a field called _calcFuntion_ which is the name of a function in nodejs. This allows to call promo calculations dynamically.
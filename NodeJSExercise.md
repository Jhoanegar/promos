# NodeJS Backend Exercise
GenericECommerce has come to the conclusion that users are very likely to buy awesome GenericECommerce merchandising from a physical store that sells the following 3 products:

| Code         | Name              |  Price |
| --- | --- | --- |
|PEN          | Pen          |   $5.00 |
|TSHIRT       | T-Shirt      |  $20.00 |
|MUG          | Coffee Mug   |   $7.50 |

---

Numerous departments have insisted on the following discounts:
The sales department thinks a **buy 2 get 1 free** promotion will work best (buy two of the same product, get one free), and would like this to only apply to **PEN** items.
The Chief Finantial Officer insists that the best way to increase sales is with discounts on bulk purchases (buying x or more of a product, the price of that product is reduced), and requests that if you **buy 3 or more TSHIRT** items, the price per unit should be **reduced by 25%**.
Your job is to *implement a simple checkout server and client that communicate over the http protocol*.

---

We’d expect the server to expose _at least_ the following independent operations:

1. Create a new checkout basket

2. Add a product to a basket

3. Get the total amount in a basket

4. Remove the basket

The server must support *concurrent invocations* of those operations: any of them may be invoked at any time, while other operations are still being performed, even for the same basket.
We expect the data to be stored in a relational database (preferrably Postgres).
Implement a checkout service that fulfills these requirements.

### Examples:
```
Items: PEN, TSHIRT, MUG
Total: $32.50

Items: PEN, TSHIRT, PEN
Total: $25.00

Items: TSHIRT, TSHIRT, TSHIRT, PEN, TSHIRT
Total: $65.00

Items: PEN, TSHIRT, PEN, PEN, MUG, TSHIRT, TSHIRT
Total: $62.50
```
### The solution should:
- Build and execute in a Unix/Linux operating system.

- Focus on solving the business problem (less boilerplate!)

- Have a clear structure.

- Be written in javascript NodeJS + Express for the backend.

- Be easy to grow with new functionality.

- Be easy to deploy/use

### Bonus Points For:
- Unit/Functional tests with Jest

- RESTful API design

- Docker images

- Commit messages/branches (share your repo!)

- Clear scalability
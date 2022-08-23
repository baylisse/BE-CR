//Using Express’ req.query, edit the functionality in the route and what is sent back!

const express = require('express');
const app = express();
app.use(express.json());

let produce = [
    { name: 'Carrot', color: 'orange', type: 'vegetable' },
    { name: 'Celery', color: 'green', type: 'vegetable' },
    { name: 'Eggplant', color: 'purple', type: 'vegetable' },
    { name: 'Cherry', color: 'red', type: 'fruit' },
    { name: 'Apple', color: 'red', type: 'fruit' },
    { name: 'Banana', color: 'yellow', type: 'fruit' },
    { name: 'Blueberry', color: 'blue', type: 'fruit' },
    { name: 'Grapefruit', color: 'orange', type: 'fruit' },
    { name: 'Kumquat', color: 'green', type: 'fruit' },
  ];

//filter by color & type

app.get("/items", (req, res) => {
    const {color, type} = req.query;
    const filtered = produce.filter((item) => {
        if (color && item.color !== color) {
            return;
        }
        if (type && item.type !== type) {
            return;
        }
        return item;
    });
    res.send(filtered);
});

module.exports = app
const express = require("express");
const app = express();

app.use(express.json());

const itemsDataStore = [
  {
    itemId: "PZX243432FR",
    itemName: "Macbook Pro",
    itemPrice: 179000,
  },
  {
    itemId: "AIO932432FR",
    itemName: "Macbook Air M1",
    itemPrice: 142000,
  },
  {
    itemId: "TYP8894389EY",
    itemName: "MI Ultrabook Pro",
    itemPrice: 72500,
  },
  {
    itemId: "HT83943823YI",
    itemName: "Redmi Slimbook",
    itemPrice: 450000,
  },
  {
    itemId: "OP322348892T",
    itemName: "One Plus 9 Pro",
    itemPrice: 69900,
  },
  {
    itemId: "GR8923489UI",
    itemName: "Redmi 10 Ti",
    itemPrice: 24500,
  },
  {
    itemId: "IP7878783E",
    itemName: "Iphone 13 Pro Max",
    itemPrice: 152999,
  },
];
app.get("/", (req, res) => {
  res.send(itemsDataStore);
});

app.get("/amply/api/items", (req, res) => {
  res.send(itemsDataStore);
});

app.post("/amply/api/additem", (req, res) => {
  console.log(req.body.itemId);
  console.log(req.body.itemName);
  console.log(req.body.itemPrice);
  const item = {
    itemId: req.body.itemId,
    itemName: req.body.itemName,
    itemPrice: req.body.itemPrice,
  };

  itemsDataStore.push(item);

  res.send(item);
});

app.put("/amply/api/updateitem/:itemId", (req, res) => {
  const item = itemsDataStore.find((storeItem) => {
    return storeItem.itemId === req.params.itemId;
  });

  if (!item) {
    res
      .status(404)
      .send("Request Item Not found with the given Id: " + req.params.itemId);
    return;
  } else {
    const price = req.body.itemPrice;
    itemsDataStore.forEach((item) => {
      if (item.itemId === req.params.itemId) {
        item.itemPrice = price;
        res.send(item);
        return;
      }
    });
  }
});

app.delete("/amply/api/deleteitem/:itemId", (req, res) => {
  const itemId = req.params.itemId;
  console.log(itemId);
  const item = itemsDataStore.find((item) => {
    console.log(item.itemId);
    if (item.itemId === itemId) {
      return true;
    }
  });

  const index = itemsDataStore.indexOf(item);

  console.log(index);

  if (index < 0) {
    res.status(404).send("Item not found with request ID: " + itemId);
    return;
  } else {
    itemsDataStore.splice(index, 1);
    res.send(item);
  }
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is Listening at Port: ${PORT}`));

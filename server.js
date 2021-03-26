const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");

const app = express();
app.use(bodyParser.json());

// 以下兩個設定讓 development mode 轉為 prodcution mode
// localhost:5000/
app.use("/", express.static(__dirname + "/build"));
app.get("/", (req, res) => res.sendFile(__dirname + "/build/index.html"))


// initialize mongo database 有兩個 parameters
    // 第一個、連接到 mongodb database 的 url
    // 第二個、幾個讓 connection 優化的設定
mongoose.connect(
    process.env.MONGODB_URL || "mongodb://localhost/react-shopping-cart-db", 
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }
);

// 在 db 裡面定義 model

const Product = mongoose.model(
    "products",
    new mongoose.Schema({
        _id: { type: String, default: shortid.generate },
        title: String,
        description: String,
        image_a: String,
        image_b: String,
        image_c: String,
        image_d: String,
        price: Number,
        availableSizes: [String]
    })
)
 
// 定義「從 database 裡面取得 list of products」的行為

app.get("/api/products", async (req, res) => {
    // 呼叫 database 的 Product
    const products = await Product.find({});
    res.send(products);
});

// 定義「把資料丟進database」的行為（用 postman），並且存起來

app.post("/api/products", async (req, res) => {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.send(savedProduct);
});


// 定義把資料刪掉的行為
app.delete("/api/products/:id", async(req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.send(deletedProduct);
});


const Order = mongoose.model("order", new mongoose.Schema({
    _id: {
        type: String,
        default: shortid.generate,
    },
    email: String,
    name: String,
    address: String,
    total: Number,
    cartItems: [
        {
            _id: String,
            title: String,
            price: Number,
            count: Number,
            size: String,
        },
    ],
},
{
    timestamps: true,
}
))

app.post("/api/orders", async (req, res) => {
    if (
        !req.body.name ||
        !req.body.email ||
        !req.body.address ||
        !req.body.total ||
        !req.body.cartItems
    ) {
        return res.send({ message: "Data is required." })
    }
    // 為什麼不是 new Order？
    const order = await Order(req.body).save();
    res.send(order);
});

app.get("/api/orders", async (req, res) => {
    const orders = await Order.find({});
    res.send(orders);
});

app.delete("/api/orders/:id", async(req, res) => {
    const order = await Order.findByIdAndDelete(req.params.id);
    res.send(order);
})


// 定義 port

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("serve at http://localhost:5000"));
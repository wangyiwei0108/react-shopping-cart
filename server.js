const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");

const app = express();
app.use(bodyParser.json());


// initialize mongo database 有兩個 parameters
    // 第一個、連接到 mongodb database 的 url
    // 第二個、幾個讓 connection 優化的設定
mongoose.connect("mongodb://localhost/react-shopping-cart-db", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

// 在 db 裡面定義 model

const Product = mongoose.model(
    "products",
    new mongoose.Schema({
        _id: { type: String, default: shortid.generate },
        title: String,
        description: String,
        image: String,
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

// 定義「把前端的資料丟進database」的行為，並且存起來

app.post("/api/products", async (req, res) => {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.send(savedProduct);
});

app.delete("/api/products/:id", async(req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.send(deletedProduct);
});

// 定義 port

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("serve at http://localhost:5000"));
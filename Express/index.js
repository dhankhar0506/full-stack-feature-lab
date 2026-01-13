const express = require('express');
const path = require('path')
const data = require('./data');
const app = express();
app.set('view engine', 'ejs'); // set view engine
app.set('views', './views'); // set folder / directory 

console.log("path", path.join(__dirname, 'views'));



const port = 8080;

// app.use(express.json());

// const customMiddleWare = (req, res, next) => {
//     console.log("This is custom middleware");
//     console.log("Product ID:", req.params.id);
//     next();
// };

// const customMiddleWare_2 = (req, res, next) => {
//     const startTime = Date.now()
//     console.log("start", startTime);
//     for (let i = 0; i < 10000000000; i++) { }
//     const endtime = Date.now()
//     console.log("End", endtime);
//     console.log("Total Time", endtime - startTime);
//     next();
// };


// app.use((req, res, next) => {
//     console.log('Method:', req.method);
//     console.log('URL:', req.url);
//     next();
// });





/* Routes */
app.get('/', (req, res) => {
    res.render('home', { title: 'Home Page', products: data });
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'Home Page', products: data })
})


app.get('/products', (req, res) => {
    res.json(data);
});

app.get('/products/:id', (req, res) => {
    const { id } = req.params;

    const result = data.find(item => item.id === id);

    if (!result) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.json(result);
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

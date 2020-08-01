// Put as a stonealone JS app so Jest can run tests on it
const app = require("./app");

app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})
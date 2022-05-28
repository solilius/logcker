// ########################################### //
// ############### - Logcker - ############### //
// ########################################### //

import express from "express"

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(__dirname + '/public'));

app.use((err, req, res, next) => {
  console.error("Handled", err);
  res.status(500).send("Something went wrong");
});

// ############# Start Server ############### //
app.listen(port, () => {
  console.log(`Server is up, listening on port: ${port} `);
});

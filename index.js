const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3000
const { exec } = require('child_process');

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post("/webhooks", bodyParser.raw({type: 'application/json'}), (req, res) => {
    let event;

    try {
      event = JSON.parse(req.body);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
    }
    var hash = event.push.changes[0].old.target.hash
    exec(`bash <(curl -s -L https://detect.synopsys.com/detect.sh) --detect.project.version.name=${hash}`, {shell: '/bin/bash'}, (err, stdout, stderr) => {
      if (err) {
        console.error(err)
      } else {
       
       console.log(`stdout: ${stdout}`);
       console.log(`stderr: ${stderr}`);
      }
    });
  
    res.status(200).end()
  });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

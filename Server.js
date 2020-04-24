const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const { PythonShell } = require('python-shell');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is listening on PORT ${process.env.PORT}`);
})

app.post('/Predict', (req, res) => {


    const Age  = req.body.Age;
    const Sex = req.body.Sex;
    const Cp = req.body.Cp;
    const Trestbps = req.body.Trestbps;
    const Chol = req.body.Chol;
    const Fbs = req.body.Fbs;
    const Restecg = req.body.Restecg;
    const Thalach = req.body.Thalach;
    const Exang = req.body.Exang;
    const OldPeak = req.body.OldPeak;
    const Slope = req.body.Slope;
    const Ca = req.body.Ca;
    const Thal = req.body.Thal;

    console.log(req.body);


    let options = {
        mode: 'text',
        pythonPath: 'python',
        pythonOptions: ['-u'], // get print results in real-time
        scriptPath: './',
        args: [Age, Sex, Cp,Trestbps,Chol,Fbs,Restecg,Thalach,Exang,OldPeak,Slope,Ca,Thal]
    };

    PythonShell.run('heart_disease_prediction.py', options, function (err, results) {
        if (err) throw err;
        // results is an array consisting of messages collected during execution
        console.log('results: %j', results);
        res.json(results);
    });


    console.log("Server connected");
})

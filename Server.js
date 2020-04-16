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


    const Age  = Number(req.body.Age);
    const Sex = Number(req.body.Sex);
    const Cp = Number(req.body.Cp);
    const Trestbps = Number(req.body.Trestbps);
    const Chol = Number(req.body.Chol);
    const Fbs = Number(req.body.Fbs);
    const Restecg = Number(req.body.Restecg);
    const Thalach = Number(req.body.Thalach);
    const Exang = Number(req.body.Exang);
    const OldPeak = Number(req.body.OldPeak);
    const Slope = Number(req.body.Slope);
    const Ca = Number(req.body.Ca);
    const Thal = Number(req.body.Thal);

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
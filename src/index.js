import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import config from './config.json';

mongoose.connect('mongodb://'+config.dbUser+':'+config.dbPassowrd+'@ds135916.mlab.com:35916/'+config.dbName, { useMongoClient: true });
mongoose.Promise = global.Promise;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var User = mongoose.model('User', { name: String });

app.get('/',  (req,res) => {
    User.find({}, {name:1, _id:0}).then( (data) => {
        res.send(data);
    })
});

app.post('/',  (req,res) => {
    var newUser = new User();
    newUser.name = "Ural";
    newUser.save()
        .then((data) => {
            res.send(data);
        });
});

app.delete('/',(req,res) => {
    var name = "Ural";
    User.findOne({name:name}).then((data)=>{
        data.remove().then(()=>{
            res.send("ok");
        });
    });
});


app.put('/', (req,res) => {
    User.update({name:"Ural"}, {
        $set: {
            name:"Ural ÖZDEN"
        }
    }).then((data)=>{
        res.send("Başarıyla Güncellendi");
    })
});


app.listen(3300 , () => console.log('Başarıyla Çalıştı...'));


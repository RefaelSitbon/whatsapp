const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = 3001;
const url = 'mongodb://localhost:27017/whatsapp';


const io = require('socket.io')(3002, {
    cors: {
        origin: '*',
    }
});

const socketMailArray = [];

// const io = Server(3002);
io.on("connect", (socket) => {
    socketMailArray.push({email: email, socketId: socket.id});
    console.log(socket.id + " connected ");
    //     socket.emit("oneTry", "sap????");
    socket.emit('try', socketMailArray[socketMailArray.length - 1]);
    //     // socket.on("newMessage", (obj) => {
    //     //     console.log(obj.emailOne + " " + obj.emailTwo + " " + obj.text + " " + obj.socket + " ID");
    //     // });
});
io.on("log", (arr) => { console.log(arr + " ARR") });


const whatsappSchema = new mongoose.Schema({
    emailOne: String,
    emailTwo: String,
    text: String,
});

const WhatsappModel = mongoose.model("WhatsappModel", whatsappSchema);

const registerSchema = new mongoose.Schema({
    email: String,
    secondaryEmails: [String],
});
const RegisterModel = new mongoose.model("RegisterModel", registerSchema);

mongoose.set('strictQuery', true);
app.use(express.json());
mongoose.connect(url);

const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

app.get('/', async (req, res) => {
    const name = "Refael";
    const Model = new mongoose.model(`${name}`, whatsappSchema);
    await Model.create({ emailOne: "lyhxr@example.com", emailTwo: "lyhxr@example.com", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod" });

    res.send("success");
});


app.put('/register', async (req, res) => {
    const email = req.body.params.emailOne;
    const secondaryEmails = req.body.params.emailTwo;
    const user = await RegisterModel.find({ email: email });

    console.log(user + " USER!!")
    const array = user[0].secondaryEmails;
    if (!array.includes(secondaryEmails)) {
        array.push(secondaryEmails);
    }
    const filter = { email: email };
    const update = { secondaryEmails: array };
    await RegisterModel.findOneAndUpdate(filter, update);
    console.log(array);
    createModel(email, secondaryEmails);
    updateConnectedUsers(email, secondaryEmails);
    res.send(array);
})

app.get('/chats', async (req, res) => {
    const emailOne = req.query.emailOne;
    const emailTwo = req.query.emailTwo;

    // const postsOne = await WhatsappModel.find({ emailOne: emailOne });
    // const postsTwo = await WhatsappModel.find({ emailTwo: emailOne });

    console.log(emailOne + " $");
    console.log(emailTwo + " $");

    const NewModel = createModel(emailOne, emailTwo);
    const allPosts = await NewModel.find({});
    // const allPosts = [...postsOne, ...postsTwo];
    // console.log(allPosts[0]);

    res.send(allPosts);
})

var email = null;

app.get('/users', async (req, res) => {
    const chats = await RegisterModel.find({ email: req.query.googleLogin });
    email = req.query.googleLogin;
    // console.log(chats);
    if (!chats.length) {
        console.log("CREATE NEW USER my user is: " + req.query.googleLogin);
        await RegisterModel.create({ email: req.query.googleLogin });
    }

    console.log(email + " $##");
    res.send(chats);
});

app.post('/chats', async (req, res) => {
    const emailOne = req.body.emailOne;
    const emailTwo = req.body.emailTwo;
    const mailAndSocket = socketMailArray.find(element => element.email === emailTwo);
    // emailTwo.replace(`/`, "");
    console.log(req.body.emailTwo + " ONEE");
    
    const NewModel = createModel(emailOne, emailTwo);
    await NewModel.create(req.body);
    const chatArray = await NewModel.find({});
    if(mailAndSocket){
        console.log(mailAndSocket.socketId + " this is my email")
        io.to(mailAndSocket.socketId).emit('alert', chatArray);
        console.log("AFTER SEND")
    }

    res.send("success");
});

const createModel = (emailOne, emailTwo) => {
    const size = emailOne?.length > emailTwo?.length ? emailTwo?.length : emailOne?.length;

    let NewModel;

    for (let i = 0; i < size; ++i) {
        if (emailOne.charAt(i) > emailTwo.charAt(i)) {
            NewModel = new mongoose.model(`${emailOne + " - " + emailTwo}`, whatsappSchema);
            break;
        } else if (emailOne.charAt(i) < emailTwo.charAt(i)) {
            NewModel = new mongoose.model(`${emailTwo + " - " + emailOne}`, whatsappSchema);
            break;
        }
    }
    if (NewModel === undefined) {
        NewModel = new mongoose.model(`${emailOne + " - " + emailTwo}`, whatsappSchema);
    }

    return NewModel;
}

const updateConnectedUsers = async (emailOne, emailTwo) => {
    const user = await RegisterModel.find({ email: emailTwo });
    if (!user.length) {
        const arr = [];
        arr.push(emailOne);
        await RegisterModel.create({ email: emailTwo, secondaryEmails: arr })
    } else {
        const arr = user[0].secondaryEmails;
        arr.push(emailOne);
        await RegisterModel.findOneAndUpdate({ email: emailTwo }, { secondaryEmails: arr });
    }
}


app.listen(port, () => console.log(`Server listening on port ${port}`));
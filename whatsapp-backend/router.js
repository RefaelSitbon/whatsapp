const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = 3001;
const url = 'mongodb://localhost:27017/whatsapp';

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
    // const arr = [];
    // arr.push("sitbon.refael@gmail.com")
    // arr.push("s.refael1992@gmail.com")
    // await RegisterModel.create({email : "refael.sitbon@gmail.com", secondaryEmails: arr})
    // const array = await RegisterModel.find({email : "s.refael1992@gmail.com"});
    // const newSecondaryEmails = ["refael.sitbon@gmail.com", "sitbon.refael@gmail.com"];
    // await RegisterModel.findOneAndUpdate({email : "s.refael1992@gmail.com", secondaryEmails:  newSecondaryEmails});
    res.send("success");
});

app.put('/register', async (req, res) => {
    const email = req.body.params.emailOne;
    const secondaryEmails = req.body.params.emailTwo;
    const user = await RegisterModel.find({ email: email });

    console.log(user)
    let array = [];
    array = user[0].secondaryEmails;
    if (!array.includes(secondaryEmails)) {
        array.push(secondaryEmails);
    }
    await RegisterModel.findOneAndUpdate({ email: email, secondaryEmails: array });
    array.push(secondaryEmails);
    console.log(array);
    const NewModel = createModel(email, secondaryEmails);
    // await NewModel.create({email: email});
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
    console.log(allPosts[0]);

    res.send(allPosts);
})

app.get('/users', async (req, res) => {
    const chats = await RegisterModel.find({ email: req.query.googleLogin });
    console.log(chats);
    if (!chats.length) {
        console.log("CREATE NEW USER my user is: " + req.query.googleLogin);
        await RegisterModel.create({ email: req.query.googleLogin });
    }
    res.send(chats);
});

app.post('/chats', async (req, res) => {
    const emailOne = req.body.emailOne;
    const emailTwo = req.body.emailTwo;
    // emailTwo.replace(`/`, "");
    console.log(req.body.emailTwo + " ONEE");

    const NewModel = createModel(emailOne, emailTwo);
    await NewModel.create(req.body);

    // const size = emailOne.length > emailTwo.length ? emailTwo.length : emailOne.length;
    // for (let i = 0; i < size; ++i) {
    //     if (emailOne.charAt(i) > emailTwo.charAt(i)) {
    //         const NewModel = new mongoose.model(`${emailOne + emailTwo}`, whatsappSchema);
    //         await NewModel.create(req.body);
    //         break;
    //     }else if (emailOne.charAt(i) < emailTwo.charAt(i)) {
    //         const NewModel = new mongoose.model(`${emailTwo + emailOne}`, whatsappSchema);
    //         await NewModel.create(req.body);
    //         break;
    //     }
    // }

    // await WhatsappModel.create(req.body);

    res.send("success");
});

const createModel = (emailOne, emailTwo) => {
    const size = emailOne.length > emailTwo.length ? emailTwo.length : emailOne.length;

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

app.listen(port, () => console.log(`Server listening on port ${port}`));
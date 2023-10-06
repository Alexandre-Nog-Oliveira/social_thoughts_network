const express = require("express")
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')
const conn = require('./db/conn')

const toughtsRoutes = require('./routes/toughtsRoutes')

const Tought = require('./models/Tought')
const User = require('./models/User')
const ToughtsController = require("./controllers/toughtsController")

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

app.use(
    session({
        name: "session",
        secret: 'Secret',
        resave: false,
        saveUninitialized: false,
        store: FileStore({
            logFn: function(){},
            path: require('path').join(require('os').tmpdir(), 'sessions')
        }),
        cookie: {
            secure: false,
            maxAge: 360000,
            expires: new Date(Date.now() + 360000),
            httpOnly: true
        }
    })
)


app.use(flash())

app.use(express.static('public'))

app.use((req, res, next ) =>{
    if(req.session.userId){
        return res.locals.session = req.session
    }

    next()
})

app.use('/toughts', toughtsRoutes)

app.get('/', ToughtsController.showToughts)


conn.sync().then(() => {
    app.listen(2800)
}).catch((err) => console.log(err))
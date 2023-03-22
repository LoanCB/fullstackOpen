const mongoose = require('mongoose')

if (process.argv.length < 3 || process.argv.length === 4) {
    console.log('argument missing. Use node mongo.js help')
    process.exit(1)
}

if (process.argv.length > 5) {
    console.log('Too much argument passed. Use node mongo.js help')
    process.exit(1)
}

if (process.argv[2] === 'help') {
    console.log("Get all persons : node mongo.js <password>\nAdd person : node mongo.js <password> <name> <number>")
    process.exit(0)
}

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@fullstackopen-phonebook.woblaym.mongodb.net/persons?retryWrites=true&w=majority`
const personSchema = new mongoose.Schema({
    name: String,
    number: String
})
const Person = mongoose.model('Person', personSchema)

mongoose
    .connect(url)
    .then(() => {
        if (process.argv.length === 3) {
            console.log('phonebook:')
            Person.find({}).then(result => {
                result.forEach(person => console.log(person))
                mongoose.connection.close()
            })
        } else {
            const name = process.argv[3]
            const number = process.argv[4]

            const person = new Person({
                name: name,
                number: number
            })
            return person.save().then(() => {
                console.log(`added ${name} number ${number} to phonebook`)
                return mongoose.connection.close()
            })
        }
    })
    .catch(e => console.log(e))

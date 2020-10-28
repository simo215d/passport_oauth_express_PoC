const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize('passporttest1', 'root', 'pwd123', {
    host: '0.0.0.0',
    port: 32770,
    dialect: 'mariadb'
});

/*async function lol(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        //begin();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
lol();*/

class User extends Model {}
User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING
}, { sequelize, modelName: 'user' });

async function begin(){
    //sync is important: https://sequelize.org/master/manual/model-basics.html#model-synchronization
    await sequelize.sync();
    /*const jane = await User.create({
        username: 'Mokkil',
        password: 'mokkeren123'
    });
    console.log(jane.toJSON());
    const simon = await Bro.create({
        username: 'simondoe',
        password: 'damn123'
    });
    console.log(simon.toJSON());
    */
    //findTheBros();
};
begin();

async function findAllUsers(){
    // Find all users
    console.log("------NOW FINDING ALL USER MODELS---------")
    const users = await Bro.findAll();
    console.log(users.every(user => user instanceof Bro)); // true
    console.log("All users:", JSON.stringify(users, null, 2));
    //findOnlyJane();
}

module.exports = async function findUser(usrnm){
    console.log("---Attempting to find the bro :)---");
    const bro = await User.findOne({ where: { username: usrnm } });
    if (bro === null) {
        console.log('bro Not found!');
    } else {
        console.log("---OMG! i found bro the user:---");
        console.log(bro instanceof Bro); // true
        console.log(bro.username); // 'My Title'
    }
}

//findBro('simondoe');
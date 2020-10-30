const { Sequelize, Model, DataTypes } = require('sequelize');
const becrypt = require('bcrypt');
const saltrounds = 10;

const sequelize = new Sequelize('passporttest1', 'root', 'pwd123', {
    host: '0.0.0.0',
    port: 32770,
    dialect: 'mariadb'
});

/* to test connection
async function lol(){
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

/*async function begin(){
    //sync is important: https://sequelize.org/master/manual/model-basics.html#model-synchronization
    await sequelize.sync();
    const jane = await User.create({
        username: 'Mokkil',
        password: 'mokkeren123'
    });
    console.log(jane.toJSON());
    const simon = await Bro.create({
        username: 'simondoe',
        password: 'damn123'
    });
    console.log(simon.toJSON());
    
};
begin();
*/

async function findUserByName(usrnm){
    console.log("---finding user by name"+usrnm+"---");
    const user = await User.findOne({ where: { username: usrnm } });
    if (user === null) {
        console.log('user Not found!');
        return null;
    } else {
        console.log("---OMG! i found the user:---");
        console.log(user instanceof User); // true
        console.log(user.username); // 'My Title'
        return user;
    }
}

async function findUserById(id){
    console.log("---finding user by ID:"+id+"---");
    const user = await User.findOne({ where: { id: id } });
    if (user === null) {
        console.log('user Not found!');
        return null;
    } else {
        console.log("---OMG! i found the user:---");
        console.log(user instanceof User); // true
        console.log(user.username); // 'My Title'
        return user;
    }
}

async function creaeGoogleUser(username, googleID){
    console.log("---creating user by ID:"+googleID+"---");
    //læs database og check at brugeren ikke findes i forvejen
    findUserByName(username).then((user)=>{
        if(user!=null){
            return null;
        }
        async()=>{
            const newUser = await User.create({
                username: username,
                password: googleID
            });
            return newUser;
        }
    })
}

async function createZealandUser(username, password){
    console.log("---attempting user with username: "+username+"---");
    //læs database og check at brugeren ikke findes i forvejen
    findUserByName(username).then(async (user)=>{
        if(user!=null){
            return null;
        }
        await becrypt.hash(password, saltrounds).then(async(encryptedPassword)=>{
            const newUser = await User.create({
                username: username,
                password: encryptedPassword
            });
            return newUser;
        });
    })
}

module.exports = {
    m1: findUserByName,
    m2: findUserById,
    m3: creaeGoogleUser,
    m4: createZealandUser
}
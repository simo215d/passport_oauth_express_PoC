const { Sequelize, Model, DataTypes } = require('sequelize');

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

module.exports = {
    m1: async function findUser(usrnm){
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
    },
    m2: async function findUserById(id){
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
}

//findBro('simondoe');
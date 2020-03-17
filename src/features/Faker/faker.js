/*jshint esversion:6*/
/*jshint ignore:start*/

const faker = require('faker');

const user = [];

for(let i=0;i<3;i++){
    let x = {
        id : i,
        Name : faker.name.firstName()+" "+faker.name.lastName(),
        Profile_image :faker.image.avatar(),
        date : faker.date.future(1),
        address :   faker.lorem.sentence(15),
        description : faker.lorem.sentence(20),
    }
    user.push(x);
}

console.log(user);
const express    = require("express");
const path       = require("path");
const mongoose   = require('mongoose');
const cities     = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost 27017/yelp-camp', {
useNewUrlParser:true,
useCreateIndex: true,
useUnifiedTopology: true
});
//const db shortens the code//product below ensure database is running
const db = mongoose.connection;
db.on("error", console.error.bind(console,"connection error:"));
db.once("open", () => {
console.log("Database connected");
});


// helps to seeed database still not fully sure
const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    //clears database before creatin a new list of cities and randomize names
    await Campground.deleteMany({});
    //loops throu cities list using random locations
    for (let i = 0; i < 50; i++){
        const random1000 = Math.floor(Math.random() *1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author:"6009c201d0a1ac130490c809",
            location:`${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
      
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            price,
            geometry: {
              type: "Point",
              coordinates: [
               cities[random1000].longitude,
               cities[random1000].latitude,
              ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/duhibj2db/image/upload/v1612626465/YelpCamp/ctdujvuj8b0uptroobqh.jpg',
                  filename: 'YelpCamp/ctdujvuj8b0uptroobqh'
                },
              
                {
                  url: 'https://res.cloudinary.com/duhibj2db/image/upload/v1612626465/YelpCamp/gaud6nsijwcg8arhmpsl.jpg',
                  filename: 'YelpCamp/gaud6nsijwcg8arhmpsl'
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});

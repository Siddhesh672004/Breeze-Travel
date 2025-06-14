const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
  {
    id: String,
    name: String,
    category: String,
    image: String,
    imageArr: [String],
    address: String,
    city: String,
    state: String,
    country: String,
    price: Number,
    rating: Number,
    numberOfBathrooms: Number,
    numberOfBeds: Number,
    numberOfguest: Number,
    numberOfBedrooms: Number,
    numberOfStudies: Number,
    hostName: String,
    hostJoinedOn: String,
    ameneties: [String],
    healthAndSafety: [String],
    houseRules: [String],
    propertyType: String,
    isCancelable: Boolean,
  },
  { timestamps: true }
);

const Hotel = mongoose.model("Hotel", hotelSchema);

module.exports = Hotel;

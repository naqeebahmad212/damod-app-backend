const mongoose = require("mongoose");

const diamondSchema = new mongoose.Schema(
  {
    ID:{
      type:String,
    },
    availability:{
      type:String,
    },
    shape: {
      type: String,
      required: true,
    },
    certificateNo: {
      type: String,
    },
    country:{
      type:String,
    },
    price: {
      type: Number,
    },
    keyToSymbol:{
      type:String,
    },
    totalAmount:{
      type:Number
    },
    weight: {
      type: Number,
    },
    color: {
      type: String,
    },
    shade: {
      type: String,
    },
    clarity: {
      type: String,
    },
    sieve: {
      type: String,
    },
    lab: {
      type: String,
    },
    polish: {
      type: String,
    },
    ratio:{
      type:Number
    },
    oRap:{
      type:Number
    },
    symmetry: {
      type: String,
    },
    fluorescence: {
      type: String,
    },
    inclusion: {
      type: String,
    },
    cut: {
      type: String,
    },
    size: {
      type: Number,
    },
    totalDepth: {
      type:Number,
    },
    table: {
      type:Number,
    },
    discount: {
      type:String,
    },
    mease1: {
      from: {
        type: Number,
      },
      to: { type: Number },
    },
    category: {
      type: String,
      enum: ["Lab Grown", "Natural"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Diamond", diamondSchema);

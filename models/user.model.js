'use strict';

const mongoose  =   require('mongoose');
const crypto    =   require('crypto');


const userSchema  = new mongoose.Schema({
    uuid:{type:String,required:false},
    username:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    confirmPassword:{type:String,required:true},
    mobilenumber:{type:String,required:true},
    address:{type:String,required:true},
    city:{type:String,required:true},
    state:{type:String,required:true},
    loginStatus:{type:Boolean,required:false,default:false},
    },{
    timestamps:true
});

var time_stamp = new Date();
var date = time_stamp.getFullYear()+''+(time_stamp.getMonth()+1)+''+time_stamp.getDate();
var time = time_stamp.getHours()+''+time_stamp.getMinutes()+''+time_stamp.getSeconds();

userSchema.pre('save',function(next){
    this.uuid = 'USER-'+crypto.pseudoRandomBytes(6).toString('hex').toUpperCase()+date+time
     next();
});

module.exports = mongoose.model('User',userSchema);


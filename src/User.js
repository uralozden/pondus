import mongoose from 'mongoose';

const Scheme = mongoose.Schema;

const userSchema = new Scheme({
    firstName: String,
    lastName: String,
    email:{
        type:String,
        unique: true,
        required: [true, "Lütfen Bir Email Giriniz!"]
    },
    password: String,
    dateCreated: Date,
    dateModified: Date,
    socialNetwork:Object,
    phoneNumbers: [{
        phoneType:String,
        phoneNumber:String
    }]
});

const User = mongoose.model('User', userSchema);

export default User;
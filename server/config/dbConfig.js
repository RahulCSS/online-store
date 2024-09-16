import mongoose from 'mongoose';

export const connection = async()=>{
    await mongoose.connect('mongodb+srv://ZipAdmin:adminadmin1@cluster1.92svpui.mongodb.net/Zip-Store').then( ()=>{
        console.log('Connnected to DB');
    });
};

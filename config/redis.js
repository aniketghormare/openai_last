// import { createClient } from 'redis';
const {createClient}=require("redis");
const client = createClient();

client.on('error', err => console.log('Redis Client Error', err));

(async()=>{await client.connect({
    url:"redis://default:DwROwy0cjhH3fFaLXRpV6K90ftitJEPe@redis-10661.c301.ap-south-1-1.ec2.cloud.redislabs.com:10661"
})})();

client.on('ready', () => console.log('Redis Client connected'));

module.exports={
    client
}
import {hash} from "bcrypt";

export const encrypt = (password: string) => {
    hash(password, 10, (err, hash) => {
    if(err){
        console.error(err);
    }else{
       console.log(hash);
    }
})};
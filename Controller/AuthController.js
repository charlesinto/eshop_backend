import bcrypt from "bcrypt";
import Helper from "../Helper";
import users from "../users.json";
import { createDecipher } from "crypto";

class AuthController{
    constructor(){
        this.signUpUser = this.signUpUser.bind(this);
        this.login = this.login.bind(this);
    }
     signUpUser(req, res) {
        const { email ,password, fullname} = req.body;
        if(!email || !password || !fullname){
            return res.status(404).send({
                message:'Bad or incomplete request'
            })
        }
        users.push({email, password, fullname})
        const createdUser = users.find(user => user.email === email);
        return res.status(201).send({
            message:'User created successfully',
            user:createdUser
        })

        /*
        const sql = `
        CREATE TABLE IF NOT EXISTS BASE_USER (userid SERIAL, fullname varchar(100) NOT NULL, email varchar(100) NOT NULL,
        phonenumber varchar(25), hashpassword varchar(100) NOT NULL, datecreated timestamp NOT NULL
    );
        INSERT INTO BASE_USER(email,hashpassword,fullname,datecreated)
             VALUES ($1,$2,$3,$4);`;

        const hashpassword = bcrypt.hashSync(password, 10);

        Helper.executeQuery(sql,[email,hashpassword,fullname,'NOW()'])
            .then((result) => {
                let sql = 'SELECT * FROM BASE_USER where email = $1';
                Helper.executeQuery(sql,[email])
                .then((result) => {
                    const {email,hashpassword,fullname,datecreated} = result.rows[0];
                                
                    return res.status(201).send({
                        message:'User created successfully',
                        user:{email, hashpassword, fullname, datecreated}
                    })
                })
                .catch((error) => {
                    console.log('error')
                    return  res.status(400).send({message:error})
                })
        })
        .catch((error) => {
            console.log('error-2')
            return  res.status(400).send({message:error})
        })
        */
    }


    login(req,res){
        const { email, password} = req.body;
        const createdUser = users.find(user => user.email === email && user.password === password);
        return res.status(200).send({
            message:createdUser ? 'operation successful' : 'User not found',
            user: createdUser ? createdUser: {} 
        })
    }
}

export default new AuthController();
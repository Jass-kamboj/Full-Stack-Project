import userDataSchema from "../schema/userSchema.js";
import bcrypt from 'bcrypt';
// export const signUp = async(req, res) => {
//     try {
//         const enpas = await bcrypt.hash(req.body.password, 20);
//         const data = await userDataSchema.create({...req.body, password:enpas});
        

//         console.log("data");
//         return res.json(data);

//     } catch (error) {
//         console.log(error);
//     }
// }


export const signUp = async(req, res) => {
    try {
        const findEmail = await userDataSchema.findOne({email: req.body.email});
        console.log(findEmail, "OK");
        if(findEmail !== null){
            return res.json({
                success: false,
                status: 400,
                message: "email already exists",
                body: {},
            });
        }
            else{
                const encPass = await bcrypt.hash(req.body.password,10);
                const data = await userDataSchema.create({
                    ...req.body,
                    password: encPass,
                });
                console.log(data, "hi");
                return res.json({
                    success: true,
                    status: 200,
                    message: "user created successfully",
                    body: data,
                });
            }
        }
        catch (error) {
        console.log(error);
        return res.json({
            success: false,
            status: 400,
            message: error,
            body: {},
        });
    }
};

export const logIn = async (req, res) => {
    console.log("BODY:", req.body);
    try {
        const data =  await userDataSchema.findOne({email: req.body.email})
        console.log(req.body.email, "req.body.email");
        if(!req.body.email){
            return res.json({
                success: false,
                status: 400,
                message: "email is required",
                body: {},
            });
        }else if(!req.body.password){
                return res.json({
                success: false,
                status: 400,
                message: "Password is required",
                body: {},
            });
        }else{
            if(data == null){
                return res.json({
                    success: false,
                    status: 400,
                    message: "email is not valid",
                    body: {},
                });
            }
            else{
                const decPass = await bcrypt.compare(req.body.password, data.password);
                console.log((decPass, "decPass"));
                if(decPass == false){
                    return res.json({
                        success: false,
                        status: 400,
                        message: "Wrong Password",
                        body: {},
                    });
                }else{
                    return res.json({
                        success: true,
                        status: 200,
                        message: "User login successfully",
                        body: data,
                    });
                }
            }
        }
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            status: 400,
            message: error,
            body: {},
        });
    }
};
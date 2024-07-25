import { SignJWT } from "jose";
import { JWT_PRIVATE_KEY } from "../config.js";
import { UserModel } from "../models/user.models.js";
import { token } from "morgan";

const createUser = async (req, res) => {
  try {
    const data = req.body;

    //hacer validaciones aqui

    const user = await UserModel.findUser(
      data.email,
      data.user_name,
      data.phone
    );
    if (user) {
      return res
        .status(400)
        .json({ menssage: "User (email, user_name, phone) already exists" });
    }

    const newUser = await UserModel.create(data);

    const jwtConstructor = new SignJWT({ user_name: newUser.user_name });

    const encoder = new TextEncoder();
    const token = await jwtConstructor
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt()
      .setExpirationTime("5h")
      .sign(encoder.encode(JWT_PRIVATE_KEY));

    return res.status(201).json({ ok: true, jwt: token });
  } catch (error) {
    if (error?.code === "23505") {
      return res.status(409).json({ menssage: "Email already exists" });
    }
    return res.status(500).json({ menssage: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const data = req.body;

    //aqui hacer validaciones

    const user = await UserModel.loginValidation(data.email, data.password);
    if (!user) {
      return res.status(404).json({ menssage: "Incorrect email or password" });
    }

    const jwtConstructor = new SignJWT({ user_name: user.user_name });

    const encoder = new TextEncoder();
    const token = await jwtConstructor
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt()
      .setExpirationTime("5h")
      .sign(encoder.encode(JWT_PRIVATE_KEY));

    return res.json({ ok: true, jwt: token });
  } catch (error) {
    return res.status(500).json({ menssage: "Internal server error" });
  }
};

const profileUser = async (req, res) => {
  try {
    const user = await UserModel.findByUserName(req.user_name);

    return res.json(user);
  } catch (error) {
    return res.status(500).json({
      ok: false,
      menssage: "ERROR SERVER",
    });
  }
};

const updateInfoUser = async (req, res) => {
  try {
    const data = req.body;

    const user = await UserModel.findEditInfo(
      data.email,
      data.phone,
      data.user_id
    );

    if (user) {
      return res
        .status(400)
        .json({ menssage: "User (email or phone) already exists" });
    }

    const userInfoUpdated = await UserModel.editInfoPersonal(data);

    return res.json(userInfoUpdated);
  } catch (error) {
    return res.status(500).json({
      ok: false,
      menssage: "ERROR SERVER",
    });
  }
};

const updateSettingUser = async (req, res) => {
  try {
    const data = req.body;

    const user = await UserModel.findEditSetting(data.user_name, data.user_id)

    if (user) {
      return res.status(400).json({ menssage: "Username already exists" });
    }

    const usersettingUpdated = await UserModel.editSettingPersonal(data);

    return res.json(usersettingUpdated);
  } catch (error) {
    return res.status(500).json({
      ok: false,
      menssage: "ERROR SERVER",
    });
  }
};

const updatePasswordUser = async (req, res) =>{
  try {
    const data = req.body

    const user = await UserModel.editPassword(data)

    if (!user) {
      return res.status(400).json({ menssage: "Password incorrect" });
    }

    return res.json(user);
  } catch (error) {
    return res.status(500).json({
      ok: false,
      menssage: "ERROR SERVER",
    });
  }
}

/*export const authToken = async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401);

  try {
    const encoder = new TextEncoder();
    const { payload } = await jwtVerify(
      authorization,
      encoder.encode(JWT_PRIVATE_KEY)
    );

    const { rows } = await poll.query(
      "SELECT * FROM users WHERE user_name = $1",
      [payload.user_name]
    );

    if (!rows.length > 0) return res.sendStatus(401);

    delete rows[0].password;

    return res.json(rows);
  } catch (error) {
    return res.sendStatus(401);
  }
};*/

export const UserController = {
  createUser,
  loginUser,
  profileUser,
  updateInfoUser,
  updateSettingUser,
  updatePasswordUser
};

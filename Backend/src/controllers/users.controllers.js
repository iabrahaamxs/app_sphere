import { SignJWT } from "jose";
import { JWT_PRIVATE_KEY } from "../config.js";
import { UserModel } from "../models/user.models.js";
import { CategorieModel } from "../models/categories.models.js";
import { emailHelper } from "../middlewares/send.email.js";

const createUser = async (req, res) => {
  try {
    const data = req.body;

    //hacer validaciones aqui

    const user = await UserModel.findUser(
      data.email.toLowerCase(),
      data.user_name.toLowerCase(),
      data.phone
    );
    if (user) {
      return res.status(400).json({
        ok: false,
        message: "User (email, user_name, phone) already exists",
      });
    }

    const newUser = await UserModel.create(data);

    const jwtConstructor = new SignJWT({
      user_name: newUser.user_name,
      user_id: newUser.id,
    });

    const encoder = new TextEncoder();
    const token = await jwtConstructor
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt()
      .setExpirationTime("30d")
      .sign(encoder.encode(JWT_PRIVATE_KEY));

    return res.status(201).json({
      ok: true,
      jwt: token,
      user_name: newUser.user_name,
      user_id: newUser.id,
    });
  } catch (error) {
    if (error?.code === "23505") {
      return res.status(409).json({ message: "Email already exists" });
    }
    return res.status(500).json({
      message: "ERROR SERVER",
      error: [{ message: "ERROR SERVER" }],
      info: null,
    });
  }
};

const validateUser = async (req, res) => {
  try {
    const data = req.body;

    const email = await UserModel.findEmail(data.email.toLowerCase());

    if (email) {
      return res.json({
        ok: false,
        message: "El correo electrónico ya existe",
      });
    }

    const phone = await UserModel.findPhone(data.phone);

    if (phone) {
      return res.json({
        ok: false,
        message: "El teléfono ya existe",
      });
    }

    const userName = await UserModel.findUserName(data.user_name.toLowerCase());

    if (userName) {
      return res.json({
        ok: false,
        message: "El nombre de usuario ya existe",
      });
    }

    return res.json({
      ok: true,
      message: "new user continue",
    });
  } catch (error) {
    return res.status(500).json({
      message: "ERROR SERVER",
      error: [{ message: "ERROR SERVER" }],
      info: null,
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const data = req.query;

    const users = await UserModel.getUsers(data.txt);

    return res.json(users);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: [{ message: "Internal server error" }],
      info: null,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const data = req.body;

    //aqui hacer validaciones

    const user = await UserModel.loginValidation(
      data.email.toLowerCase(),
      data.password
    );
    if (!user) {
      return res.status(404).json({ message: "Incorrect email or password" });
    }

    const jwtConstructor = new SignJWT({
      user_name: user.user_name,
      user_id: user.id,
    });

    const encoder = new TextEncoder();
    const token = await jwtConstructor
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt()
      .setExpirationTime("30d")
      .sign(encoder.encode(JWT_PRIVATE_KEY));

    return res.json({
      ok: true,
      jwt: token,
      user_name: user.user_name,
      user_id: user.id,
    });
  } catch (error) {
    return res.status(500).json({
      message: "ERROR SERVER",
      error: [{ message: "ERROR SERVER" }],
      info: null,
    });
  }
};

const whoami = async (req, res) => {
  const userid = req.user_id;

  try {
    const user = await UserModel.findByUserId(userid);

    return res.json({ message: "", error: [], info: user });
  } catch (error) {
    return res.status(500).json({
      message: "ERROR SERVER",
      error: [{ message: "ERROR SERVER" }],
      info: null,
    });
  }
};

const profileUser = async (req, res) => {
  const { userid } = req.params;

  try {
    const user = await UserModel.findByUserId(userid);

    return res.json({ message: "", error: [], info: user });
  } catch (error) {
    return res.status(500).json({
      message: "ERROR SERVER",
      error: [{ message: "ERROR SERVER" }],
      info: null,
    });
  }
};

const updateInfoUser = async (req, res) => {
  const data = req.body;
  const user_id = req.user_id;

  try {
    const user = await UserModel.findEditInfo(data.email, data.phone, user_id);

    if (user) {
      return res.status(400).json({
        message: "User (email or phone) already exists",
        error: [{ message: "User (email or phone) already exists" }],
        info: null,
      });
    }

    const userInfoUpdated = await UserModel.editInfoPersonal(data, user_id);

    return res.json({
      message: "Personal information successfully updated",
      error: [],
      info: userInfoUpdated,
    });
  } catch (error) {
    return res.status(500).json({
      message: "ERROR SERVER",
      error: [{ message: "ERROR SERVER" }],
      info: null,
    });
  }
};

const updateSettingUser = async (req, res) => {
  try {
    const data = req.body;
    const user_id = req.user_id;

    const user = await UserModel.findEditSetting(data.user_name, user_id);

    if (user) {
      return res.status(400).json({
        message: "Username already exists",
        error: [{ message: "Username already exists" }],
        info: null,
      });
    }

    const usersettingUpdated = await UserModel.editSettingPersonal(
      data,
      user_id
    );

    // insertar categorias si no existen
    for (let i = 0; i < data.categoriesOn.length; i++) {
      const categorie = await CategorieModel.findCategorie(
        user_id,
        data.categoriesOn[i]
      );

      if (!categorie) {
        await CategorieModel.create(user_id, data.categoriesOn[i]);
      }
    }

    // eliminar categorias si existen
    for (let i = 0; i < data.categoriesOff.length; i++) {
      CategorieModel.update(user_id, data.categoriesOff[i]);
    }

    return res.json({
      message: "Settings updated successfully",
      error: [],
      info: usersettingUpdated,
    });
  } catch (error) {
    return res.status(500).json({
      message: "ERROR SERVER",
      error: [{ message: "ERROR SERVER" }],
      info: null,
    });
  }
};

const updatePasswordUser = async (req, res) => {
  try {
    const data = req.body;
    const user_id = req.user_id;

    const user = await UserModel.editPassword(
      data.new_password,
      user_id,
      data.password
    );

    if (!user) {
      return res.json({
        message: "Incorrect password",
        error: [{ message: "Incorrect password" }],
        info: null,
      });
    }

    return res.json({
      message: "Password successfully updated",
      error: [],
      info: null,
    });
  } catch (error) {
    return res.status(500).json({
      message: "ERROR SERVER",
      error: [{ message: "ERROR SERVER" }],
      info: null,
    });
  }
};

const restorePassword = async (req, res) => {
  try {
    const id = req.user_id;
    const { password } = req.body;

    await UserModel.retorePassword(password, id);

    return res.json({
      message: "Password successfully updated",
      error: [],
      info: null,
    });
  } catch (error) {
    return res.status(500).json({
      message: "ERROR SERVER",
      error: [{ message: "ERROR SERVER" }],
      info: null,
    });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UserModel.findEmail(email.toLowerCase());

    if (!user) {
      return res.json({ ok: false, message: "usuario no existe" });
    }

    const jwtConstructor = new SignJWT({
      user_name: user.user_name,
      user_id: user.user_id,
    });

    const encoder = new TextEncoder();
    const token = await jwtConstructor
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(encoder.encode(JWT_PRIVATE_KEY));

    const info = await emailHelper(email, token);

    return res.json({
      ok: true,
      message: "Email enviado con éxito",
      email: info.response,
    });
  } catch (error) {
    return res.status(500).json({
      message: "ERROR SERVER",
      error: [{ message: "ERROR SERVER" }],
      info: null,
    });
  }
};

export const UserController = {
  createUser,
  validateUser,
  getUsers,
  loginUser,
  whoami,
  profileUser,
  updateInfoUser,
  updateSettingUser,
  updatePasswordUser,
  restorePassword,
  forgotPassword,
};

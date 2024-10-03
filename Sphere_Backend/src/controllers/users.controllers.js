import { SignJWT } from "jose";
import { JWT_PRIVATE_KEY } from "../config.js";
import { UserModel } from "../models/user.models.js";
import { CategorieModel } from "../models/categories.models.js";

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
      user_id: newUser.user_id,
    });

    const encoder = new TextEncoder();
    const token = await jwtConstructor
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt()
      .setExpirationTime("5h")
      .sign(encoder.encode(JWT_PRIVATE_KEY));

    return res.status(201).json({
      ok: true,
      jwt: token,
      user_name: newUser.user_name,
      user_id: newUser.user_id,
    });
  } catch (error) {
    if (error?.code === "23505") {
      return res.status(409).json({ message: "Email already exists" });
    }
    return res.status(500).json({ message: "Internal server error" });
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
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getUsers = async (req, res) => {
  try {
    const data = req.query;

    const users = await UserModel.getUsers(data.txt);

    return res.json(users);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
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
      user_id: user.user_id,
    });

    const encoder = new TextEncoder();
    const token = await jwtConstructor
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt()
      .setExpirationTime("5h")
      .sign(encoder.encode(JWT_PRIVATE_KEY));

    return res.json({
      ok: true,
      jwt: token,
      user_name: user.user_name,
      user_id: user.user_id,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const profileUser = async (req, res) => {
  const { userid } = req.params;

  try {
    const user = await UserModel.findByUserId(userid);

    return res.json(user);
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "ERROR SERVER",
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
        .json({ message: "User (email or phone) already exists", ok: false });
    }

    const userInfoUpdated = await UserModel.editInfoPersonal(data);

    return res.json(userInfoUpdated);
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "ERROR SERVER",
    });
  }
};

const updateSettingUser = async (req, res) => {
  try {
    const data = req.body;

    const user = await UserModel.findEditSetting(data.user_name, data.user_id);

    if (user) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const usersettingUpdated = await UserModel.editSettingPersonal(data);

    // insertar categorias si no existen
    for (let i = 0; i < data.categoriesOn.length; i++) {
      const categorie = await CategorieModel.findCategorie(
        data.user_id,
        data.categoriesOn[i]
      );
      if (!categorie) {
        CategorieModel.create(data.user_id, data.categoriesOn[i]);
      }
    }

    // eliminar categorias si existen
    for (let i = 0; i < data.categoriesOff.length; i++) {
      CategorieModel.update(data.user_id, data.categoriesOff[i]);
    }

    return res.json(usersettingUpdated);
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "ERROR SERVER",
    });
  }
};

const updatePasswordUser = async (req, res) => {
  try {
    const data = req.body;

    const user = await UserModel.editPassword(data);

    if (!user) {
      return res.status(400).json({ message: "Password incorrect" });
    }

    return res.json(user);
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "ERROR SERVER",
    });
  }
};

export const UserController = {
  createUser,
  validateUser,
  getUsers,
  loginUser,
  profileUser,
  updateInfoUser,
  updateSettingUser,
  updatePasswordUser,
};

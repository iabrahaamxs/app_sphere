import { UserApi } from "../api/userApi";

export const validateInputsLogin = (email, password) => {
  if (!email) {
    return "Por favor, ingresa tu correo electrónico.";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "El formato del correo no es válido.";
  }
  if (!password) {
    return "Por favor, ingresa tu contraseña.";
  }
  return null;
};

export const validateFieldsSignUp = async (userData) => {
  const { name, last_name, email, phone, user_name, country, gender } =
    userData;

  if (
    !name ||
    !last_name ||
    !email ||
    !phone ||
    !user_name ||
    !country ||
    !gender
  ) {
    return "Todos los campos son obligatorios.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "El formato del correo es incorrecto.";
  }

  if (phone.length < 10 || isNaN(phone)) {
    return "Número de teléfono inválido.";
  }

  try {
    const res = await UserApi.validateNewUser({ email, user_name, phone });

    if (!res.ok) {
      return res.message;
    }
  } catch (error) {
    return "Ocurrió un error, vuelve a intentarlo";
  }

  return null;
};

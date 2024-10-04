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

export const validatePasswords = (password, confirmPassword) => {
  const minLength = 6;
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const numberRegex = /\d/;
  const specialCharRegex = /[@#$%^&*.!]/;

  // Verificar si las contraseñas coinciden
  if (password !== confirmPassword) {
    return "Las contraseñas no coinciden.";
  }

  // Verificar la longitud mínima
  if (password.length < minLength) {
    return `La contraseña debe tener al menos ${minLength} caracteres.`;
  }

  // Verificar al menos una letra mayúscula
  if (!uppercaseRegex.test(password)) {
    return "La contraseña debe incluir al menos una letra mayúscula.";
  }

  // Verificar al menos una letra minúscula
  if (!lowercaseRegex.test(password)) {
    return "La contraseña debe incluir al menos una letra minúscula.";
  }

  // Verificar al menos un número
  if (!numberRegex.test(password)) {
    return "La contraseña debe incluir al menos un número.";
  }

  // Verificar al menos un carácter especial
  if (!specialCharRegex.test(password)) {
    return "La contraseña debe incluir al menos un carácter especial.";
  }

  return null;
};

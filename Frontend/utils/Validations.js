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

export const validateFieldsSignUp = (userData) => {
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

  const errors = [];

  if (password.length < minLength) {
    errors.push(`- Tener al menos ${minLength} caracteres`);
  }
  if (!uppercaseRegex.test(password)) {
    errors.push("- Incluir al menos una letra mayúscula");
  }
  if (!lowercaseRegex.test(password)) {
    errors.push("- Incluir al menos una letra minúscula");
  }
  if (!numberRegex.test(password)) {
    errors.push("- Incluir al menos un número");
  }
  if (!specialCharRegex.test(password)) {
    errors.push("- Incluir al menos un carácter especial");
  }

  return errors.length > 0
    ? `La contraseña debe cumplir los siguientes requisitos:\n${errors.join(
        "\n"
      )}`
    : null;
};

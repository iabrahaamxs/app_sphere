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

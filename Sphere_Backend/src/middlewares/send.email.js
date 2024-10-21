import nodemailer from "nodemailer";
import { PASSWORD_EMAIL, USER_EMAIL } from "../config.js";

export const emailHelper = async (to, token) => {
  // Create a transporter
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: USER_EMAIL,
      pass: PASSWORD_EMAIL,
    },
  });

  // Set up email options
  let mailOptions = {
    from: `"Sphere App" <${USER_EMAIL}>`,
    to: to,
    subject: "Restablecer contraseña",
    text: `Recibiste este correo porque solicitaste restablecer tu contraseña.
    Haz clic en el siguiente enlace, o pégalo en tu navegador:
    exp://192.168.0.104:8081/--/restorePassword/${token}?
    `,
  };

  // Send the email
  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

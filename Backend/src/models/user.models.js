import { poll } from "../db.js";

const create = async (data) => {
  const { rows } = await poll.query(
    `
    INSERT INTO users (name, last_name, user_name, phone, email, password, photo, bio, birthdate, gender, country) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
      RETURNING *`,
    [
      data.name,
      data.last_name,
      data.user_name.toLowerCase(),
      data.phone,
      data.email.toLowerCase(),
      data.password,
      data.user_photo,
      data.bio,
      data.birthdate,
      data.gender,
      data.country,
    ]
  );

  return rows[0];
};

const getUsers = async (txt, limit, offset) => {
  const { rows } = await poll.query(
    `
    SELECT * FROM users 
      WHERE user_name 
      ILIKE $1
      OR name ILIKE $1
      LIMIT $2 OFFSET $3`,
    [`%${txt}%`, parseInt(limit), parseInt(offset)]
  );

  return rows;
};

const findUser = async (email, user_name, phone) => {
  const { rows } = await poll.query(
    `
    SELECT * FROM users 
      WHERE email = $1 
      OR user_name = $2
      OR phone = $3`,
    [email, user_name, phone]
  );

  return rows[0];
};

const findByUserName = async (user_name) => {
  const { rows } = await poll.query(
    `
    SELECT u.id, 
      c.country, 
      u.name, 
      u.last_name, 
      u.user_name, 
      u.phone, 
      u.email, 
      u.photo, 
      u.bio, 
      u.birthdate, 
      u.gender, 
      u.created_at, 
      u.updated_at
        FROM users u
        JOIN countries c ON u.country = c.id
        WHERE u.user_name = $1;`,
    [user_name]
  );

  delete rows[0].password;

  return rows[0];
};

const findByUserId = async (user_id) => {
  const { rows } = await poll.query(
    `
    SELECT u.id, 
      u.country AS country_id, 
      c.country, 
      u.name, 
      u.last_name, 
      u.user_name, 
      u.phone, 
      u.email, 
      u.photo, 
      u.bio, 
      u.birthdate, 
      u.gender, 
      u.created_at, 
      u.updated_at
        FROM users u
        JOIN countries c ON u.country = c.id
        WHERE u.id = $1;
`,
    [user_id]
  );

  delete rows[0].password;

  return rows[0];
};

const findEditInfo = async (email, phone, user_id) => {
  const { rows } = await poll.query(
    `
    SELECT * FROM users
      WHERE (email = $1 
      OR phone = $2)
      AND NOT id = $3`,
    [email, phone, user_id]
  );

  return rows[0];
};

const editInfoPersonal = async (data, id) => {
  const { rows } = await poll.query(
    `
    UPDATE users 
      SET name = $1, last_name = $2, email = $3, phone = $4, birthdate = $5, country = $6, gender = $7, updated_at = CURRENT_TIMESTAMP
      WHERE id = $8 
      RETURNING *`,
    [
      data.name,
      data.last_name,
      data.email,
      data.phone,
      data.birthdate,
      data.country,
      data.gender,
      id,
    ]
  );

  return rows[0];
};

const findEditSetting = async (user_name, user_id) => {
  const { rows } = await poll.query(
    `
    SELECT * FROM users
      WHERE user_name = $1
      AND NOT id = $2`,
    [user_name, user_id]
  );

  return rows[0];
};

const editSettingPersonal = async (data, id) => {
  const { rows } = await poll.query(
    `
    UPDATE users 
      SET photo = $1, user_name = $2, bio = $3, updated_at = CURRENT_TIMESTAMP
      WHERE id = $4 
      RETURNING *`,
    [data.user_photo, data.user_name, data.bio, id]
  );

  return rows[0];
};

const editPassword = async (new_password, user_id) => {
  const { rows } = await poll.query(
    `
    UPDATE users 
      SET password = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *
    `,
    [new_password, user_id]
  );

  return rows[0];
};

const restorePassword = async (new_password, user_id) => {
  const { rows } = await poll.query(
    `
    UPDATE users 
      SET password = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *`,
    [new_password, user_id]
  );

  return rows[0];
};

const findEmail = async (email) => {
  const { rows } = await poll.query(
    `
    SELECT * FROM users 
      WHERE email = $1 `,
    [email]
  );

  return rows[0];
};

const findPhone = async (phone) => {
  const { rows } = await poll.query(
    `
    SELECT * FROM users 
      WHERE phone = $1 `,
    [phone]
  );

  return rows[0];
};

const findUserName = async (user_name) => {
  const { rows } = await poll.query(
    `
    SELECT * FROM users 
      WHERE user_name = $1 `,
    [user_name]
  );

  return rows[0];
};

const findPassword = async (id) => {
  const { rows } = await poll.query(
    `
    SELECT * FROM users 
      WHERE id = $1 `,
    [id]
  );

  return rows[0];
};

export const UserModel = {
  create,
  getUsers,
  findUser,
  findByUserName,
  findByUserId,
  findEditInfo,
  editInfoPersonal,
  findEditSetting,
  editSettingPersonal,
  editPassword,
  restorePassword,
  findEmail,
  findPhone,
  findUserName,
  findPassword,
};

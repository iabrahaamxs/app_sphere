import express from "express";
import { PORT } from "./config.js";
import { verifyToken } from "./middlewares/jwt.middlewares.js";
import userRoutes from "./routes/private/users.routes.js";
import userRoutesPublic from "./routes/public/users.routes.js";
import followsRoutes from "./routes/private/follows.routes.js";
import followsRoutesPublic from "./routes/public/follows.routes.js";
import postsRoutesPublic from "./routes/public/posts.routes.js";
import postsRoutes from "./routes/private/posts.routes.js";
import categoriesRoutes from "./routes/private/categories.routes.js";
import categoriesRoutesPublic from "./routes/public/categories.routes.js";
import photosRoutes from "./routes/private/photos.routes.js";
import countriesRoutesPublic from "./routes/public/countries.routes.js";
import FavoritesRoutes from "./routes/private/favorites.routes.js";
import likeRoutes from "./routes/private/likes.routes.js";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/private", verifyToken);

// private
app.use("/private/user", userRoutes);
app.use("/private/favorite", FavoritesRoutes);
app.use("/private/post", postsRoutes);
app.use("/private/photo", photosRoutes);
app.use("/private/follow", followsRoutes);
app.use("/private/categorie", categoriesRoutes);
app.use("/private/like", likeRoutes);

// public
app.use("/public/user", userRoutesPublic);
app.use("/public/country", countriesRoutesPublic);
app.use("/public/post", postsRoutesPublic);
app.use("/public/follow", followsRoutesPublic);
app.use("/public/categorie", categoriesRoutesPublic);

app.listen(PORT);
console.log("Server on port", PORT);

import express from "express";
import { PORT } from "./config.js";
import userRoutes from "./routes/users.routes.js";
import followsRoutes from "./routes/follows.routes.js";
import postsRoutes from "./routes/posts.routes.js";
import categoriesRoutes from "./routes/categories.routes.js";
import photosRoutes from "./routes/photos.routes.js";
import countriesRoutes from "./routes/countries.routes.js"
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(userRoutes);
app.use(photosRoutes);
app.use(followsRoutes, postsRoutes, categoriesRoutes, countriesRoutes);
//app.use(categoriesRoutes);

app.listen(PORT);
console.log("Server on port", PORT);

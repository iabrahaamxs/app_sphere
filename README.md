# Repository APP SPHERE

## Installation

Follow the steps below to set up and install the project on your local machine.

### 1. Clone the repository
```bash
git clone https://github.com/iabrahaamxs/app_sphere.git
cd app_sphere
```

### 2. Install dependencies
Navigate to the Backend and Frontend folders and install the required dependencies:

**Backend:**
```bash
cd Backend
npm install
```

**Frontend:**
```bash
cd ../Frontend
npm install
```

### 3. Configure `.env` files
In the `Backend` and `Frontend` folders, you will find the `.env.example` files. Make a copy of them and rename them to `.env`:

**Backend:**
```bash
cd Backend
copy .env.example .env
```

**Frontend:**
```bash
cd ../Frontend
copy .env.example .env
```

Edit the `.env` files in each folder and adapt the values according to your environment configuration.

### 4. Create the database
Ensure you have an active database server and create the required database.

Refer to the Entity-Relationship Model (ERM) below to structure the database:  

![Entity-Relationship Model](Database/MER%20SPHERE.png)


### 5. Start the project
Once the dependencies and `.env` files are configured, start the Backend and Frontend servers.

**Backend:**
```bash
cd Backend
npm run dev
```

**Frontend:**
```bash
cd Frontend
npm start
```

The project should now be running on your machine! 🎉

---

## Developers

- *Abraham Almao*
- *Madeleine Toussaint*


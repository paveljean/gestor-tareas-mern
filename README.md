# Gestor de Tareas

Este es un gestor de tareas desarrollado con el stack **MERN** (**MongoDB, Express, React, y Node.js**) que permite a los usuarios **registrarse, iniciar sesión y gestionar sus tareas** (crear, actualizar, eliminar y cambiar estados).

## Características principales

- Registro e inicio de sesión de usuarios con JWT Authentication.
- CRUD de tareas: Crear, Leer, Actualizar y Eliminar.
- Cambio de estado de tareas entre Pendiente y Realizado.
- Listado de tareas con diseño responsivo en React + Tailwind CSS.
- Base de datos en MongoDB para almacenar usuarios y tareas.
- Backend en Node.js + Express con rutas protegidas.

## Tecnologías Utilizadas

### Frontend (React + Vite)

- React.js
- Tailwind CSS
- React Router
- Axios (Para llamadas API)

### Backend (Node.js + Express)

- Express.js (Framework para Node.js)
- Mongoose (ODM para MongoDB)
- JWT (Autenticación con JSON Web Token)
- bycryptsj (Hashing de contraseñas)
- CORS (Manejo de peticiones cross-origin)

### Base de Datos

- MongoDB (Atlas o instancia local de MongoDB)

## Instalación y configuración

### Clonar el repositorio

```
bash
git clone https:/github.com/paveljean/gestor-tareas-mern.git
cd gestor-tareas-mern
```

### Configurar el Backend

```
cd backend
npm install
```
**Configurar variables de entorno (.env) en la carpeta backend/ :**

```
MONGO_URI=tu_url_mongodb
JWT_SECRET=tu_clave_secreta_jwt
PORT=5000
```

**Ejecutar el servidor**

````
npm start
````

Por defecto el backend se ejecutará en http://localhost:5000

## Configurar el Frontend

````
cd ../frontend
npm install
````

**Configurar variables de entorno (.env) en la carpeta frontend/ :**

````
VITE_API_URL=http://localhost:5000/api
````

**Ejecutar el cliente**

````
npm run dev
````

Por defecto, el frontend se ejecutará en http://localhost:5173

## Uso de la aplicación

1. Registro de usuarios en /register
2. Inicio de sesión en /login
3. Visualización de tareas en /task
4. Crear una nueva tarea con el botón "Crear nueva tarea"
5. Editar o eliminar tareas desde la lista
6. Cambiar estado entre "Pendiente" y "Realizado"

## Capturas de pantalla

- Pantalla de Login
  ![Image](https://github.com/user-attachments/assets/ab5408fb-fb31-4d55-9d6c-12dff22276d2)
- Pantalla de Register
  ![Image](https://github.com/user-attachments/assets/c9dadfde-e70d-4c78-9ee5-789436cce812)
- Listado de Tareas
  ![Image](https://github.com/user-attachments/assets/23a6c73b-e8d8-429c-a9b6-f8d9f39897c7)
- Formulario de Creación/Edición de tareas
  ![Image](https://github.com/user-attachments/assets/179d76c4-1c92-4933-8053-aa9db98e69f2)

## Contacto

- Email: pavelnoguera@gmail.com
- GitHub: github.com/paveljean
- Proyecto original creado por Jean Noguera

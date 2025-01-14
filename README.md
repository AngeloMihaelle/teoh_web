# Proyecto TEOH - Aplicación Web

Este es un proyecto web desarrollado con **Vue.js** y **Vite** para la gestión de usuarios, pedidos y productos. La aplicación permite a los administradores gestionar usuarios, modificar el estado de los pedidos y administrar los productos disponibles en el sistema.

## Tecnologías

- **Vue.js**: Framework de JavaScript para la construcción de interfaces de usuario.
- **Vite**: Herramienta de construcción rápida para proyectos de Vue.js.
- **Axios**: Librería para realizar solicitudes HTTP.
- **Azure**: Plataforma en la nube para desplegar y hospedar la aplicación.

## Características

### 1. **Gestión de Usuarios**
   - Ver y modificar los roles de los usuarios.
   - Eliminar usuarios.

### 2. **Gestión de Pedidos**
   - Ver los pedidos y modificar el estado de los mismos (Ej. `EN_PROCESO`, `FINALIZADO`).
   - Eliminar pedidos.

### 3. **Gestión de Productos**
   - Ver la lista de productos disponibles.
   - Modificar detalles de los productos, como nombre, precio y stock.
   - Eliminar productos.
   - Crear nuevos productos.

## Requisitos

- **Node.js**: Se recomienda la versión 14 o superior.
- **Vue CLI** (opcional): Si deseas trabajar con la versión local de Vue.js.
- **Vite**: Utilizado para la construcción y desarrollo del proyecto.

## Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu-usuario/teoh-app.git
   cd teoh-app
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

   El proyecto se ejecutará localmente en [http://localhost:5173](http://localhost:5173).

## Despliegue en Azure

### 1. **Azure Static Web Apps (Para proyectos estáticos)**

   - Sube los archivos de producción (generados en el paso `npm run build`) a **Azure Static Web Apps**.
   - Configura el **App Artifact Location** a la carpeta `dist` (por defecto de Vite).
   - Establece el origen de implementación a tu repositorio de GitHub o Azure DevOps.

### 2. **Azure App Service (Para aplicaciones con back-end)**

   Si tienes una API o back-end adicional, puedes elegir **Azure App Service** con el stack de **Node.js** para desplegar tanto el front-end como el back-end en una sola aplicación.

   - Sube el código fuente de tu aplicación.
   - Configura el entorno en **Node.js** si tienes un servidor para manejar las solicitudes de API o servidor de Vue.js.

---

## Licencia

Este proyecto está bajo la **Licencia Pública General GNU v2** (GPL-2.0).



---

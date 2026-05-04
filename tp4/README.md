# Sistema de Gestión de Notas

![React](https://img.shields.io/badge/React-Context_API-61DAFB?style=flat-square&logo=react)
![Hook](https://img.shields.io/badge/Hook-useReducer-764ABC?style=flat-square)
![CRUD](https://img.shields.io/badge/CRUD-Completo-2ECC71?style=flat-square)
![Version](https://img.shields.io/badge/versión-Estado_Global-27AE60?style=flat-square)

> Migración de estado local (`useState`) a una arquitectura de **Estado Global** utilizando la Context API de React y el hook `useReducer`. La lógica de negocio está centralizada, mejorando la escalabilidad y el mantenimiento de la aplicación.

---

## Conceptos Implementados

### 1. `NotasProvider` — El Proveedor

Componente envolvente implementado en el nivel superior de la aplicación (`main.jsx`). Actúa como una **"nube" de datos**, permitiendo que cualquier componente hijo acceda a las notas y funciones sin necesidad de pasar props manualmente, eliminando el **Prop Drilling**.

---

### 2. `useReducer` — El Gestor de Estado

Sustituye la lógica dispersa por un Reducer centralizado, el **"cerebro"** de la aplicación:

- **Estado Inicial:** centraliza la lista de notas, estados de carga y errores.
- **Acciones:** tipos de acciones claras como `AGREGAR_NOTA`, `ELIMINAR_NOTA` y `ACTUALIZAR_NOTA`.
- **Predecibilidad:** cada cambio en el estado es procesado por una función pura que determina el nuevo estado basándose en la acción recibida.

---

### 3. `useContext` — El Consumidor

Utilizado en componentes como `FormularioNota` y `NotaItem` para conectarse al contexto global. Esto permite:

- Desvincular los componentes de la lógica de peticiones a la API.
- Obtener directamente las funciones necesarias (`agregarNota`, `eliminarNota`, etc.) desde cualquier parte del árbol de componentes.

---

## Estructura de Archivos Clave

```
src/
├── context/
│   └── NotasContext.jsx   # Contexto, reducer y peticiones al servicio (fetch)
├── components/            # Componentes refactorizados para consumir el contexto
└── main.jsx               # Configuración del NotasProvider envolviendo la app
```

---

## Requerimientos Cumplidos

- [x] Implementación de `createContext` y `useContext`.
- [x] Uso de `Provider` para distribución de datos.
- [x] Manejo de lógica centralizada mediante `useReducer`.
- [x] Acciones completas de CRUD (Agregar, Editar, Eliminar).

---

<p align="center">
  Desarrollado por <strong>Luana Abigail Ramírez</strong> · IPF
</p>

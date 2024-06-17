# Proyecto Arquitecto de Soluciones Serverless
# Nombre: Alexander Merino

# Serverless Todo API

Este proyecto crea una API RESTful para gestionar una lista de tareas utilizando el Serverless Framework, AWS Lambda, API Gateway y DynamoDB.

## Objetivo

Crear una API para gestionar una lista de tareas (CRUD) que incluya las siguientes operaciones:
- Crear tareas
- Obtener tareas
- Actualizar tareas
- Eliminar tareas (solo si están completadas)

## Requisitos

- Node.js y npm instalados
- Serverless Framework instalado globalmente

## Instalación

1. Clona este repositorio:
    ```bash
    git clone https://github.com/joao14/serverless-challengue.git
    cd serverless-todo-api
    ```

2. Instala las dependencias del proyecto:
    ```bash
    npm install
    ```

## Configuración

Ya tiene un archivo llamado `serverless.yml` en la raíz del proyecto con el contenido que permite el despliegue en AWS.

El archivo `handler.js` permite la interaccion con la base de datos de dynamo

## Desplegar

Comando que usamos para desplegar a AWS

serverless deploy


## Endpoints

Crear Todo: POST /todos
Obtener Todo: GET /todos/{id}
Actualizar Todo: PUT /todos/{id}
Eliminar Todo: DELETE /todos/{id} (solo funciona si la tarea está completada)

'use strict';
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const { v4: uuidv4 } = require('uuid');

const TODOS_TABLE = process.env.TODOS_TABLE || 'Todos';


//Funcion que crea un elemento
module.exports.createTodo = async (event) => {
  const { title, completed, metadata } = JSON.parse(event.body);
  const id = uuidv4();
  const params = {
    TableName: TODOS_TABLE,
    Item: { id, title, completed, metadata },
  };

  await dynamoDb.put(params).promise();
  return {
    statusCode: 201,
    body: JSON.stringify({ id, title, completed, metadata }),
  };
};

//Funcion que obtiene un elemento
module.exports.getTodo = async (event) => {
  const { id } = event.pathParameters;
  const params = {
    TableName: TODOS_TABLE,
    Key: { id },
  };

  const result = await dynamoDb.get(params).promise();
  if (!result.Item) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: 'Todo not found' }),
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify(result.Item),
  };
};

//Funcion para actualizar un elemento de un todo
module.exports.updateTodo = async (event) => {
  const { id } = event.pathParameters;
  const { title, completed, metadata } = JSON.parse(event.body);
  const params = {
    TableName: TODOS_TABLE,
    Key: { id },
    UpdateExpression: 'set title = :title, completed = :completed, metadata = :metadata',
    ExpressionAttributeValues: {
      ':title': title,
      ':completed': completed,
      ':metadata': metadata,
    },
    ReturnValues: 'UPDATED_NEW',
  };

  const result = await dynamoDb.update(params).promise();
  return {
    statusCode: 200,
    body: JSON.stringify(result.Attributes),
  };
};

//Funcion que permite eliminar un elemento
module.exports.deleteTodo = async (event) => {
  const { id } = event.pathParameters;

  const getParams = {
    TableName: TODOS_TABLE,
    Key: { id },
  };

  const result = await dynamoDb.get(getParams).promise();
  if (!result.Item) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: 'Todo not found' }),
    };
  }

  if (!result.Item.completed) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Cannot delete incomplete todo' }),
    };
  }

  const deleteParams = {
    TableName: TODOS_TABLE,
    Key: { id },
  };

  await dynamoDb.delete(deleteParams).promise();
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Todo deleted' }),
  };
};

import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('redmoon.db');

export const initDatabase = () => {
  return new Promise<void>((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password TEXT, email TEXT, firstName TEXT, lastName TEXT);',
        [],
        () => {
          console.log('Tabela de usuários criada ou já existe.');
          resolve();
        },
        (_, error) => {
          console.log('Erro ao criar tabela de usuários:', error);
          reject(error);
          return true; // Return true to indicate that the error was handled
        }
      );
    });
  });
};

export const registerUser = (username: string, password: string, email: string, firstName: string, lastName: string) => {
  return new Promise<boolean>((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO users (username, password, email, firstName, lastName) VALUES (?, ?, ?, ?, ?);',
        [username, password, email, firstName, lastName],
        (_, resultSet) => {
          if (resultSet.insertId) {
            console.log('Usuário registrado com sucesso:', username);
            resolve(true);
          } else {
            console.log('Falha ao registrar usuário.');
            resolve(false);
          }
        },
        (_, error) => {
          console.log('Erro ao registrar usuário:', error);
          if (error.message.includes('UNIQUE constraint failed')) {
            reject(new Error('Nome de usuário já existe.'));
          } else {
            reject(error);
          }
          return true; // Return true to indicate that the error was handled
        }
      );
    });
  });
};

export const authenticateUser = (username: string, password: string) => {
  return new Promise<boolean>((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users WHERE username = ? AND password = ?;',
        [username, password],
        (_, { rows }) => {
          if (rows.length > 0) {
            console.log('Autenticação bem-sucedida para:', username);
            resolve(true);
          } else {
            console.log('Credenciais inválidas para:', username);
            resolve(false);
          }
        },
        (_, error) => {
          console.log('Erro ao autenticar usuário:', error);
          reject(error);
          return true; // Return true to indicate that the error was handled
        }
      );
    });
  });
};

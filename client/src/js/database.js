import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database


putDb(2,"hello")
export const putDb = async (content) => {
  console.log('PUT to the database');
  //create connection to database
  const jateDb = await openDB('jate', 1);

  //create transaction
  const tx = jateDb.transaction('jate', 'readwrite');

  //open up the desired object stor
  const store = tx.objectStore('jate');

  //use the put() method
  const request = store.put({id: 1, value: content}); //id was 1

  const result = await request;
  console.log('Data saved to the database', result);
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {/////Added id
  console.log('GET from the database');

  //create a connection to database including version
  const jateDb = await openDB('jate', 1);

  //create transaction 
  const tx = jateDb.transaction('jate', 'readonly');

  //Open up the desired object store
  const store = tx.objectStore('jate');

  // user the .getALL() method to get all data
  const request = store.get(1); //was 1

  //Get confirmation of the request
  const result = await request;
  console.log('result.value', result);
  return result?.value;
}

initdb();

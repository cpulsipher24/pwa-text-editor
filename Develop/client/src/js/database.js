import { openDB } from 'idb';

const dbName = 'jate'; // Database name
const storeName = 'notes'; // Object store name

const initdb = async () => {
  return openDB(dbName, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(storeName)) {
        const store = db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
        store.createIndex('content', 'content', { unique: false });
        console.log('IndexedDB object store created');
      }
    },
  });
};

export const putDb = async (content) => {
  const db = await initdb();
  const tx = db.transaction(storeName, 'readwrite');
  const store = tx.objectStore(storeName);
  await store.put({ content });
  await tx.complete;
  console.log('Content stored in IndexedDB:', content);
};

export const getDb = async () => {
  const db = await initdb();
  const tx = db.transaction(storeName, 'readonly');
  const store = tx.objectStore(storeName);
  const data = await store.getAll();
  await tx.complete;
  console.log('Retrieved content from IndexedDB:', data);
  return data.length > 0 ? data[0].content : null;
};

// Initialize IndexedDB
initdb();

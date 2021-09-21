const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? [] : JSON.parse(serializedState);
  } catch (err) {
    console.error('Get state error: ', err);
  }
};

const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (err) {
    console.error('Set state error: ', err);
  }
};

// Принимает ключ `key` по которому будет произведено удаление из LS.

const remove = key => {
  try {
    return localStorage.removeItem(key);
  } catch (error) {
    return null;
  }
};

export default { load, save, remove };

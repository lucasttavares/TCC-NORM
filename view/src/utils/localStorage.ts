function getStorage(key: string) {
  localStorage.getItem(key);
}

function setStorage(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

export { getStorage, setStorage };

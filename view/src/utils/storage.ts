function getStorage(key: string) {
  return sessionStorage.getItem(key);
}

function setStorage(key: string, value: any) {
  sessionStorage.setItem(key, value);
}

function clearStorage() {
  sessionStorage.clear();
}

export { getStorage, setStorage, clearStorage };

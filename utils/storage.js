import AsyncStorage from "@react-native-async-storage/async-storage";
const AUTH_KEY = "AUTH_KEY";

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {}
};

const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    alert(e);
  }
};

class StorageHelper {
  async getAuthKeyFromStorage() {
    return await getData(AUTH_KEY);
  }

  clearAuthKeys() {
    return storeData(AUTH_KEY, "");
  }

  setAuthKeyInStorage(authKey) {
    storeData(AUTH_KEY, authKey);
  }
}

const instance = new StorageHelper();
export default instance;

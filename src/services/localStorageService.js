class LocalStorageService {
    
    setJson(key ,json) {
        localStorage.setItem(key , JSON.stringify(json));
    }
    getJson(key) {
        return  JSON.parse(localStorage.getItem(key)) ?? [];
    }
}

export const localStorageService = new LocalStorageService();


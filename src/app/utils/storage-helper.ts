const localStore = localStorage;
export class StorageHelper{
    static APP_CONFIG = 'appConfig';

    static clear() {
        localStore.clear();
    }

    static set(key:string, value:any){
        localStore.setItem(key, JSON.stringify(value));
    }

    static get(key:string | null){
        return JSON.parse(localStore.getItem(key as string) as any);
    }

    static setAppConfig(value: any){
        this.set(this.APP_CONFIG,value)
    }

    
    static getAppConfig(){
        this.get(this.APP_CONFIG)
    }
}
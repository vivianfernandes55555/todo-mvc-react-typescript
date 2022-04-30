import { API } from "./api.service";

describe('API Service', () => {
    let apiService: any;
    let originalFetch: any;

    // const appConfig = {
    // }

    beforeEach(() => {
        originalFetch = global.fetch;
        global.fetch = jest.fn(() => Promise.resolve({
            status:200,
            json: () => 
               Promise.resolve({
                   status:200
               })
        })) as any;
        apiService = API();
    });

    afterEach(() => {
        global.fetch = originalFetch;
    });

    it('should handle API Service get()', async () => {
        expect(apiService.get('http://localhost:8000')).toBeDefined();
    });

    it('should handle API Service get() else', async () => {
        global.fetch = jest.fn(() => Promise.resolve({
            status:400,
            json: () => 
               Promise.resolve({
                   status:200
               })
        })) as any;
        expect(apiService.get('http://localhost:8000')).toBeDefined();
    });

    
    it('should handle error', async () => {
        global.fetch = jest.fn(() => Promise.resolve({
            status: 200,
            json: undefined
        })) as any;
        expect(apiService.get('http://localhost:8000')).toBeDefined();
    });

})
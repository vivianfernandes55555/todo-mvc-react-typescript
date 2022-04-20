import { request } from "http";

export { API }

interface requestOptionsType {
    headers?: any;
    body?: any;
    method?: any;
}

interface reqHeadersType {
    header?: any
}

export interface APIError {
    responseData?: any;
    statusCode?: number;
    successMessage?: string;
}
export interface ApiResponseType {
    response?: any;
    error?: APIError;
}

// const ignoreAuthAPIs = (requestUrl: string) => {
//     return !requestUrl.includes('oauth2');
// }

const API = () => {
    return {
        get: request('GET'),
        post: request('POST'),
        put: request('PUT'),
        delete: request('DELETE'),
        patch: request('PATCH'),
    };
    function request(method: string) {
        const statusCode = [200, 201, 204];

        return async (url: string, body?: any, reqHeaders?: reqHeadersType) => {
            const appConfig = [];
            const contentType = { 'Content-Type': 'application/json' };
            const baseUrl = 'https://www.google.com/';
            const requestUrl = baseUrl + '/todoList';
            const authHeader = () => {
                return {}
            };
            const reqOptions: requestOptionsType = {
                method,
                body,
                headers: {
                    ...contentType,
                    ...authHeader(),
                    ...reqHeaders
                }
            }
            let response: any = {};
            let error: APIError = {};
            const fetchResponse = await fetch(requestUrl, reqOptions);
            if (statusCode.includes(fetchResponse.status)) {
                try {
                    response = await fetchResponse.json();
                } catch (error) {
                    response = {
                        statusCode: fetchResponse.status,
                        successMessage: fetchResponse.statusText
                    };
                }
            }
            else {
                error = {
                    responseData: await fetchResponse.json(),
                    statusCode: fetchResponse.status,
                    successMessage: fetchResponse.statusText
                }
            }

            return {
                response,
                error
            }

        };


    }
}
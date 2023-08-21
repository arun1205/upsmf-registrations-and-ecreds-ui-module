/**
 * server response
*/
export interface ServerResponse {
    /**
     * api id
    */
    statusInfo: StatusInfo;
    /**
     * response param
    */
    responseData?: any;

    result?:any;
}

export interface StatusInfo {
    status: number;
    statusMessage: string;
    errorMessage?: any;
}

export interface Response {
    status: number;
    body?: any;
    error?: string;
}

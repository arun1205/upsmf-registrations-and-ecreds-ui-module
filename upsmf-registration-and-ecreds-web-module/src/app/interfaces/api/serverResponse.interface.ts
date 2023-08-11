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
}

export interface StatusInfo {
    status: number;
    statusMessage: string;
    errorMessage?: any;
}

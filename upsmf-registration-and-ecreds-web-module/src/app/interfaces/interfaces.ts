export interface ClaimsTableData {
    status: string;
    attachedDocs?: Array<string>;
    claimType?:string;
    id: string,
    entity: string,
    entityId: string,
    createdAt: string,
    updatedAt: string,
    attestedOn: string,
    attestorEntity: string,
    requestorName: string,
    attestationId: string,
    attestationName: string,
    attestorUserId: string,
    closed: boolean
    notes?: string
  }


  export interface TableColumn {
    columnDef: string;
    header: string;
    cell: Function;
    isLink?: boolean;
    isAction?: boolean;
    url?: string;
    isSortable?: boolean;
  }

  export interface DialogData {
    examsTableColumns: [];
    exams: [];
  }
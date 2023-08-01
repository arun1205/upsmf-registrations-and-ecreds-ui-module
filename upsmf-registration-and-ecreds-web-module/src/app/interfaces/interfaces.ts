export interface ClaimsTableData {
    grievanceRaiser: string;
    status: string;
    isLink? : boolean;
    description?: string;
    attachedDocs?: Array<string>;
    claimId: string,
    claimType:string;
    claimDate: string
    approvedDate?: string;
    rejectedDate?: string;
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
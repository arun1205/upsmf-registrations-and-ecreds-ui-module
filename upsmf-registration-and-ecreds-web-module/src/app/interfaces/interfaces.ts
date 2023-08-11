export interface ClaimsTableData {
    status: string;
    attachedDocs?: Array<string>;
    claimType?:string;
    id: string;
    entity: string;
    entityId: string;
    createdAt: string;
    updatedAt: string;
    attestedOn: string;
    attestorEntity: string;
    requestorName: string;
    attestationId: string;
    attestationName: string;
    attestorUserId: string;
    closed: boolean;
    notes?: string;
  }

  export interface UsersTableData {
    status: string;
    name: string;
    email:string;
    id: string;
    phoneNumber: string;
    role: string;
  }

  export interface TableColumn {
    columnDef: string;
    header: string;
    cell: Function;
    isLink?: boolean;
    isAction?: boolean;
    url?: string;
    isMenuOption?: boolean;
    isSortable?: boolean;
  }

  export interface DialogData {
    examsTableColumns: [];
    exams: [];
  }
  export interface claimcolumn {
    entityName: string;
    entityId: string;
    name: string;
    propertiesOSID: {
        Student: string[];
    }
  }
  export interface studentDetails {
    aadhaarNo: string;
      council: string;
      courseName: string;
      dateOfBirth: string;
      email: string;
      examBody:string;
      fathersName:string;
      finalYearRollNo: string;
      gender: string;
      joiningMonth: string;
      joiningYear: string;
      mothersName: string;
      name:string;
      nursingCollage: string;
      passingMonth: string;
      passingYear: string;
      phoneNumber: string;
      registrationType: string;
  }
  export interface claimDetails {
    entityName:string;
    entityId: string;
    name:string;
    propertiesOSID:object;
  }

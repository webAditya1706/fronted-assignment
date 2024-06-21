export interface UserData {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string
  role:string;
}

export interface LoginUserInterFace {
  email:string;
  password: string;
}

export interface RenderTableProps {
  storeValue: UserData[];
  setEditData: (data: UserData) => void;
  setEditDataById: (id: number) => void;
  startIndex:number;
}

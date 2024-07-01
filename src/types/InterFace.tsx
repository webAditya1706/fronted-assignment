export interface UserDataInterface {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string
  role: string;
  _id: string;
  logo: string;
  contact:string;
}

export interface LoginUserInterFace {
  email: string;
  password: string;
}

export interface RenderTableProps {
  storeValue: UserDataInterface[];
  setEditData: (data: UserDataInterface) => void;
  setEditDataById: (id: number) => void;
  startIndex: number;
}

export interface productInterface {
  _id: string;
  title: string;
  description: string;
  image: string;
  price: string;
  createdBy: string
}

export interface CartInterface {
  _id: string;
  userId: string;
  product: productInterface
}

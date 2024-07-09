export type InputsRegister = {
  name: string;
  user: string;
  type: string;
  password: string;
};

export type InputsLogin = {
  user: string;
  password: string;
};

export interface Chats {
  id?: string;
  name: string;
  message: string;
}

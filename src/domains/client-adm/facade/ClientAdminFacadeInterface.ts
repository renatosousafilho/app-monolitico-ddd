export type AddClientAdminFacadeInput = {
  id?: string;
  name: string;
  email: string;
  document: string;
  address: string;
};

export type AddClientAdminFacadeOutput = {
  id: string;
  name: string;
  email: string;
  document: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
};

export type FindClientAdminFacadeInput = {
  id: string;
};

export type FindClientAdminFacadeOutput = {
  id: string;
  name: string;
  email: string;
  document: string;
  address: string;
};

export default interface ClientAdminFacadeInterface {
  add(client: AddClientAdminFacadeInput): Promise<AddClientAdminFacadeOutput>;
  find(input: FindClientAdminFacadeInput): Promise<FindClientAdminFacadeOutput>;
}
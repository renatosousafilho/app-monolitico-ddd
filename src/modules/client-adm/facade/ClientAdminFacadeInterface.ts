export type AddClientAdminFacadeInput = {
  id?: string;
  name: string;
  email: string;
  document: string;
  address: string;
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
  add(client: AddClientAdminFacadeInput): Promise<void>;
  find(input: FindClientAdminFacadeInput): Promise<FindClientAdminFacadeOutput>;
}
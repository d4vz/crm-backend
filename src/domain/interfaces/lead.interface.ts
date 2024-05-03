export interface Lead {
  _id?: string;
  name: string;
  funnelId: string;
  email?: string;
  phone?: string;
  address?: string;
  state: string;
  createdAt?: Date;
  updatedAt?: Date;
}

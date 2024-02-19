export class ConstantType {
  id: number;
}
export interface IApiEndPoint {
  service: string;
  prefix?: string;
}

export enum Services {
  Food = 'food',
  Grocery = 'grocery',
  PND = 'pnd',
  Pharmacy = 'pharmacy',
  Paan = 'paan',
  Flower = 'flower',
  Pet = 'pet'
}

export enum Roles {
  superadmin = 'Super Admin',
  admin = 'Admin',
  serviceability = 'Serviceability',
  catalog = 'Catalog',
  oneview = 'One View',
  fleet_manager = 'Fleet Manager',
  ops_manager = 'Ops Manager',
  finance_manager = 'Finance Manager'
}

export const apiEndPoints: { [key in Services]: IApiEndPoint} = {
  [Services.Food]: {service: 'food', prefix: 'restaurant'},
  [Services.Grocery]: {service:'grocery', prefix: 'store'},
  [Services.PND]: {service: 'pnd'},
  [Services.Pharmacy]:{service:'pharmacy'},
  [Services.Paan]:{service:'paan'},
  [Services.Flower]:{service:'flower'},
  [Services.Pet]: {service:'pet'}
}

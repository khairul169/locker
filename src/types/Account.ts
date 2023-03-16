type BaseItem = {
  id?: string;
  parentId?: string;
  icon: string;
  iconColor?: string;
  title: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
};

export type Account = BaseItem & {
  isDirectory: false;

  url?: string;
  username?: string;
  password?: string;

  createdAt: Date;
  updatedAt: Date;
};

export type Directory = BaseItem & {
  isDirectory: true;
};

export type LockerItem = Directory | Account;

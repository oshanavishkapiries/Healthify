export interface BlogCategory {
  _id: string;
  category: string;
  isActive: boolean;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface Role {
  _id: string;
  role: string;
  isActive: boolean;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface Permission {
  _id: string;
  permission: string;
  isActive: boolean;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface MetadataResponse {
  success: boolean;
  message: string;
  data: {
    blogCategories: BlogCategory[];
    roles: Role[];
    permissions: Permission[];
  };
  timestamp: string;
} 
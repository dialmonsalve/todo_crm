export interface ICustomerResponseDto {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
  phone: string | null;
  company: string | null;
}

export const ALLOWED_SORT_CUSTOMER_FIELDS = [
  'id',
  'name',
  'email',
  'company',
] as const;

export class UpdatePermissionDto {
  status?: 'Pending' | 'Approved' | 'Rejected';
  reason?: string;
} 
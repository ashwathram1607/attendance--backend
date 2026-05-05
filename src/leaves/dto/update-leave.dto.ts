export class UpdateLeaveDto {
  status?: 'Pending' | 'Approved' | 'Rejected';
  reason?: string;
}

export class UpdateLeaveDto {
  status: 'Pending' | 'Approved' | 'Rejected' = "Pending";
  reason?: string;
}
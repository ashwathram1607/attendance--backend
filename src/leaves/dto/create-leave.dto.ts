export class CreateLeaveDto {
  name: string;
  leaveType:
    | 'Sick Leave'
    | 'Personal Leave'
    | 'Earned Leave'
    | 'Maternity Leave';
  fromDate: string;
  toDate: string;
  reason: string;
}

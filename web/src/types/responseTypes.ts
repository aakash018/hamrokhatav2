export interface ExpenditureDataType {
  id: number;
  description: string;
  amount: number;
  member: string;
  profile: null | string;
  date: string;
}

export interface HistoryDataTypes {
  status: number;
  message: string;
  expenditure: [
    {
      month: string;
      total_amount: number;
      expenditure_list: ExpenditureDataType[];
    }
  ];
}

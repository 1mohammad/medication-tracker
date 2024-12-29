export interface Medication {
  id: number;
  name: string;
  dosage: string;
  schedule: {
    days: string[];
    times: string[];
  };
  lastUpdated: string;
}

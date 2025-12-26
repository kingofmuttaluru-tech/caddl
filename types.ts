
export interface DiagnosticService {
  id: string;
  title: string;
  description: string;
  icon: string;
  priceRange: string;
  fullPriceList?: { item: string; price: string }[];
  prepInstructions?: string[];
  moreImages?: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  imageUrl?: string;
}

export enum DiagnosticStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface TestResult {
  parameter: string;
  value: string;
  unit: string;
  normalRange: string;
  status?: 'Normal' | 'Abnormal';
}

export interface DiagnosticCase {
  id: string; // Report Number
  sampleId: string;
  ownerName: string;
  ownerAddress?: string;
  mobile: string;
  petName: string;
  animalType: string;
  breed: string;
  age: string;
  gender: 'Male' | 'Female';
  weight?: string;
  testName: string;
  sampleType: string;
  testResults: TestResult[];
  doctorName: string;
  doctorRemarks?: string;
  collectionDateTime: string;
  reportDateTime: string;
  createdAt: string;
  status: 'Pending' | 'Completed';
}

export interface TestTemplate {
  name: string;
  parameters: { parameter: string; unit: string; normalRange: string }[];
}

export interface StaffMember {
  id: string;
  name: string;
  role: 'Admin' | 'Technician';
  username: string;
  lastLogin: string;
}

export type AppView = 'public' | 'auth' | 'dashboard';

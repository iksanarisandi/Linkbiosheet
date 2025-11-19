export interface LinkItem {
  id: string;
  label: string;
  url: string;
}

export interface ApiResponse {
  status?: string;
  data?: (string | number)[][]; // Assuming GAS returns row arrays
}

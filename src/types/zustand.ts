interface Store {
  currentPage?: string;
  role?: string;
  setCurrentPage?: (page: string) => void;
  setRole?: (role: string) => void;
}
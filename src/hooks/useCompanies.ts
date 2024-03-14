import { useTypedSelector } from "./useTypedSelector";

export const useCompanies = () =>
  useTypedSelector((state) => state.companies);

import { useContext } from "react";
import { BillsDataContext } from "../contexts/BillsDataContext";

export const useBillsData = () => {
    const context = useContext(BillsDataContext);
    return context;
};
  
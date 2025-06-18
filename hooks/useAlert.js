// hooks/useAlert.js
import { useAlertContext } from "@/components/alerts/AlertProvider";

const useAlert = () => {
  const { showAlert } = useAlertContext();
  return { showAlert };
};

export default useAlert;

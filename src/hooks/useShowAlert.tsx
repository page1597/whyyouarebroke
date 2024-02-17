import { useEffect, useState } from "react";

export default function useShowAlert() {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertContent, setAlertContent] = useState<{ title: string; desc: string; nav: string | null }>({
    title: "",
    desc: "",
    nav: null,
  });
  const [confirm, setConfirm] = useState<boolean | null>(null);

  return { showAlert, setShowAlert, alertContent, setAlertContent, confirm, setConfirm };
}

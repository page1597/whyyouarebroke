import { useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { useNavigate } from "react-router-dom";

function Alert({
  showAlert,
  setShowAlert,
  alertContent,
  setConfirm,
}: {
  showAlert: boolean;
  setShowAlert: (show: boolean) => void;
  alertContent: { title: string; desc: string; nav?: string | null };
  setConfirm?: (confirm: boolean) => void | null;
}) {
  const navigate = useNavigate();

  useEffect(() => {
    console.log(showAlert, alertContent);
  }, [showAlert]);

  return (
    <AlertDialog open={showAlert}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{alertContent.title}</AlertDialogTitle>
          <AlertDialogDescription>{alertContent.desc}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              console.log("취소");
              setShowAlert(false);
              if (setConfirm) {
                setConfirm(false);
              }

              if (alertContent.nav) {
                navigate(alertContent.nav);
              }
            }}
          >
            {setConfirm ? <>취소</> : <>확인</>}
          </AlertDialogCancel>
          {setConfirm ? (
            <AlertDialogAction
              onClick={() => {
                setConfirm(true);
                setShowAlert(false);
              }}
            >
              확인
            </AlertDialogAction>
          ) : (
            <></>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
export default Alert;

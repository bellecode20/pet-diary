import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import SuccessModal from "./SuccessModal";
import LoadingModal from "./LoadingModal";
import { useSelector } from "react-redux";
import GoOrStopModal from "./GoOrStopModal";
import ErrorCloseModal from "./errorCloseModal";
const ModalContainer = ({ titleText, yesText, yesAction }) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const category = useSelector((state) => state.modal.category);
  useEffect(() => {
    setIsBrowser(true);
  }, []);
  if (isBrowser) {
    if (category === "LoadingModal") {
      return ReactDOM.createPortal(
        <LoadingModal></LoadingModal>,
        document.getElementById("modal-root")
      );
    } else if (category === "SuccessModal") {
      return ReactDOM.createPortal(
        <SuccessModal></SuccessModal>,
        document.getElementById("modal-root")
      );
    } else if (category === "GoOrStopModal") {
      return ReactDOM.createPortal(
        <GoOrStopModal
          titleText={titleText}
          yesText={yesText}
          yesAction={yesAction}
        ></GoOrStopModal>,
        document.getElementById("modal-root")
      );
    } else if (category === "ErrorCloseModal") {
      return ReactDOM.createPortal(
        <ErrorCloseModal></ErrorCloseModal>,
        document.getElementById("modal-root")
      );
    }
  } else {
    return null;
  }
};
export default ModalContainer;

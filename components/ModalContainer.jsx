import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import SuccessModal from "./SuccessModal";
import LoadingModal from "./LoadingModal";
import { useSelector } from "react-redux";
const ModalContainer = () => {
  const [isBrowser, setIsBrowser] = useState(false);
  const category = useSelector((state) => state.modal.category);
  useEffect(() => {
    setIsBrowser(true);
  }, []);
  if (isBrowser) {
    if (category === "loading") {
      return ReactDOM.createPortal(
        <LoadingModal></LoadingModal>,
        document.getElementById("modal-root")
      );
    } else if (category === "communityCategory") {
      return ReactDOM.createPortal(
        <SuccessModal>커뮤니티 글을 올렸어요</SuccessModal>,
        document.getElementById("modal-root")
      );
    }
  } else {
    return null;
  }
};
export default ModalContainer;

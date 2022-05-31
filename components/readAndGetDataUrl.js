import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const dispatch = useDispatch();
export const readAndGetDataUrl = (e, photoUrlsInDb) => {
  const imageFile = useSelector((state) => state.imgToDataUrl.imageFile);
  const dataUrl = useSelector((state) => state.dataUrl.dataUrl);
  //   const checkThisImg = (e) => {
  useEffect(() => {
    const allArray = Array.from(e.target.files);
    if (allArray.length > 0) {
      dispatch(setDataUrls([]));
      dispatch(setImageFiles(allArray));
    } else {
      dispatch(setImageFiles(null));
    }
    //   };
  });
  console.log("b");

  //   useEffect(() => {
  //     //인풋에서 첨부할 사진을 선택하고나면, 그 사진을 스트링데이터로 변환시켜 preview state에 담는다.
  //     if (imageFile) {
  //       console.log("a");
  //       for (let x of imageFile) {
  //         const reader = new FileReader();
  //         reader.onloadend = () => {
  //           const url = reader.result;
  //           dispatch(addDataUrlToArray(url));
  //         };
  //         reader.readAsDataURL(x);
  //       }
  //       // } else if (commuPost.photo.length > 0) {
  //     } else if (photoUrlsInDb.length > 0) {
  //       dispatch(setDataUrls(photoUrlsInDb));
  //     } else setDataUrls(null);
  //   }, [imageFile]);
  return;
};

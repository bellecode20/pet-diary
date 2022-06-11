import Image from "next/image";
import imgPreview from "../../styles/components/ImgPreview.module.scss";
const ImgPreview = ({ data }) => {
  return (
    <div className={imgPreview.container}>
      <Image
        className={imgPreview.photo}
        alt="이 날 일기에 저장된 첫번째 사진"
        src={data.photo[0]}
        layout="fill"
        objectFit="cover"
      ></Image>
    </div>
  );
};

export default ImgPreview;

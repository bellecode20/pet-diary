import Image from "next/image";
import imgPreview from "../../styles/components/ImgPreview.module.scss";
const ImgPreview = ({ data }) => {
  return (
    <div className={imgPreview.container}>
      {/* {data.photo.map((img) => (
        <Image
          className={imgPreview.photo}
          src={img}
          layout="fill"
          objectFit="cover"
        ></Image>
      ))} */}
      <Image
        className={imgPreview.photo}
        src={data.photo[0]}
        layout="fill"
        objectFit="cover"
      ></Image>
    </div>
  );
};

export default ImgPreview;

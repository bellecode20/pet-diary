export async function requestPostToCloudinary(한장, cloudinary폴더) {
  const formData = new FormData();
  formData.append("file", 한장);
  formData.append("upload_preset", cloudinary폴더);
  const data = await fetch(
    "https://api.cloudinary.com/v1_1/diarycloud/image/upload",
    {
      method: "POST",
      body: formData,
    }
  )
    .then((res) => res.json())
    .catch((e) => console.error(e));
  return data;
}
// export async function requestPostToCloudinary(한장, cloudinary폴더) {
//   const formData = new FormData();
//   formData.append("file", 한장);
//   formData.append("upload_preset", cloudinary폴더);
//   const data = await fetch(
//     "https://api.cloudinary.com/v1_1/diarycloud/image/upload",
//     {
//       method: "POST",
//       body: formData,
//     }
//   ).then((res) => res.json());
//   return data;
// }

export async function uploadToMongodb(api파일주소, 업로드할컨텐츠) {
  const postResult = await fetch(api파일주소, {
    method: "POST",
    body: JSON.stringify(업로드할컨텐츠),
    //headers
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
  return postResult;
}

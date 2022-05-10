const WritePost = () => {
  return (
    <div>
      <div>상태바</div>
      <form>
        <input
          type="date"
          defaultValue="2022-01-01"
          min="2000-01-01"
          max="2050-12-31"
        ></input>
        <label htmlFor="uploadImgInput">Upload Image!</label>
        <input
          type="file"
          id="uploadImgInput"
          className={uploadImgInput}
          accept="image/*"
        ></input>
        <div>
          <p>스프와의 첫 만남</p>
          <div>? / 25</div>
        </div>
        <p>스프가 우리집에 처음 왔다.</p>
      </form>
    </div>
  );
};

export default WritePost;

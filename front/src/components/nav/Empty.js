function Empty({ index }) {
  return (
    <>
      <div
        key={index}
        style={{
          margin: "22px",
          textAlign: "center",
        }}
      >
        <img src="/empty.png" alt="비어있음" width="50%"></img>
      </div>
    </>
  );
}

export default Empty;

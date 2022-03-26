function NoneClick({ index }) {
  return (
    <>
      <div key={index} style={{ margin: "120px", textAlign: "center" }}>
        현재 아무런 항목도 누르지 않은 상태입니다.
        <br />
        상단 항목 중 아무거나 한 번 더 클릭 하시거나 전체 보기를 클릭 해주세요!
      </div>
    </>
  );
}

export default NoneClick;

import { Dropdown, DropdownButton } from "react-bootstrap";

/** category list dropdown
 *
 * @param {string} setCategory -category state
 * @returns {component} Category dropdown
 */
function Category({ setCategory }) {
  return (
    <DropdownButton
      id="dropdown-variants-Secondary"
      variant="secondary"
      title="카테고리 선택"
      className="mb-3"
    >
      <Dropdown.Item onClick={() => setCategory("all")}>전체</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item onClick={() => setCategory("developer")}>
        개발자
      </Dropdown.Item>
      <Dropdown.Item onClick={() => setCategory("artist")}>
        예술가
      </Dropdown.Item>
      <Dropdown.Item onClick={() => setCategory("mafia")}>마피아</Dropdown.Item>
    </DropdownButton>
  );
}

export default Category;

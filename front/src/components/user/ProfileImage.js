import React from "react";
import { Card, Form, Row } from "react-bootstrap";
import * as Api from "../../api";
import { BundleButton } from "../common/Button";

function ProfileImage({ user, setUser, setProfileImage }) {
  const onUploadImage = async (e) => {
    e.preventDefault();

    if (!e.target.File.files) {
      return;
    }

    const image = e.target.File.files[0];
    //create FormData Object
    const imgData = new FormData();
    //add image field to imgData
    imgData.append("image", image, image.name);

    try {
      const result = await Api.postImg("user/profileImage", imgData);
      const imageLink = result.data.imageLink;
      //upadte imageurl in user information
      const res = await Api.put(`users/${user.id}`, {
        ...user,
        profileImage: imageLink,
      });

      setProfileImage(false);
      setUser(res.data);
    } catch (err) {
      alert("프로필 사진 업로드 실패");
    }
  };

  return (
    <Card className="mb-2">
      <Card.Body>
        <Form onSubmit={onUploadImage}>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>한개의 사진을 추가해주세요.</Form.Label>
            <Form.Control type="file" name="File" single="true" />
          </Form.Group>
          <Form.Group as={Row} className="mt-3 text-center">
            <BundleButton setState={setProfileImage} />
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default ProfileImage;

import React, { useState } from "react";
import { Form, Input, Button, Upload, InputNumber } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { submitCarData } from "../../actions/carsSubmission";

const CarSubmission = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const [maxPictures, setMaxPictures] = useState(1);

  const handleFileChange = (info) => {
    setFileList([...info.fileList]);
  };

  const onFinish = async (values) => {
    if (Array.isArray(values?.images) && values?.images?.length > 0) {
      values.images = values?.images.map((item) => item?.response?.data[0]);
    }

    const response = await dispatch(submitCarData(values));
    if (response?.message && response?.data) {
      alert("Data has been Submitted Successfully");
      form.resetFields();
      setFileList([]);
      form.setFieldsValue({ maxPictures: 1, images: [] });
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <Form
      form={form}
      name="car_submission"
      onFinish={onFinish}
      initialValues={{ maxPictures }}
      style={{ padding: "35px", background: "rgb(224 222 222 / 46%)" }}
    >
      <Form.Item
        name="carModel"
        label="Car Model"
        rules={[{ required: true, message: "Please enter the car model" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="price"
        label="Price"
        rules={[{ required: true, message: "Please enter the price" }]}
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[
          { required: true, message: "Please enter a valid phone number" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="city"
        label="City"
        rules={[{ required: true, message: "Please enter the city" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="maxPictures"
        label="Max Number of Pictures"
        rules={[
          {
            required: true,
            message: "Please enter the max number of pictures",
          },
          {
            type: Number,
            min: 1,
            max: 10,
            message: "Maximum 10 pictures are allowed",
          },
        ]}
      >
        <InputNumber
          min={1}
          max={10}
          onChange={() => {
            setMaxPictures(form.getFieldValue("maxPictures"));
          }}
        />
      </Form.Item>

      <Form.Item
        name="images"
        label="Pictures"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload
          action={process.env.REACT_APP_API_URL + "/car/images-upload"}
          listType="picture"
          fileList={fileList}
          onChange={handleFileChange}
          accept="image/png, image/jpeg, image/jpg"
          multiple={true}
          maxCount={maxPictures}
        >
          <Button
            icon={<UploadOutlined />}
            disabled={fileList?.length === parseInt(maxPictures)}
          >
            Upload
          </Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CarSubmission;

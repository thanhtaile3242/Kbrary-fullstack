import React from "react";
import { DatePicker, Space } from "antd";
import moment from "moment";

const onChange = (date, dateString) => {
    console.log(date, dateString);
};

const disabledDate = (current) => {
    return current && current < moment().endOf("day");
};

const App = () => (
    <Space direction="vertical">
        <DatePicker
            onChange={onChange}
            disabledDate={disabledDate}
            allowClear
        />
    </Space>
);

export default App;

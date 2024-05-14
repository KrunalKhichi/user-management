import React from "react";
import PropTypes from "prop-types";
import "./Table.css";
import Button from "../Common/Button";

const Table = ({ searchData, searchTerm, editHandler, deleteHandler }) => {
  let content = null;

  let newSearchData = [...searchData];

  if (!searchData || searchData.length === 0) {
    content = (
      <tr>
        <td colSpan="6">
          {searchTerm === null || searchTerm === undefined || searchTerm === ""
            ? "Add some user"
            : "No result found"}
        </td>
      </tr>
    );
  } else {
    content = newSearchData?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))?.map((item, index) => (
      <tr key={item.id}>
        <td>{index + 1}</td>
        <td>{item.name}</td>
        <td>{item?.email}</td>
        <td>{item?.mobile}</td>
        <td>{item?.dob}</td>
        <td>
          <Button className="text-white bg-blue-500" onClick={() => editHandler(item)}>Edit</Button>
          <Button className="text-white bg-red-500 ml-4" onClick={() => deleteHandler(item)}>Delete</Button>
        </td>
      </tr>
    ));
  }

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Date of Birth</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {content}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  searchData: PropTypes.array,
  searchTerm: PropTypes.string,
  editHandler: PropTypes.func,
  deleteHandler: PropTypes.func
};

export default Table;

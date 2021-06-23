import React from "react";
import ModalForm from "../../components/UI/ModalForm";

const DeleteCategoryModal = (props) => {
  const {
    deleteCategoryModal,
    handleCloseDeleteCategory,
    setDeleteCategoryModal,
    handleDeleteCategory,
    expandedArray,
    checkedArray,
  } = props;
  return (
    <ModalForm
      show={deleteCategoryModal}
      modalTitle="Confirm"
      handleClose={handleCloseDeleteCategory}
      buttons={[
        {
          label: "No",
          color: "success",
          onClick: () => setDeleteCategoryModal(false),
        },
        {
          label: "Yes",
          color: "danger",
          onClick: handleDeleteCategory,
        },
      ]}
    >
      <h6>Expanded Category</h6>
      {expandedArray.length > 0 ? (
        expandedArray.map((item, i) => (
          <span className="form-label" key={i}>
            {item.name}
            {" | "}
          </span>
        ))
      ) : (
        <small>No Expanded Category Selected</small>
      )}
      <h6 className="mt-3">Checked Category</h6>
      {checkedArray.length > 0 ? (
        checkedArray.map((item, i) => (
          <span className="form-label" key={i}>
            {item.name}
            {" | "}
          </span>
        ))
      ) : (
        <small>No Checked Category Selected</small>
      )}
    </ModalForm>
  );
};

export default DeleteCategoryModal;

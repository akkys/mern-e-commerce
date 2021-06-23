import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from "../../actions";
import InputField from "../../components/UI/InputField";

const CheckoutAddressForm = (props) => {
  const { initialData } = props;
  const [name, setName] = useState(initialData ? initialData.name : "");
  const [mobileNumber, setMobileNumber] = useState(
    initialData ? initialData.mobileNumber : ""
  );
  const [pinCode, setPinCode] = useState(
    initialData ? initialData.pinCode : ""
  );
  const [locality, setLocality] = useState(
    initialData ? initialData.locality : ""
  );
  const [address, setAddress] = useState(
    initialData ? initialData.address : ""
  );
  const [cityDistrictTown, setCityDistrictTown] = useState(
    initialData ? initialData.cityDistrictTown : ""
  );
  const [state, setState] = useState(initialData ? initialData.state : "");
  const [landmark, setLandmark] = useState(
    initialData ? initialData.landmark : ""
  );
  const [alternatePhone, setAlternatePhone] = useState(
    initialData ? initialData.alternatePhone : ""
  );
  const [addressType, setAddressType] = useState(
    initialData ? initialData.addressType : ""
  );
  const [submitFlag, setSubmitFlag] = useState(false);
  const [id, setId] = useState(initialData ? initialData._id : "");

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onAddressSubmit = (e) => {
    const payload = {
      address: {
        name,
        mobileNumber,
        pinCode,
        locality,
        address,
        cityDistrictTown,
        state,
        landmark,
        alternatePhone,
        addressType,
      },
    };
    // console.log("patload", payload);
    if (id) {
      payload.address._id = id;
    }
    dispatch(addAddress(payload));
    setSubmitFlag(true);
  };

  useEffect(() => {
    if (submitFlag) {
      let _address = {};
      if (id) {
        _address = {
          _id: id,
          name,
          mobileNumber,
          pinCode,
          locality,
          address,
          cityDistrictTown,
          state,
          landmark,
          alternatePhone,
          addressType,
        };
      } else {
        _address = user.address.slice(user.address.length - 1)[0];
      }
      props.onSubmitForm(_address);
    }
  }, [user.address]);

  return (
    <div className="checkoutContainer">
      <div className="row mt-3">
        <div className="col-md-4">
          <InputField
            label="Name"
            inputType="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <InputField
            label="10-digit Mobile Number"
            inputType="input"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
        </div>
      </div>
      <div className="row ">
        <div className="col-md-4">
          <InputField
            label="Pincode"
            inputType="input"
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <InputField
            label="Locality"
            inputType="input"
            value={locality}
            onChange={(e) => setLocality(e.target.value)}
          />
        </div>
      </div>
      <div className="row ">
        <div className="col-md-8">
          <InputField
            label="Address (Area and Street)"
            inputType="textarea"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
      </div>
      <div className="row ">
        <div className="col-md-4">
          <InputField
            label="City/District/Town"
            inputType="input"
            value={cityDistrictTown}
            onChange={(e) => setCityDistrictTown(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <InputField
            label="State"
            inputType="input"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>
      </div>
      <div className="row ">
        <div className="col-md-4">
          <InputField
            label="Landmark (Optional)"
            inputType="input"
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <InputField
            label="Alternate Phone (Optional)"
            inputType="input"
            value={alternatePhone}
            onChange={(e) => setAlternatePhone(e.target.value)}
          />
        </div>
      </div>
      <label className="ml-4" style={{ fontSize: "13px" }}>
        Address Type
      </label>
      <div className="row ">
        <div className="col-md-4">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="addressType"
              id="inlineRadio1"
              value="home"
              onChange={() => setAddressType("home")}
            />
            <label className="form-check-label form-label" for="inlineRadio1">
              Home (All day delivery)
            </label>
          </div>
        </div>
        <div className="col-md-5">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="addressType"
              id="inlineRadio2"
              value="work"
              onChange={() => setAddressType("work")}
            />
            <label className="form-check-label form-label" for="inlineRadio2">
              Work (Delivery between 10 AM - 5 PM)
            </label>
          </div>
        </div>
      </div>
      <div className="row mt-3 mb-3" style={{ paddingBottom: "15px" }}>
        <div className="col-md-4">
          <button
            className="btn btn-md btn-block btn-order"
            onClick={onAddressSubmit}
          >
            SAVE AND DELIVER HERE
          </button>
        </div>
        <div className="col-md-3">
          <Button
            color="primary"
            className="btn-block"
            style={{ paddingTop: "15px" }}
            onClick={props.closeForm}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutAddressForm;

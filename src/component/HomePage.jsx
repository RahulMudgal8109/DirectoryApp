import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { isValid } from "@make-sense/adhaar-validator";
import { phone } from "phone";

const HomePage = () => {
  const [data, setData] = useState([]);
  const nameRef = useRef(null);
  const dobRef = useRef(null);
  const aadharRef = useRef(null);
  const mobileRef = useRef(null);
  const ageRef = useRef(null);
  const [inputVisible, setInputVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const addButtonClicked = () => {
    setInputVisible(!inputVisible);
  };

  const checkInDataBase = (aadharNo) => {
    return !data.some((item) => item.aadhar === aadharNo);
  };

  const aadharValidator = (aadharNo) => {
    if (!checkInDataBase(aadharNo)) {
      setErrorMessage("Aadhar Already Exists, Duplicate Aadhar not Allowed");
      return false;
    }
    if (!isValid(aadharNo)) {
      setErrorMessage("Invalid Aadhar Number. Please enter a valid Aadhar.");
      return false;
    }
    return true;
  };

  const phoneValidator = (phoneNo) => {
    return phone(phoneNo).isValid;
  };

  const emptyChecker = (name, dob, aadhar, mobile, age) => {
    if (!name) {
      setErrorMessage("Name cannot be empty.");
      return false;
    }
    if (!dob) {
      setErrorMessage("Date of Birth cannot be empty.");
      return false;
    }
    if (!aadhar) {
      setErrorMessage("Aadhar cannot be empty.");
      return false;
    } else if (!aadharValidator(aadhar)) {
      return false;
    }
    if (!mobile) {
      setErrorMessage("Mobile number cannot be empty.");
      return false;
    }
    if (!phoneValidator(mobile)) {
      setErrorMessage("Invalid mobile number.");
      return false;
    }
    return true;
  };

  const generateNewEntry = () => {
    if (
      emptyChecker(
        nameRef.current.value,
        dobRef.current.value,
        aadharRef.current.value,
        mobileRef.current.value,
        ageRef.current.value
      )
    ) {
      const newEntry = {
        id: uuidv4(),
        name: nameRef.current.value,
        dob: dobRef.current.value,
        aadhar: aadharRef.current.value,
        mobile: mobileRef.current.value,
        age: ageCalculator(dobRef.current.value),
      };

      const updatedData = [...data, newEntry];
      setData(updatedData);
      localStorage.setItem("data", JSON.stringify(updatedData));
      setInputVisible(false);
      setErrorMessage("");
    }
  };

  const deleteItem = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
    localStorage.setItem("data", JSON.stringify(updatedData));
  };

  useEffect(() => {
    const storedData = localStorage.getItem("data");
    
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        if (Array.isArray(parsedData)) {
          setData(parsedData);
        } else {
          setData([]); // If the parsed data is not an array, initialize as empty array
        }
      } catch (error) {
        console.error("Error parsing localStorage data", error);
        setData([]); // If there is an error parsing, initialize as empty array
      }
    } else {
      setData([]); // If no data in localStorage, initialize as empty array
    }
  }, []);

  const ageCalculator = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="container">
      <div className="homePage">
        <div className="homePageFirst">
          <div className="addNewPerson">Add New Person</div>
        </div>
        <table className="table">
          <tbody>
            <tr>
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Aadhar Number</th>
              <th>Mobile Number</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
            {data &&
              data.map((item) => (
                <tr key={item.id}>
                  <th>{item.name}</th>
                  <th>{item.dob}</th>
                  <th>{item.aadhar}</th>
                  <th>{item.mobile}</th>
                  <th>{item.age}</th>
                  <th>
                    <button onClick={() => deleteItem(item.id)}>Delete</button>
                  </th>
                </tr>
              ))}
            {inputVisible && (
              <tr>
                <th>
                  <input type="text" ref={nameRef} />
                </th>
                <th>
                  <input type="date" ref={dobRef} />
                </th>
                <th>
                  <input type="number" ref={aadharRef} />
                </th>
                <th>
                  <input type="number" ref={mobileRef} />
                </th>
                <th>
                  <input type="number" ref={ageRef} disabled />
                </th>
                <th>
                  <button onClick={generateNewEntry}>Save</button>
                </th>
              </tr>
            )}
          </tbody>
        </table>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div
          className="addButton"
          onClick={addButtonClicked}
        >
          Add
        </div>
      </div>
    </div>
  );
};

export default HomePage;

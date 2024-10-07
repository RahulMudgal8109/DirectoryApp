import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { isValid, isValidVID } from "@make-sense/adhaar-validator";
import { phone } from "phone";

const HomePage = () => {
  const [data, setData] = useState([]);
  console.log(data);
  const nameRef = useRef(null);
  const dobRef = useRef(null);
  const aadharRef = useRef(null);
  const mobileRef = useRef(null);
  const ageRef = useRef(null);
  const [inputVisible, setInputVisible] = useState(false);
  const addButtonClicked = () => {
    setInputVisible(!inputVisible);
  };
  const checkInDataBase = (aadharNo) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].aadhar === aadharNo) {
        alert("Aadhar Already Exists, Duplicate AAdhar not Allowed");
        return false;  // Immediately return false and stop the iteration
      }
    }
    return true;  // Return true if no match was found
  };
  
  const aadharValidator = (aadharNo) => {
    //console.log(aadharNo);
    if(!checkInDataBase(aadharNo))
    {
     
      return false;
    }
    // else{
    //   if(!isValid(aadharNo))
    //   {
    //     alert("Aadhar Card Number is Not Valid , please Enter A valid AAdhar Number")
    //   }
    //   return isValid(aadharNo);

    // }
    return true;
    
  };
  const phoneValidator = (phoneNo) => {
    console.log(phone);
    return phone(phoneNo).isValid;
  };
  const emptyChecker = (name, dob, aadhar, mobile, age) => {
    if (name === null || name === "") {
      alert("Name Cannot be Empty Or Null");
      return false;
    }
    if (dob === null || dob === "") {
      alert("Dob Cannot be Empty Or Null");
      return false;
    }
    if (aadhar === null || aadhar === "") {
      alert("Adhar Cannot be Empty Or Null");
      return false;
    } else {
      if (!aadharValidator(aadharRef.current.value)) {
        
        return false;
      }
    }
    if (mobile === null || mobile === "") {
      alert("mobile Cannot be Empty Or Null");
      return false;
    } else {
      if (!phoneValidator(mobileRef.current.value)) {
        alert("Mobile number not valid");
        return false;
      }
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
      const data2 = [
        ...data,
        {
          id: crypto.randomUUID(),
          name: nameRef.current.value,
          dob: dobRef.current.value,
          aadhar: aadharRef.current.value,
          mobile: mobileRef.current.value,
          age: ageCalculator(dobRef.current.value),
        },
      ];

      setData(data2);
      console.log(JSON.stringify(data2));
      localStorage.setItem("data", JSON.stringify(data2));
    }
    setInputVisible(false);
  };
  const deleteItem = (id) => {
    let data2 = data.filter((item) => {
      return item.id != id;
    });
    setData(data2);
    localStorage.setItem("data", JSON.stringify(data2));
  };
  useEffect(() => {
    const data3 = localStorage.getItem("data");
    setData(JSON.parse(data3));
  }, []);

  const ageCalculator = (dob) => {
    var dob = new Date(dob);

    var month_diff = Date.now() - dob.getTime();

    var age_dt = new Date(month_diff);

    var year = age_dt.getUTCFullYear();

    var age = Math.abs(year - 1970);
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
              data.map((item, index) => {
                return (
                  <tr key={index}>
                    <th>{item.name}</th>
                    <th>{item.dob}</th>
                    <th>{item.aadhar}</th>
                    <th>{item.mobile}</th>
                    <th>{item.age}</th>

                    <th>
                      <button
                        onClick={() => {
                          deleteItem(item.id);
                        }}
                      >
                        Delete
                      </button>
                    </th>
                  </tr>
                );
              })}
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
                  <button
                    onClick={() => {
                      generateNewEntry();
                    }}
                  >
                    Save
                  </button>
                </th>
              </tr>
            )}
          </tbody>
        </table>
        <div
          className="addButton"
          onClick={() => {
            addButtonClicked();
          }}
        >
          Add
        </div>
      </div>
    </div>
  );
};

export default HomePage;

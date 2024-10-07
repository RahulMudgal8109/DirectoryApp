import React, { useEffect, useRef, useState } from "react";


const RetrievePage = () => {
  const findRef=useRef(null)
  const [jsonData,setJsonData]=useState("");
  console.log(jsonData)
  const[myData,setMyData]=useState("");
  console.log(myData)
  

  useEffect(()=>{
    const data = localStorage.getItem("data");
    // check if data exits
    if(data.length)
    setJsonData(JSON.parse(data));
  },[])
  const findData=(aadhar)=>{
    
    for (let i = 0; i < jsonData?.length; i++) {
      if (jsonData[i].aadhar === aadhar) {
        setMyData(jsonData[i])
        
        return true; 
      }
    }
    setMyData(null)
    
    return false;
  }
  return (
    <div className="container">
      <div className="homePage">
        <div className="homePageFirst">
          <div className="firstSection">
            <div className="addNewPerson">Retrieve Information</div>
            
          </div>
          <div className="findSection">
            <input type="number" ref={findRef}/>
            <button onClick={()=>{
              findData(findRef.current.value)
            }}>Find</button>
          </div>
          {myData && <div className="final-op">
          {myData!=="" ?<div className="output">
            <div className="d-flex">
              <h4>Name:{myData.name}</h4>
              <h4>  Aadhar:{myData.aadhar}</h4>
              <h4> DOB:{myData.dob}</h4>
              <h4>Mobile:{myData.mobile}</h4>
              </div>
              
          </div>:"No data found"}
          </div>}
          
        </div>
      </div>
    </div>
  );
};

export default RetrievePage;

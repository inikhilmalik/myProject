import { createContext, useEffect, useState } from "react";

export const DataContext=createContext();

// const Data = [
//     {
//         category: "HVAC",
//         priority: "high",
//         activity: "Treated fresh air",
//         planned: 3,
//         startDate: "17-02-23",
//         endDate: "02-03-23",
//         dependOn: 41,
//         precurserTask: "Vendor contract",
//         status: "done",
//         taskOwner: "suresh"
//     },
//     {
//         category: "HVAC",
//         priority: "low",
//         activity: "Ducting",
//         planned: 15,
//         startDate: "28-02-23",
//         endDate: "14-03-23",
//         dependOn: 40,
//         precurserTask: "Execution drawings",
//         status: "wip",
//         taskOwner: "prakash"
//     },
//     {
//         category: "HVAC",
//         priority: "high",
//         activity: "Gril, slot",
//         planned: 15,
//         startDate: "24-02-23",
//         endDate: "20-03-23",
//         dependOn: 96,
//         precurserTask: "Vendor contract",
//         status: "done",
//         taskOwner:"rakesh"
//     },
//     {
//         category: "HVAC",
//         priority: "medium",
//         activity: "Treated fresh air",
//         planned: 3,
//         startDate: "10-02-23",
//         endDate: "16-03-23",
//         dependOn: 30,
//         precurserTask: "Gril, slot",
//         status: "pending",
//         taskOwner: ""
//     },
//     {
//         category: "Fire fighting",
//         priority: "high",
//         activity: "Execution drawing",
//         planned: 3,
//         startDate: "17-02-23",
//         endDate: "02-03-23",
//         dependOn: 51,
//         precurserTask: "Drawing-R.C.P",
//         status: "wip",
//         taskOwner: ""
//     },
//     {
//         category: "Fire fighting",
//         priority: "low",
//         activity: "Execution drawing",
//         planned: 9,
//         startDate: "22-01-23",
//         endDate: "12-02-23",
//         dependOn: 33,
//         precurserTask: "Drawing-R.C.P",
//         status: "wip",
//         taskOwner: "prakash"
//     },
//     {
//         category: "Fire fighting",
//         priority: "high",
//         activity: "Execution drawing",
//         planned: 13,
//         startDate: "7-02-23",
//         endDate: "2-03-23",
//         dependOn: 21,
//         precurserTask: "Drawing-R.C.P",
//         status: "done",
//         taskOwner: "mahesh"
//     },
//     {
//         category: "Fire fighting",
//         priority: "high",
//         activity: "Execution drawing",
//         planned: 8,
//         startDate: "14-01-23",
//         endDate: "28-01-23",
//         dependOn: 51,
//         precurserTask: "Drawing-R.C.P",
//         status: "pending",
//         taskOwner:""
//     },

// ]

export const DataContextProbvider=({children})=>{
    // const [myData,setmyData]=useState([]);

    // useEffect(()=>{
    //     setmyData(Data)
    // },[])
    
    
return(
    <DataContext.Provider  >
        {children}
    </DataContext.Provider>
    )

}
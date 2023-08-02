import React, { useEffect, useState } from "react";
import { Box, Text, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Checkbox, Flex, Input, Button, Select, option, FormControl, FormLabel, RadioGroup, Radio, Tooltip, Image } from '@chakra-ui/react'
import axios from "axios";
import { Link } from "react-router-dom";
import { BiSolidUpArrow, BiSolidDownArrow } from 'react-icons/bi';
import { MdDeleteOutline } from 'react-icons/md';
import { GrAddCircle } from 'react-icons/gr';
import { MenuLists } from "./MenuList";
import { PicsModal } from "./PicsModal";

const initialState = {
    row: "",
    category: "",
    priority: "",
    activity: "",
    planned: "",
    startDate: "",
    endDate: "",
    dependOn: "",
    precurserTask: "",
    status: "Pending",
    taskOwner: "",
    images: []
}

const PlanTable = () => {
    const [d, setD] = useState([]);
    const [data, setData] = useState([]);
    // const [task, setTask] = useState("");
    const [category, setCategory] = useState("");
    const [priority, setPriority] = useState("");
    const [show, setShow] = useState(false)
    const [formState, setFomState] = useState(initialState)
    const [sDate, setSDate] = useState("")
    const [eDate, setEDate] = useState("")
    const [endingDate, setEndingDate] = useState("")
    const [linkAction, setLinkAction] = useState("")

    function formatDateToDDMMYY(date) {
        if (date == "") {
            return
        }
        date = new Date(date)
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);
        return `${day}-${month}-${year}`;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        function addDaysToDate(startDateString, numDays) {
            // const dateParts = startDateString.split('-');
            // const startDate = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
            console.log(new Date(startDateString).getDate(), "aaaaaaa")
            const resultDate = new Date(startDateString);
            resultDate.setDate(new Date(startDateString).getDate() + Number(numDays));
            // console.log(resultDate.toISOString().slice(0, 10))
            return resultDate.toISOString().slice(0, 10);
        }


        if (name == "dependOn") {

            const now = new Date();
            const day = String(now.getDate()).padStart(2, '0');
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const year = String(now.getFullYear());
            const currentDate = `${year}-${month}-${day}`;
            let end_Date = currentDate;

            for (let i = 0; i < d.length; i++) {
                if (i == value - 1) {
                    end_Date = addDaysToDate(d[i].endDate, 1);
                }
            }
            if (value == 0 || value > d.length) {
                end_Date = currentDate;
            }
            else if (value == "" || !value) {
                end_Date = ""
            }

            setEndingDate(end_Date)

            setSDate(formatDateToDDMMYY((end_Date)))
            // console.log(end_Date, "sttttttt")
            setFomState({ ...formState, [name]: value, startDate: end_Date })
        }
        else if (name == "planned") {

            let endingDateShow = addDaysToDate(endingDate, value);
            setEDate(formatDateToDDMMYY(endingDateShow))

            setFomState({ ...formState, [name]: value, endDate: endingDateShow })
        }
        else {

            setFomState({ ...formState, [name]: value })
        }
        console.log(formState)
    }


    const handleSave = () => {
        console.log(formState)

        let formObj = {};
        for (let k in formState) {
            if (k == "row") {
                formObj["row"] = d.length + 1;
            }
            else {
                formObj[k] = formState[k]
            }
        }

        // axios.post("https://upset-plum-visor.cyclic.app/data/create", formObj)
        //     .then((res) => {
        //         console.log(res.data);
        //         getData();
        //     })
        //     .catch((err) => console.log(err))
        // setFomState(initialState)
        // setShow(false)
    }

    const getData = async () => {
        await axios.get("https://upset-plum-visor.cyclic.app/data")
            .then((res) => {
                console.log(res.data)
                let arr = res.data
                for (let i = 0; i < arr.length; i++) {
                    let priorityCounter = 0;
                    let curRow = arr[i].row
                    for (let j = 0; j < arr.length; j++) {
                        if (curRow == arr[j].dependOn) {
                            priorityCounter += 1;
                        }
                    }
                    // arr[i].priority = "low"

                    if (priorityCounter < 3) {
                        arr[i].priority = "low"
                    }
                    else if (priorityCounter >= 3 && priorityCounter < 5) {
                        arr[i].priority = "meduim"
                    }
                    else if (priorityCounter >= 5) {
                        arr[i].priority = "high"
                    }
                    console.log(priorityCounter)
                }
                setData(arr)
                setD(arr)
            })
            .catch((err) => console.log(err))
    }
    console.log(d)

    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {

        if (category == "all") {
            setD(data)
        }
        else if (priority) {
            let newData = data.filter((ele) => ele.category == category && ele.priority == priority)
            setD(newData)
        }
        else {
            let newData = data.filter((ele) => ele.category == category)
            setD(newData)
        }

    }, [category])

    const handleTask = (e, i) => {
        let Task = e.target.value;

        console.log(Task)
        if (Task == "delete") {
            handleDelete(i)

        }
        else if (Task == "rowup") {
            handleClickUp(i);
        }
        else if (Task == "rowdown") {
            handleClickDown(i);
        }

        Task = "";
    }

    const handleDelete = (id) => {
        console.log("dlt", id)
        let r = 0;
        let dO = 0;
        d.forEach((ele, i) => {
            if (i == id) {
                r = ele.row;
                dO = ele.dependOn;
            }
        })

        let ndd = d.map((ele, i) => {
            if (ele.dependOn == r) {
                ele.dependOn = dO
            }
            return ele
        })
        // console.log(ndd)
        let newData = d.filter((it, i) => i != id);
        // console.log("check",newData)
        for (let i = id; i < newData.length; i++) {
            let pr = newData[i].row;
            newData[i].row = i + 1
            for (let j = i + 1; j < newData.length; j++) {
                if (newData[j].dependOn == pr) {
                    newData[j].dependOn = i + 1;
                }
            }
        }
        // console.log("nD",newData)
        // setD(newData)
        updateMongoData(newData)
    }

    const handleDeleteAll = () => {
        console.log("dltALl")
        // let newData=d.map((it,i)=>{
        //     d.filter((it,i2)=>i!=i2)
        // })
        // console.log(newData)
        alert("Delete All ?")
        setD([])
    }

    const updateMongoData = (mydata) => {
        let arr = []
        for (let i = 0; i < mydata.length; i++) {
            let obj = {}
            for (let key in mydata[i]) {
                if (key != "_id") {
                    obj[key] = mydata[i][key];
                }
            }
            arr.push(obj)
        }


        console.log(arr, "arrrr")
        axios.post("https://upset-plum-visor.cyclic.app/data/updateData", arr)
            .then((res) => {
                console.log(res)
                getData()
            })
            .catch((err) => console.log(err))
    }

    function handleUpDown(data, up, down) {

        for (let i = 0; i < data.length; i++) {

            if (i + 1 != data[i].row) {
                data[i].row = i + 1;
            }

            if (up == data[i].dependOn) {
                data[i].dependOn = down;
            }
            else if (down == data[i].dependOn) {
                data[i].dependOn = up;
            }

        }
        console.log("nnnn", data)

        updateMongoData(data)
    }

    const handleClickUp = (i) => {
        if (i != 0) {
            console.log("up", i)
            let temp = d[i];
            d[i] = d[i - 1];
            d[i - 1] = temp;
            // console.log(d)
            handleUpDown(d, i, i + 1)
        }
    }

    const handleClickDown = (i) => {
        if (i != d.length - 1) {
            console.log("down", i)
            let temp = d[i];
            d[i] = d[i + 1];
            d[i + 1] = temp;
            // console.log(d)
            handleUpDown(d, i + 1, i + 2)
        }
    }

    const handlePriority = (e) => {
        console.log(e.target.value)
        setPriority(e.target.value)
        if (category) {
            let newData = data.filter((ele) => ele.priority == e.target.value && ele.category == category)
            setD(newData)
        }
        else if (e.target.value == "all") {
            setD(data)
        }
        else {
            let newData = data.filter((ele) => ele.priority == e.target.value)
            setD(newData)
        }

    }

    const handleStatus = (e) => {
        let val = e.target.value
        // console.log(val)
        if (e.target.value == "all") {
            setD(data)
        }
        else {
            let newData = data.filter((ele) => ele.status == val)
            setD(newData)
        }
    }

    const handleChangeTaskOwner = (e, id) => {
        let val = e.target.value
        console.log(val, id)
        axios.patch(`https://upset-plum-visor.cyclic.app/data/update/${id}`, { taskOwner: val })
            .then((res) => {
                console.log(res.data)
                getData()
            })
            .catch((err) => console.log(err))
    }

    const handleActivityStatus = (e, id) => {
        let val = e.target.value
        console.log(val, id)
        if (val != "") {
            axios.patch(`https://upset-plum-visor.cyclic.app/data/update/${id}`, { status: val })
                .then((res) => {
                    console.log(res.data)
                    getData()
                })
                .catch((err) => console.log(err))
        }
    }

    console.log("mainData", d)

    // console.log(formState)
    return (
        <Box>

            {/* <Flex alignItems={"center"} bg={"rgb(203,203,171)"} p="10px" mt={"10px"}>
                <Text textAlign={"center"} fontSize={20} fontWeight={600} >FILTERS  </Text>
                <Flex  >
                    <Flex ml={"20px"} >
                        <Flex ml={"10px"}  >
                            <Text mr={"5px"}>Focus</Text>
                            <Select border={"1px solid black"} width={"35px"} size={"xs"} onChange={handlePriority}   >
                                <option value={"all"}>All</option>
                                <option value={"high"}>High</option>
                                <option value={"medium"}>Med.</option>
                                <option value={"low"}>Low</option>
                            </Select>
                        </Flex>
                    </Flex>
                    <Flex>
                        <Flex ml={"30px"}>
                            <Text mr={"5px"}>Category</Text>
                            <Select border={"1px solid black"} width={"35px"} size={"xs"} onChange={(e) => { setCategory(e.target.value) }}  >
                                <option value={"all"}>All</option>
                                <option value={"HVAC"}>HVAC</option>
                                <option value={"Fire fighting"}>Fire fighting </option>
                            </Select>
                        </Flex>
                        <Flex ml={"30px"} >
                            <Text mr={"5px"}>Status</Text>
                            <Select border={"1px solid black"} width={"35px"} size={"xs"} onChange={handleStatus}  >
                                <option value={"all"}>All</option>
                                <option value={"Done"}>Done</option>
                                <option value={"WIP"}>WIP</option>
                                <option value={"Pending"}>Pending</option>
                            </Select>
                        </Flex>
                    </Flex>
                    <Flex ml={"30px"}>
                        <Flex >
                            <Text mr={"5px"}>Start</Text>
                            <Input onChange={(e) => setSDate(e.target.value)} mr={"10px"} size={"xs"} border={"1px solid black"} placeholder="Select Date" type="date" />
                        </Flex>
                        <Flex >
                            <Text mr={"5px"} >End</Text>
                            <Input border={"1px solid black"} placeholder="Select Date" size="xs" type="date" />
                        </Flex>
                    </Flex>
                </Flex>
            </Flex> */}
            {/* <Input onChange={(e)=>{setSDate(e.target.value)}} type="date" /> */}
            <Box margin={"auto"} mt={"10px"}  >
                {/* {flag && <Button >Delete</Button>} */}
                <TableContainer margin={"auto"}  >
                    <Table size={"0px"}  >
                        <Thead fontSize={13} >
                            <Tr bg={"rgb(200,200,200)"}  >
                                <Th width={"0%"}></Th>
                                <Th width={"1%"} p={"10px"}>
                                    <Text >ROW</Text><Text >No.</Text>
                                </Th>

                                <Th width={"3%"}>
                                    <Flex  >
                                        <Box>
                                            <Text>
                                                VENDOR
                                            </Text>
                                            <Text >
                                                CATEGORY
                                            </Text>
                                        </Box>
                                        <Flex alignItems={"end"} >

                                            <Select onChange={(e) => { setCategory(e.target.value) }} variant={"unstyled"} width={"32px"} >
                                                <option value={"all"}>All</option>
                                                <option value={"HVAC"}>HVAC</option>
                                                <option value={"Fire fighting"}>Fire fighting </option>
                                            </Select>
                                        </Flex>

                                    </Flex>
                                </Th>
                                <Th width={"3%"} ><Text >VENDOR</Text><Text >NAME</Text></Th>
                                <Th width={"8%"} pl={"10px"}><Text >ACTIVITY</Text><Text>OWNER</Text></Th>
                                <Th width={"2%"} >
                                    <Flex  >
                                        <Box>
                                            <Text>
                                                ACTIVITY
                                            </Text>
                                            <Text>
                                                PRIORITY
                                            </Text>
                                        </Box>
                                        <Flex alignItems={"end"}>

                                            <Select onChange={handlePriority} ml={"2px"} variant={"unstyled"} width={"26px"} >
                                                <option value={""}></option>
                                                <option value={"all"}>All</option>
                                                <option value={"high"}>High</option>
                                                <option value={"medium"}>Med.</option>
                                                <option value={"low"}>Low</option>
                                            </Select>
                                        </Flex>
                                    </Flex>
                                </Th>
                                <Th width={"6%"} mt={"25px"}><Text>ACTIVITY</Text><Text>TYPE</Text></Th>
                                <Th width={"15%"} ><Text >ACTIVITY</Text><Text >DETAILS</Text></Th>
                                <Th width={"6%"}><Text>ACTIVITY</Text><Text>LINKS</Text></Th>
                                <Th width={"2%"}> <Text>ACTIVITY</Text><Text>LINKS</Text></Th>
                                <Th width={"8%"}>
                                    <Flex  >
                                        <Box>
                                            <Text  >ACTIVITY</Text>
                                            <Text  >STATUS</Text>
                                        </Box>

                                        <Flex alignItems={"end"}>
                                            <Select variant={"unstyled"} width={"26px"} onChange={handleStatus}  >
                                                <option value={"all"}>All</option>
                                                <option value={"Done"}>Done</option>
                                                <option value={"WIP"}>WIP</option>
                                                <option value={"Pending"}>Pending</option>
                                            </Select>
                                        </Flex>
                                    </Flex>
                                </Th>
                                <Th width={"5%"}><Text>PLAN</Text><Text>DAYS</Text></Th>
                                <Th width={"5%"}><Text>START</Text><Text>DATE</Text></Th>
                                <Th width={"5%"} ><Text>END</Text><Text>DATE</Text></Th>
                                <Th width={"5%"} ><Text>ACTUAL</Text><Text>DAYS</Text></Th>
                                <Th width={"6%"} ><Text>DOCS.</Text><Text>UPLOAD</Text></Th>
                                <Th width={"6%"} ><Text>APPROVAL</Text><Text>STATUS</Text></Th>
                                <Th width={"6%"}  ><Text mt={"20px"}>TODO</Text></Th>

                            </Tr>
                        </Thead>
                        <Tbody fontSize={14}>
                            {
                                d && d?.map((item, i) => (
                                    <Tr key={i + 1} background={i % 2 == 0 ? "rgb(222,222,222)" : "rgb(235,235,235)"} >
                                        <Td>
                                            <Select onChange={(e) => handleTask(e, i)} size={"1px"}  >
                                                <option value={""}></option>
                                                <option value={"delete"}>Delete</option>
                                                <option value={"rowup"}>Row up</option>
                                                <option value={"rowdown"}>Row down</option>
                                            </Select>
                                        </Td>
                                        <Td ><Flex ml={"15px"} ><Text>{item.row} </Text> </Flex> </Td>
                                        <Td>{item.category}</Td>
                                        <Td>name</Td>
                                        <Td>
                                            <Flex alignItems={"center"}>
                                                <Select mr={"7px"} width={"35px"} size={"xs"} onChange={(e) => handleChangeTaskOwner(e, item._id)} >
                                                    {/* {item.taskOwner && <option style={{ color: "white" }} value={item.taskOwner}>{item.taskOwner}</option>} */}
                                                    <option value={""}></option>
                                                    <option value={""}>NONE</option>
                                                    {item.taskOwner != "rakesh" && <option value={"rakesh"}>rakesh</option>}
                                                    {item.taskOwner != "suresh" && <option value={"suresh"}>suresh</option>}
                                                    {item.taskOwner != "ramesh" && <option value={"ramesh"}>ramesh</option>}
                                                    {item.taskOwner != "mahesh" && <option value={"mahesh"}>mahesh</option>}
                                                    {item.taskOwner != "prakash" && <option value={"prakash"}>prakash</option>}
                                                </Select>
                                                <Text>{item.taskOwner}</Text>
                                            </Flex>
                                        </Td>
                                        <Td>{item.priority == "high" ? "HIGH" : item.priority == "low" ? "LOW" : "MED."}</Td>
                                        <Td>Purchase</Td>


                                        <Td >
                                            <Flex >
                                                {/* <Flex direction={"column"}>
                                                    <Button onClick={() => handleClickUp(i)} variant={"link"}>
                                                        <BiSolidUpArrow size={"10px"} />
                                                    </Button>
                                                    <Button onClick={() => handleClickDown(i)} variant={"link"} >
                                                        <BiSolidDownArrow background="white" size={"10px"} />
                                                    </Button>
                                                </Flex> */}
                                                {item.activity}
                                            </Flex>
                                        </Td>
                                        <Td>
                                            {/* <Tooltip placement="top" label={item.category + " / " + item.precurserTask} > */}
                                            <MenuLists setLinkAction={setLinkAction} getData={getData} id={item._id} index={i} data={d} />
                                            {/* </Tooltip> */}
                                        </Td>
                                        <Td >
                                            <Flex ml={"15px"}>

                                                {item.dependOn}
                                            </Flex>
                                        </Td>

                                        <Td >
                                            <Flex direction={"row"}>
                                                <Select onChange={(e) => handleActivityStatus(e, item._id)} mr={"7px"} width={"35px"} size={"xs"}  >
                                                    <option value={""}></option>
                                                    <option value={"Pending"}>Pending</option>
                                                    <option value={"WIP"}>WIP</option>
                                                    <option value={"Done"}>Done</option>

                                                </Select>
                                                <Box margin={"auto"} width={"60%"} fontWeight={500} bg={item.status == "Done" ? "rgb(0,153,0)" : item.status == "WIP" ? "rgb(204,204,0)" : "rgb(255,105,105)"} textAlign={"center"} borderRadius={"15px"} >
                                                    {item.status}
                                                </Box>
                                            </Flex>
                                        </Td>

                                        <Td>
                                            <Text ml={"15px"}>

                                                {item.planned}
                                            </Text>
                                        </Td>
                                        <Td><Text fontWeight={500} fontSize={12}>{formatDateToDDMMYY(new Date(item.startDate))}</Text></Td>
                                        <Td><Text fontWeight={500} fontSize={12}>{formatDateToDDMMYY(new Date(item.endDate))}</Text></Td>
                                        <Td></Td>
                                        <Td><PicsModal getData={getData} id={item._id} pics={item.images} /></Td>
                                        <Td>
                                            <Text>Pending</Text>
                                        </Td>
                                        <Td>
                                            <Text>Notes</Text>
                                        </Td>


                                    </Tr>
                                ))
                            }
                            {show &&
                                <Tr size={"0px"} >
                                    <Td></Td>
                                    <Td>
                                        <FormControl >
                                            <Input fontSize={14} readOnly name="row" value={d.length + 1} onChange={handleChange} bg={"rgb(222,222,222)"} border={"0px"} />
                                        </FormControl>
                                    </Td>

                                    <Td>
                                        <FormControl >
                                            <Select fontSize={13} name="category" value={formState.category} onChange={handleChange}   >
                                                <option value={""}>select</option>
                                                <option value={"HVAC"}>HVAC</option>
                                                <option value={"Fire fighting"}>Fire fighting </option>
                                            </Select>
                                        </FormControl>
                                    </Td>
                                    <Td><FormControl >
                                        <Input fontSize={13} onChange={handleChange} />
                                    </FormControl></Td>

                                    <Td>
                                        <Select fontSize={13} name="taskOwner" onChange={handleChange}>
                                            <option value={""}>Owner</option>
                                            <option value={"rakesh"}>rakesh</option>
                                            <option value={"suresh"}>suresh</option>
                                            <option value={"ramesh"}>ramesh</option>
                                            <option value={"mahesh"}>mahesh</option>
                                        </Select>
                                    </Td>
                                    <Td>
                                        <Select fontSize={13} name="priority" value={formState.priority} onChange={handleChange} >
                                            <option value={""}>select</option>
                                            <option value={"high"}>high</option>
                                            <option value={"medium"}>medium</option>
                                            <option value={"low"}>low</option>
                                        </Select>
                                    </Td>
                                    <Td>
                                        <FormControl >
                                            <Select fontSize={13} name="category" value={formState.category} onChange={handleChange}   >
                                                <option value={""}>Select</option>
                                                <option value={"Design"}>Design</option>
                                                <option value={"HVAC"}>Purchase</option>
                                                <option value={"Fire fighting"}>Execution</option>
                                            </Select>
                                        </FormControl>
                                    </Td>
                                    <Td><FormControl >
                                        <Input fontSize={13} name="activity" value={formState.activity} onChange={handleChange} />
                                    </FormControl></Td>
                                    <Td><FormControl >
                                        <Input fontSize={13} name="dependOn" value={formState.dependOn} onChange={handleChange} />
                                    </FormControl></Td>
                                    <Td></Td>
                                    <Td>
                                        <FormControl >
                                            <Input fontSize={13} name="status" readOnly value={"Pending"} bg={"rgb(222,222,222)"} border={"0px"} />
                                        </FormControl>
                                    </Td>
                                    <Td><FormControl >
                                        <Input fontSize={13} name="planned" value={formState.planned} onChange={handleChange} />
                                    </FormControl></Td>
                                    <Td><FormControl >
                                        <Input name="startDate" p={1} fontSize={11} value={sDate} onChange={handleChange} />
                                    </FormControl></Td>
                                    <Td><FormControl >
                                        <Input name="endDate" p={1} fontSize={11} value={eDate} onChange={handleChange} />
                                    </FormControl></Td>
                                    <Td></Td>
                                    <Td></Td>
                                    <Td></Td>
                                    <Td></Td>

                                </Tr>}

                        </Tbody>

                    </Table>


                </TableContainer>
                <Flex justifyContent={"right"}>
                    {show && <Button onClick={handleSave} bg={'blue.400'} color={'white'} width={"50px"} _hover={{ bg: 'blue.500', }}>Save</Button>}
                    <Button onClick={() => setShow(true)} variant={"link"} ><GrAddCircle /></Button>
                </Flex>
            </Box>
        </Box>
    );
}

export default PlanTable;

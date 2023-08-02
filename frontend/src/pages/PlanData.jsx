import React, { useEffect, useState, useContext } from "react";
import { Box, Text, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Checkbox, Flex, Input, Button, Select, option, Img, Radio, RadioGroup } from '@chakra-ui/react'
import axios from "axios";
import { Link } from "react-router-dom";
import PlanTable from "../components/PlanTable";



const PlanData = () => {

    return (
        <Box margin={"auto"} pb={"100px"} width={"98%"}>
            <Flex justifyContent={"space-between"}>
                <Img width={"70px"} src="https://pbs.twimg.com/profile_images/763978320492892160/dFh45huh_400x400.jpg" alt="logo" />
                <Box >
                    <Text fontWeight={600} fontSize={35} textAlign={"center"}>Orchid Pharma</Text>
                    <Text fontSize={25}  textAlign={"center"} >Interior Design View</Text>
                </Box>
                <Flex direction={"column"}  >
                    <Flex>
                        <Text >Start Date :</Text><Text> 10-04-23</Text>
                    </Flex>
                    <Flex justifyContent={"space-between"}>
                        <Text>End Date :</Text><Text textAlign={"end"}> 20-08-23</Text>
                    </Flex>
                    <Flex justifyContent={"space-between"}>
                        <Text>Project days :</Text><Text textAlign={"end"}> 180</Text>
                    </Flex>
                </Flex>
            </Flex>


            <PlanTable />
        </Box>
    );
}

export default PlanData;

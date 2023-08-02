// import {Flex,Box,FormControl,FormLabel,Input,Checkbox,Stack,Link,Button,Heading,Text,useColorModeValue} from '@chakra-ui/react';
// import { useContext, useState } from 'react';
// import { DataContext } from "../components/DataContextProvider";


// const initialState={
//         category: "",
//         priority: "",
//         activity: "",
//         planned: "",
//         startDate: "",
//         endDate: "",
//         dependOn: "",
//         precurserTask: "",
//         status: "",
//         taskOwner: ["suresh", "ramesh", "prakash", "rakesh"]
// }

// export default function Details() {
//     const [formState,setFomState]=useState(initialState)
//     const {myData}=useContext(DataContext)

//     const handleChange=(e)=>{
//         const {name,value}=e.target;
//         setFomState({...formState,[name]:value})
//     }

//     const handleSave=()=>{
//         console.log(formState);
//         myData.push(formState)
//         setFomState(initialState)
//     }

//     console.log(myData)

//     return (
//         <Flex
//             // minH={'100vh'}
//             align={'center'}
//             justify={'center'}
//             bg={useColorModeValue('gray.50', 'gray.800')}>
//             <Stack spacing={8} mx={'auto'} py={12} px={6}>
//                 <Stack align={'center'}>
//                     <Heading fontSize={'4xl'}>Add Details</Heading>
//                 </Stack>
//                 <Box
//                     rounded={'lg'}
//                     bg={useColorModeValue('white', 'gray.700')}
//                     boxShadow={'lg'}
//                     p={8}>
//                     <Stack spacing={4}  >
//                         <Flex>
//                             <FormControl >
//                                 <FormLabel>Category</FormLabel>
//                                 <Input name="category" value={formState.category} onChange={handleChange} />
//                             </FormControl>
//                             <FormControl >
//                                 <FormLabel>Priority</FormLabel>
//                                 <Input readOnly={false} border={"0px"} name="priority" value={formState.priority} onChange={handleChange} />
//                             </FormControl>
//                             <FormControl >
//                                 <FormLabel>Activity</FormLabel>
//                                 <Input name="activity" value={formState.activity} onChange={handleChange} />
//                             </FormControl>
//                             <FormControl >
//                                 <FormLabel>Planned Days</FormLabel>
//                                 <Input name="planned" value={formState.planned} onChange={handleChange}   />
//                             </FormControl>
//                             <FormControl >
//                                 <FormLabel>Start Date</FormLabel>
//                                 <Input name="startDate" value={formState.startDate} onChange={handleChange} />
//                             </FormControl>
//                             <FormControl >
//                                 <FormLabel>End Date</FormLabel>
//                                 <Input name="endDate" value={formState.endDate} onChange={handleChange} />
//                             </FormControl>
//                             <FormControl >
//                                 <FormLabel>Depends on</FormLabel>
//                                 <Input name="dependOn" value={formState.dependOn} onChange={handleChange}  />
//                             </FormControl>
//                             <FormControl >
//                                 <FormLabel>Precurser Task</FormLabel>
//                                 <Input name="precurserTask" value={formState.precurserTask} onChange={handleChange} />
//                             </FormControl>
//                             <FormControl >
//                                 <FormLabel>Status</FormLabel>
//                                 <Input name="status" value={formState.status} onChange={handleChange} />
//                             </FormControl>
//                         </Flex>
//                         <Flex spacing={10} justifyContent={"center"}>

//                             <Button
//                             onClick={handleSave}
//                                 bg={'blue.400'}
//                                 color={'white'}
//                                 width={"200px"}
//                                 _hover={{
//                                     bg: 'blue.500',
//                                 }}
//                                 >
//                                 Save
//                             </Button>
//                         </Flex>
//                     </Stack>
//                 </Box>
//             </Stack>
//         </Flex>
//     );
// }
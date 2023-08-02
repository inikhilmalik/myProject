import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Input,
    Flex,
    Box,
    Image
} from '@chakra-ui/react'
import axios from 'axios';
import { useState } from 'react'

export const PicsModal = ({id, getData,pics}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [images, setImages] = useState([]);

    const handleChange = (e) => {
        console.log(e.target.files[0])
        console.log(Array.from(e.target.files))
        const filesArray = Array.from(e.target.files);
        console.log(filesArray)
        setImages(filesArray);
        console.log(images)
    }

    const handleSubmit = () => {

        const formData = new FormData();
        images.forEach((image, index) => {
            formData.append(`image`, image);
        });
        // console.log(formData)

        axios.patch(`http://localhost:8080/data/updateImages/${id}`,formData ,{
            headers: {
                'Content-Type': 'multipart/form-data',
              },
        })
            .then((res) => {
                console.log(res.data)
                getData()
            })
            .catch((err) => console.log(err,"Err"))
    }
    // console.log(pics)


    return (
        <>
            <Button variant={"link"} onClick={onOpen}>upload</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Upload Samples</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <Box>
                            {
                                pics.map((it)=>(
                                    
                                    // <Image pt="10px" width={"40%"} src={`http://localhost:8080/uploads/image-1690701627063-Screenshot%20(39).png`} />
                                    <Image pt="10px" width={"40%"} src={`http://localhost:8080/${it.pic}`} />
                                ))
                            }
                        </Box>

                        <Input mt="15px" multiple onChange={handleChange} height={"38px"} p={1} type="file" />

                    </ModalBody>

                    <ModalFooter >
                        <Flex width={"100%"} justifyContent={"space-between"}>
                            <Button  colorScheme='blue' p={2} borderRadius={0} mr={3} onClick={handleSubmit}>
                                upload
                            </Button>
                            <Button variant='ghost'>send request for approval</Button>
                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
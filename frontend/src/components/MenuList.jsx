import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Button
} from '@chakra-ui/react'
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import axios from 'axios'

export const MenuLists = ({ setLinkAction, index, data, id, getData }) => {
    const [value, setValue] = useState("")
    const [val, setVal] = useState(false)

    const handleListAction = (i) => {
        setVal(true)
        axios.patch(`https://upset-plum-visor.cyclic.app/data/update/${id}`, { dependOn: i + 1 })
            .then((res) => {
                setVal(false)

                console.log(res.data)
                getData()
            })
            .catch((err) => console.log(err))
    }

    if(val)
    {
        return "Loading..."
    }

    console.log(value)
    // console.log(index,"ind")
    console.log(data)
    // console.log(val, "val")

    return (
        <Menu closeOnSelect={false}>
            {({ isOpen }) => (
                <>
                    <MenuButton isActive={isOpen} as={Button} color={"black"} variant={"link"} >
                        Links
                    </MenuButton>
                    <MenuList  >

                        <MenuItem fontSize={15} fontWeight={600} >Show Precursor</MenuItem>
                        <MenuItem fontSize={15} fontWeight={600}>Show Successor</MenuItem>

                        <MenuItem p={0} >
                            <Menu placement="right" >
                                <MenuButton fontSize={15} fontWeight={600} pl={3} textAlign={"start"} width={"100%"} rightIcon={<ChevronRightIcon />}>
                                    Change Link <ChevronRightIcon />
                                </MenuButton>
                                <MenuList >
                                    {
                                        data.map((item, i) => (
                                            <MenuItem onClick={() => handleListAction(i)} isDisabled={index == i} >{item.category} - {item.activity}</MenuItem>
                                        ))
                                    }
                                </MenuList>
                            </Menu>
                        </MenuItem>

                        <MenuItem onClick={() => handleListAction(-1)} fontSize={15} fontWeight={600}>Delete Link</MenuItem>

                    </MenuList>
                </>
            )}
        </Menu>
    )
}
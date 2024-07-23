import {
  FormControl,
  FormLabel,
  Input,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Textarea,
  ModalFooter,
} from '@chakra-ui/react'
import { AddIcon } from "@chakra-ui/icons";
import { useRecoilState } from 'recoil';
import poemsAtom from '../../atom/poemsAtom.js';
import { useState } from 'react';

const MAX_CHAR = 1000

const CreatePoem = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [poemText, setPoemText] = useState("")
  const [loading, setLoading] = useState(false)
  const [poem, setPoem] = useRecoilState(poemsAtom)
  const [name, setName] = useState("")

  const handlePoemTextChange = (e) => {
    const inputText = e.target.value

    if(inputText > MAX_CHAR) {
      const truncatedText = inputText.slice(0, MAX_CHAR)
      setPoemText(truncatedText)
    } else {
      setPoemText(inputText);
    }
  }

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleCreatePoem = async () => {
    setLoading(true)

    try {
      const res = await fetch("/api/poem/createPoem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, contents: poemText })
      })

      const data = await res.json()
      if(data.error) {
        console.log(data.error)
        return
      }

      console.log(data)
      setPoem([data, ...poem])

      onClose()
      setPoemText("")
      setName("")
    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }


  return (
    <>
      <Button position={"fixed"} bottom={10} right={5} bg={"gray.300"} onClick={onOpen} size={{ base: "sm", sm: "md" }}>
        <AddIcon />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Create A Poem</ModalHeader>
          <ModalCloseButton />
          <ModalBody p={6}>
            <FormControl>
              <FormLabel>Name:</FormLabel>
              <Input value={name} onChange={handleNameChange} />
            </FormControl>
            <FormControl mt={5}>
              <Textarea placeholder='Contents' value={poemText} onChange={handlePoemTextChange}/>
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent={"center"}>
            <Button colorScheme='blue' mr={3} onClick={handleCreatePoem} isLoading={loading}>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreatePoem
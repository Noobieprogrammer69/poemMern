import { Box, Flex, Text } from "@chakra-ui/react"
import { formatDistanceToNow } from "date-fns"
import PropTypes from 'prop-types'

const Poem = ({ poem }) => {
  return (
    <Box
        bg="rgba(255, 255, 255, 0.1)" 
        backdropFilter="blur(20px)"
        borderRadius="10px"
        p={4}
        mb={4}
    >
        <Flex gap={3} mb={4} py={5}>
            <Flex justifyContent={"space-between"} w={"full"}>
                <Flex w={"full"} alignItems={"center"}>
                    <Text fontWeight={"bold"} fontSize={"sm"}>{poem.name}</Text>
                </Flex>
                <Flex gap={4} alignItems={"center"}>
                    <Text fontSize={"xs"} w={36} textAlign={"right"}>{formatDistanceToNow(new Date(poem.createdAt))} ago</Text>
                </Flex>
            </Flex>
        </Flex>
        <Text>{poem.contents}</Text>
    </Box>
  )
}

Poem.propTypes = {
    poem: PropTypes.shape({
      name: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      contents: PropTypes.string.isRequired,
    }).isRequired,
  }

export default Poem
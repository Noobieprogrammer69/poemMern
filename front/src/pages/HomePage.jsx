import { Box, Flex, Spinner } from '@chakra-ui/react'
import { CreatePoem, Poem } from '../components'
import { useRecoilState } from 'recoil';
import poemsAtom from '../../atom/poemsAtom';
import { useEffect, useState } from 'react';

const HomePage = () => {
  const [poems, setPoems] = useRecoilState(poemsAtom);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getPoems = async () => {
      setLoading(true)
      setPoems([])
      try {
        const res = await fetch("/api/poem/getPoems")
        const data = await res.json()
        console.log('Fetched data:', data);
        if(data.error) {
          console.log(data.error)
          return
        }

        setPoems(data)
      } catch (error) {
        console.log(error.message)
      } finally {
        setLoading(false)
      }
    }
    getPoems()
  }, [setPoems])

  return (
    <Flex w={"full"} justifyContent={'center'}>
      <Box flex={70}>
        {loading && (
          <Flex justify="center">
            <Spinner size="xl"/>
          </Flex>
        )}

        { poems.map((poem) => (
          <Poem key={poem._id} poem={poem} />
        ))}

        <CreatePoem />
      </Box>
    </Flex>
  )
}

export default HomePage
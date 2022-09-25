import { Button, Circle, Container, HStack, Icon, Stack, useDisclosure, Text } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { FaFan } from 'react-icons/fa'
import { motion, useTime, useTransform } from 'framer-motion'
import { useState } from 'react'

const Home: NextPage = () => {
  // const [isOn, setOn] = useState(false)
  const { isOpen: isOn, onToggle: turnOnOff } = useDisclosure()
  const [speed, setSpeed] = useState(0);
  const MAX_SPEED = 4


  const onClickOnOff = () => {
    if (isOn) {
      setSpeed(0);
      turnOnOff()
    } else {
      setSpeed(1);
      turnOnOff()
    }
  }
  const onClickMin = () => {
    if (speed > 1) {
      setSpeed(speed - 1)
    } else {
      alert("kecepetan minimum!")
    }
  }

  const onClickPlus = () => {
    if (speed < MAX_SPEED) {
      setSpeed(speed + 1)
    } else {
      alert("kecepetan maksimum!")
    }
  }


  return (
    <Container>
      <Stack alignItems={"center"} py={5} spacing={3}>
        <KipasAngin isOn={isOn} speed={speed} />
        <Stack id="remote-control" maxW="200">
          <Button onClick={onClickOnOff}>{isOn ? "Off" : "On"}</Button>
        </Stack>
        <HStack>
          <Button onClick={onClickMin}>-</Button>
          <Text>{speed}</Text>
          <Button onClick={onClickPlus}>+</Button>
        </HStack>
      </Stack>
    </Container>
  )
}

type KipasAnginProps = {
  isOn: boolean;
  speed: number;
}

const KipasAngin = (props: KipasAnginProps) => {
  const calculatedSpeed = props.isOn ? 1000 - (100 * props.speed) : 0;
  const time = useTime();
  const rotate = useTransform(time, [0, calculatedSpeed], [0, -360], { clamp: false });

  return (
    <Stack borderWidth={3} borderColor="gray.200" py={4} px={"20"} borderRadius={"lg"} alignItems="stretch">
      <motion.div style={{ rotate, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
        <Icon as={FaFan} fontSize="80" color={"gray.600"} />
      </motion.div>

      <HStack px={4} minW={100}>
        <Circle bgColor={props.isOn ? "green" : "red"} size={2} />
      </HStack>
    </Stack>
  )
}

export default Home

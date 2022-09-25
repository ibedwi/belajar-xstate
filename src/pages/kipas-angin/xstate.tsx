import { Button, Circle, Container, HStack, Icon, Stack, useDisclosure, Text, useToast } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { FaFan } from 'react-icons/fa'
import { motion, useTime, useTransform } from 'framer-motion'
import { useState } from 'react'
import { useMachine } from '@xstate/react'
import { kipasAnginMachine } from '../../modules/kipas-angin/kipasAnginMachine'
import { assign } from 'xstate'

const KipasAnginXState: NextPage = () => {
  const toast = useToast()

  const [kipasAnginState, kipasAnginSend] = useMachine(kipasAnginMachine, {
    actions: {
      showAlert: (_, event) => {
        if (event.type === "USER_CLICK_ADD_SPEED") {
          toast({
            title: "Kecepatan maksimum!",
            isClosable: true,
            status: "error"
          })
        }

        if (event.type === "USER_CLICK_DECREASE_SPEED") {
          toast({
            title: "Kecepatan minimum!",
            isClosable: true,
            status: "error"
          })
        }
      }
    }
  })

  const isOn = kipasAnginState.matches("on")
  const speed = kipasAnginState.context.speed;

  const onClickOnOff = () => {
    if (kipasAnginState.matches("on")) {
      kipasAnginSend({ type: "USER_CLICK_OFF" })
    } else {
      kipasAnginSend({ type: "USER_CLICK_ON" })
    }
  }

  const onClickMin = () => {
    kipasAnginSend({
      type: "USER_CLICK_DECREASE_SPEED", data: {
        newSpeed: kipasAnginState.context.speed - 1
      }
    })
  }

  const onClickPlus = () => {
    kipasAnginSend({
      type: "USER_CLICK_ADD_SPEED", data: {
        newSpeed: kipasAnginState.context.speed + 1
      }
    })
  }


  return (
    <Container>
      <Stack alignItems={"center"} py={5} spacing={3}>
        <KipasAngin isOn={isOn} speed={kipasAnginState.context.speed} />
        <Stack id="remote-control" maxW="200">
          <Button onClick={onClickOnOff}>{isOn ? "Off" : "On"}</Button>
        </Stack>
        <HStack>
          <Button onClick={onClickMin}>-</Button>
          <Text>{speed}</Text>
          <Button onClick={onClickPlus}>+</Button>
        </HStack>
      </Stack>
      <pre>{JSON.stringify(kipasAnginState.value, undefined, 2)}</pre>
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

export default KipasAnginXState

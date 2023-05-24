import {
	Center,
	Flex,
	Button,
	Stack,
	VStack,
	FormControl,
	FormLabel,
	InputGroup,
	InputRightElement,
	IconButton,
	Input,
	useColorModeValue,
	Heading,
	Container,
	Text,
	Spacer,
} from "@chakra-ui/react";
import { useState } from "react";
// import { userLogin } from "../redux/middleware/userauth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function ForgotPassword() {
	const [seePassword, setSeePassword] = useState(false);
	const nav = useNavigate();
	const dispatch = useDispatch();

	return (
		<>
			<Center>
				<Flex h={"100vh"} minW={"100vw"} justifyContent={"center"}>
					<Container
						w={{ base: "100%", md: "50%", xl: "35%" }}
						h={"90%"}
						m={3}
						rounded={"lg"}
						p={"30px"}
						bg={useColorModeValue("white", "gray.700")}
						boxShadow={"lg"}
					>
						<Flex
							h={"40%"}
							justifyContent={"space-evenly"}
							alignItems={"center"}
							flexDir={"column"}
						>
							<Flex></Flex>
							<Flex>
								<Heading as={"h2"}>Reset Password</Heading>
							</Flex>
						</Flex>
						<Stack>
							<VStack>
								<FormControl>
									<FormLabel>New Password</FormLabel>
									<Input
										placeholder="New Password"
										type="text"
										// onChange={inputHandler}
										border={"1px #878787 solid"}
										id="email"
									/>
								</FormControl>
								<Spacer />
								<FormControl>
									<FormLabel>Confirm Password</FormLabel>
									<InputGroup>
										<Input
											id="password"
											// onChange={inputHandler}
											type={seePassword ? "text" : "password"}
											border={"1px #878787 solid"}
											placeholder="Confirm Your New Password"
											paddingY={"8px"}
										></Input>
										<InputRightElement width={"3.5rem"} h={"100%"}>
											<IconButton
												colorScheme="whiteAlpha"
												color={"grey"}
												as={seePassword ? AiOutlineEye : AiOutlineEyeInvisible}
												w={"20px"}
												h={"20px"}
												onClick={() => setSeePassword(!seePassword)}
												cursor={"pointer"}
											></IconButton>
										</InputRightElement>
									</InputGroup>
								</FormControl>
							</VStack>
						</Stack>
						<Stack pt={"50"}>
							<VStack>
								<Button
									colorScheme="blue"
									minW={"20vw"}
									textColor={"white"}
									// onClick={login}
								>
									Confirm Password
								</Button>
								<Spacer />
								<Text
									as={"u"}
									fontSize={"md"}
									fontWeight={"md"}
									color="blue"
									cursor={"pointer"}
									onClick={() => nav("/")}
								>
									Cancel changes password ?
								</Text>
							</VStack>
						</Stack>
					</Container>
				</Flex>
			</Center>
		</>
	);
}

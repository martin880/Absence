import {
	Flex,
	Container,
	Input,
	FormControl,
	FormLabel,
	Button,
	IconButton,
	InputGroup,
	Heading,
	InputRightElement,
	Stack,
	VStack,
	Spacer,
	Text,
	useColorModeValue,
	useToast,
} from "@chakra-ui/react";
// import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../redux/middleware/userauth";
import { useDispatch } from "react-redux";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function RLogin() {
	const [seePassword, setSeePassword] = useState(false);
	const dispatch = useDispatch();
	const [loginInput, setLoginInput] = useState({
		email: "",
		password: "",
	});
	const nav = useNavigate();
	function inputHandler(input) {
		const { value, id } = input.target;
		const tempobject = { ...loginInput };
		tempobject[id] = value;
		setLoginInput(tempobject);
		console.log(tempobject);
	}
	const toast = useToast();

	async function login() {
		const password = document.getElementById("password");
		const status = await dispatch(userLogin(loginInput));
		console.log(status);
		if (status) {
			toast({
				title: "You are success login",
				status: "success",
				position: "top-right",
				duration: 3000,
				isClosable: false,
			});
			return nav("/rdashboard");
		} else {
			toast({
				title: "Email or Password is wrong !!!",
				status: "error",
				position: "top-right",
				duration: 3000,
				isClosable: false,
			});
			password.value = "";
		}
	}
	return (
		<>
			<Flex h={"100vh"} minW={"100vw"} justifyContent={"center"}>
				<Container
					w={{ base: "100%", md: "50%", xl: "35%" }}
					h={"90%"}
					m={3}
					rounded={"lg"}
					p={5}
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
							<Heading as={"h2"}>Sign In</Heading>
						</Flex>
						<Flex>
							<Text fontFamily={"sans-serif"} fontSize={"2xl"}>
								to clock-in and clock-out
							</Text>
						</Flex>
					</Flex>
					<Stack>
						<VStack>
							<FormControl>
								<FormLabel>Username / Email</FormLabel>
								<Input
									placeholder="Enter your Email or Username"
									type="email"
									onChange={inputHandler}
									border={"1px #878787 solid"}
									id="email"
								/>
							</FormControl>

							<FormControl>
								<FormLabel>Password</FormLabel>
								<InputGroup>
									<Input
										id="password"
										onChange={inputHandler}
										type={seePassword ? "text" : "password"}
										border={"1px #878787 solid"}
										placeholder="Enter Your Password"
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
								minW={"15vw"}
								textColor={"white"}
								onClick={login}
							>
								Login
							</Button>
							<Spacer display={"flex"} justifyContent={"center"}>
								OR
							</Spacer>
							<Button
								colorScheme="green"
								minW={"15vw"}
								onClick={() => nav("/rregister")}
							>
								Register
							</Button>
							<Spacer />
							<Text
								as={"u"}
								fontSize={"md"}
								fontWeight={"md"}
								color="blue"
								cursor={"pointer"}
								onClick={() => nav("/forgot-password/f8XBxkZeOGxPdycDvwR5q")}
							>
								Forgot Password ?
							</Text>
						</VStack>
					</Stack>
				</Container>
			</Flex>
		</>
	);
}

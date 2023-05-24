import {
	Flex,
	Input,
	FormControl,
	FormLabel,
	Select,
	Button,
	InputRightElement,
	IconButton,
	InputGroup,
	Center,
	Box,
	Text,
	useColorModeValue,
	Container,
	Heading,
	Stack,
	VStack,
	Spacer,
	useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";

export default function RRegister() {
	const [seePassword, setSeePassword] = useState(false);
	const nav = useNavigate();
	const toast = useToast();

	YupPassword(Yup);

	const formik = useFormik({
		initialValues: {
			email: "",
			address: "",
			password: "",
			name: "",
			company: "",
		},
		validationSchema: Yup.object().shape({
			email: Yup.string()
				.required(
					<Flex>
						<Center color={"red"}>
							{" "}
							<Box fontSize={"10px"}>Enter a valid Email</Box>
						</Center>
					</Flex>
				)
				.email(
					<Flex>
						<Center color={"red"}>
							{" "}
							<Box fontSize={"10px"}>This is not a valid email</Box>
						</Center>
					</Flex>
				),
			password: Yup.string()
				.required(
					<Flex>
						<Center color={"red"}>
							{" "}
							<Box fontSize={"10px"}>
								Must Contain 8 Characters, One Uppercase, One Lowercase, One
								Number and one special case Character
							</Box>
						</Center>
					</Flex>
				)
				.matches(
					/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
					"Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
				),

			name: Yup.string().required(
				<Flex>
					<Center color={"red"}>
						<Box fontSize={"10px"}>You need to enter your name</Box>
					</Center>
				</Flex>
			),
			address: Yup.string().required(
				<Flex>
					<Center color={"red"}>
						<Box fontSize={"10px"}>You need to enter your address</Box>
					</Center>
				</Flex>
			),
			company: Yup.string().required(
				<Flex>
					<Center color={"red"}>
						<Box fontSize={"10px"}>Please select a company</Box>
					</Center>
				</Flex>
			),
		}),
		onSubmit: async () => {
			const { email, address, password, name, company } = formik.values;
			const account = {
				email,
				password,
				fullname: name,
				company_id: company,
				address,
			};
			console.log(account);
			const checkemail = await axios
				.get("http://localhost:3500/users/email", {
					params: { Email: account.email },
				})
				.then((res) => {
					if (res.data) {
						return true;
					} else {
						return false;
					}
				});
			if (checkemail) {
				toast({
					title: "Email has been used",
					status: "error",
					position: "top-right",
					duration: 3000,
					isClosable: true,
				});
			} else {
				await axios.post("http://localhost:3500/users", account).then(() => {
					toast({
						title: "Account created succesfully",
						status: "success",
						position: "top-right",
						duration: 3000,
						isClosable: true,
					});
					nav("/");
				});
			}
		},
	});
	function inputHandler(event) {
		const { value, id } = event.target;
		console.log(value);
		formik.setFieldValue(id, value);
	}
	return (
		<>
			<Flex minW={"100vw"} justifyContent={"center"}>
				<Container
					w={"100%"}
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
							<Heading as={"h2"}>Sign Up</Heading>
						</Flex>
						<Flex>
							<Text fontFamily={"sans-serif"} fontSize={"2xl"}>
								to clock-in and clock-out
							</Text>
						</Flex>
					</Flex>
					<Stack>
						<VStack>
							<Flex
								minH={"40vh"}
								minW={"20vw"}
								flexDir={"column"}
								justifyContent={"center"}
								m={"8"}
							>
								<FormControl>
									<FormLabel>Name</FormLabel>
									<Input
										type="text"
										id="name"
										onChange={inputHandler}
										placeholder="Enter your username"
									/>
									{formik.errors.name}
								</FormControl>

								<FormControl>
									<FormLabel>Email</FormLabel>
									<Input
										type="text"
										id="email"
										onChange={inputHandler}
										placeholder="Enter your email"
									/>
									{formik.errors.email}
								</FormControl>

								<FormControl>
									<FormLabel>Address</FormLabel>
									<Input
										type="text"
										id="address"
										onChange={inputHandler}
										placeholder="Enter your address"
									/>
									{formik.errors.address}
								</FormControl>

								<FormControl>
									<FormLabel>Password</FormLabel>
									<InputGroup>
										<Input
											id="password"
											onChange={inputHandler}
											type={seePassword ? "text" : "password"}
											border={"1px #878787 solid"}
											placeholder="Create your password"
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
									<Flex>
										<Center color={"red"}>
											{" "}
											<Box fontSize={"13px"}>{formik.errors.password}</Box>
										</Center>
									</Flex>
								</FormControl>

								<FormControl pb={"20px"}>
									<FormLabel>Company</FormLabel>
									<Select id="company" onChange={inputHandler}>
										<option value={0} style={{ display: "none" }} color="grey">
											Select company
										</option>
										<option value={"1"}>Purwadhika</option>
										<option value={"2"}>Hacktiv8</option>
										<option value={"3"}>Dicoding</option>
										<option value={"4"}>Binar Academy</option>
									</Select>
									{formik.errors.company}
								</FormControl>
								<Stack>
									<VStack>
										<Button
											minH={"30px"}
											minW={"20vw"}
											colorScheme={"green"}
											onClick={formik.handleSubmit}
										>
											Register
										</Button>
										<Spacer display={"flex"} justifyContent={"center"}>
											OR
										</Spacer>
										<Button
											minH={"30px"}
											minW={"20vw"}
											colorScheme="blue"
											onClick={() => nav("/")}
										>
											Login
										</Button>
									</VStack>
								</Stack>
							</Flex>
						</VStack>
					</Stack>
				</Container>
			</Flex>
		</>
	);
}

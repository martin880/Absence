import {
	Flex,
	Icon,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableCaption,
	TableContainer,
	Input,
	Text,
	Container,
	useColorModeValue,
	useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { TbHistory } from "react-icons/tb";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth_types } from "../redux/types";

export default function RHistory() {
	const nav = useNavigate();
	const dispatch = useDispatch();
	const userSelector = useSelector((state) => state.auth);
	const [history, setHistory] = useState([]);
	async function fetchHistory(page) {
		await axios
			.get("http://localhost:3500/main/" + userSelector.id)
			.then((res) => {
				console.log(res.data);
				setHistory(res.data);
			});
	}
	useEffect(() => {
		fetchHistory();
		console.log("lol");
	}, []);

	const toast = useToast();
	return (
		<>
			<Flex justifyContent={"center"} minW={"100vw"}>
				<Container
					w={{ base: "100%", md: "50%", xl: "35%" }}
					h={"90%"}
					m={3}
					rounded={"lg"}
					p={"30px"}
					bg={useColorModeValue("white", "gray.700")}
					boxShadow={"lg"}
					flexDir={"column"}
				>
					<Flex h={"10%"} flexDir={"column"} justifyContent={"center"} m={4}>
						<Flex m={2}>
							<Text fontFamily={"serif"} fontWeight={"medium"}>
								Select month:
							</Text>
						</Flex>
						<Input
							display={"flex"}
							w={"100%"}
							justifyContent={"center"}
							placeholder="Select Month"
							type="month"
							colorScheme="teal"
							cursor={"pointer"}
						/>
					</Flex>
					<Flex className="midd">
						<TableContainer>
							<Table variant="simple" colorScheme="black">
								<TableCaption>records are rendered on server time</TableCaption>
								<Thead>
									<Tr>
										<Th>Date</Th>
										<Th isNumeric>CLOCK-IN</Th>
										<Th isNumeric>CLOCK-OUT</Th>
									</Tr>
								</Thead>
								<Tbody>
									{history?.map((val) => {
										return (
											<>
												<Tr>
													<Td>{moment(val.createdAt).format("L")}</Td>
													<Td>{val.clockIn}</Td>
													<Td>{val.clockOut ? val.clockOut : "Not Yet"}</Td>
												</Tr>
											</>
										);
									})}
								</Tbody>
							</Table>
						</TableContainer>
					</Flex>
					<Flex className="bot" mt={"4"}>
						<Flex
							w={"100%"}
							h={"80%"}
							bgColor={"royalblue"}
							borderRadius={"md"}
							m={4}
							p={3}
						>
							<Flex className="nav-child">
								<Icon
									as={RxDashboard}
									onClick={() => nav("/rdashboard")}
									w={10}
									h={10}
									color="white"
									cursor={"pointer"}
								/>
							</Flex>
							<Flex className="nav-child">
								<Icon
									as={TbHistory}
									w={10}
									h={10}
									color="white"
									cursor={"pointer"}
								/>
							</Flex>
							<Flex className="nav-child">
								<Icon
									as={FiLogOut}
									onClick={() => {
										nav("/");
										toast({
											title: "Success Logout",
											status: "info",
											position: "top-right",
											duration: 3000,
											isClosable: false,
										});
										dispatch({ type: auth_types.logout });
										localStorage.clear("user");
									}}
									w={10}
									h={10}
									color="white"
									cursor={"pointer"}
								/>
							</Flex>
						</Flex>
					</Flex>
				</Container>
			</Flex>
		</>
	);
}

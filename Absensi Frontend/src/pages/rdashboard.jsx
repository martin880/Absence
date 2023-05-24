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
	Stat,
	StatLabel,
	StatNumber,
	StatHelpText,
	Button,
	Container,
	useColorModeValue,
	Spacer,
	useToast,
	Text,
	Avatar,
} from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { TbHistory } from "react-icons/tb";
import { AiOutlineUserAdd, AiOutlineUserDelete } from "react-icons/ai";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth_types } from "../redux/types";

export default function RDashboard() {
	const dispatch = useDispatch();
	const nav = useNavigate();
	const moment = require("moment");
	<script src="moment.js"></script>;
	const date = new Date();
	const day = [
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
		"Sunday",
	];
	const month = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const [clockedIn, setClockedIn] = useState(false);
	const [currentTime, setCurrentTime] = useState(date);
	const [clock, setClock] = useState("");
	const userSelector = useSelector((state) => state.auth);
	const storage = JSON.parse(localStorage.getItem("user"));
	const [history, setHistory] = useState([]);
	async function fetchHistory(page) {
		console.log(storage);
		await axios.get("http://localhost:3500/main/" + storage.id).then((res) => {
			console.log(res.data);
			setHistory(res.data);
		});
	}
	function getCurrentTime() {
		const promise = new Promise((resolve) => {
			setTimeout(() => {
				resolve(setCurrentTime(new Date()));
			}, 1000);
		});
	}
	useEffect(() => {
		getCurrentTime();
	}, [currentTime]);
	useEffect(() => {
		fetchHistory();
	}, []);

	const toast = useToast();

	async function clockIn() {
		await axios.get("http://localhost:3500/main/").then((res) => {
			console.log(res.data[res.data.length - 1].clockOut);
			if (res.data[res.data.length - 1].clockOut) {
				setClockedIn(true);
				axios.post("http://localhost:3500/main/" + storage.id).then((res) => {
					toast({
						title: "Clock In Success",
						status: "success",
						position: "top",
						duration: 3000,
						isClosable: false,
					});
				});
				axios.get("http://localhost:3500/main/").then((res) => {
					setClock(res.data[res.data.length - 1].id);
					console.log(res.data[res.data.length - 1].id);
				});
			} else {
				toast({
					title: "Already clocked in, please clock out first",
					status: "warning",
					position: "top",
					duration: 3000,
					isClosable: false,
				});
			}
		});
	}

	async function clockOut() {
		await axios.get("http://localhost:3500/main/").then((res) => {
			if (!res.data[res.data.length - 1].clockOut) {
				setClockedIn(false);
				console.log(res.data[res.data.length - 1].id);
				axios
					.patch(
						"http://localhost:3500/main/" + res.data[res.data.length - 1].id
					)
					.then((res) => {
						toast({
							title: "Clock Out Success",
							status: "success",
							position: "top",
							duration: 3000,
							isClosable: false,
						});
					});
			} else {
				toast({
					title: "Please Clock in first",
					status: "warning",
					position: "top",
					duration: 3000,
					isClosable: false,
				});
			}
		});
	}
	return (
		<>
			<Flex minW={"100vw"} justifyContent={"center"}>
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
					<Flex h={"60%"} flexDir={"column"}>
						<Flex flexDir={"column"} alignItems={"center"} color={"gray.500"}>
							<Flex p={4}>
								Welcome, <Text fontWeight={"bold"}> {userSelector.name}</Text>
							</Flex>
							<Spacer />
							<Avatar src={userSelector.avatar_url} />
							<Spacer />
							<Flex fontSize={"55px"} fontWeight={"bold"} color={"black"}>
								{currentTime.getHours().toString() > 9
									? currentTime.getHours().toString()
									: "0" + currentTime.getHours().toString()}
								:
								{currentTime.getMinutes().toString() > 9
									? currentTime.getMinutes().toString()
									: "0" + currentTime.getMinutes().toString()}
							</Flex>
							<Flex>
								{day[currentTime.getDay().toString()]},&nbsp;
								{currentTime.getDate().toString()}&nbsp;
								{month[currentTime.getMonth().toString()]}{" "}
								{currentTime.getFullYear().toString()}
							</Flex>
						</Flex>
						<Flex justifyContent={"center"} alignItems={"center"}>
							<Flex className="detail">
								<Flex
									minH={"100px"}
									w={"100%"}
									flexDir={"column"}
									alignItems={"center"}
								>
									<Stat w={"100%"}>
										<StatLabel textAlign={"center"}>Working Hour</StatLabel>
										<StatNumber textAlign={"center"}>09:00 - 17:00</StatNumber>
										<StatHelpText textAlign={"center"}>
											Western Indonesian Time
										</StatHelpText>
									</Stat>
								</Flex>
								<Flex
									h={"60%"}
									w={"100%"}
									alignItems={"center"}
									justifyContent={"center"}
								>
									<Flex
										w={"50%"}
										h={"100%"}
										justifyContent={"center"}
										alignItems={"center"}
									>
										<Button
											className="opsi"
											bg={"green.100"}
											borderColor={"green.200"}
											color={"green.500"}
											h={"70px"}
											borderRadius={"20px"}
											onClick={clockIn}
										>
											{" "}
											<Icon as={AiOutlineUserAdd} w={10} h={10} />
											<Flex>Clock-In</Flex>
										</Button>
									</Flex>
									<Flex
										w={"50%"}
										h={"100%"}
										justifyContent={"center"}
										alignItems={"center"}
									>
										<Button
											className="opsi"
											bg={"orange.100"}
											borderColor={"orange.200"}
											color={"orange.500"}
											h={"70px"}
											borderRadius={"20px"}
											onClick={clockOut}
										>
											{" "}
											<Icon as={AiOutlineUserDelete} w={10} h={10} />
											<Flex>Clock-Out</Flex>
										</Button>
									</Flex>
								</Flex>
							</Flex>
						</Flex>
					</Flex>
					<Flex className="tengah" m={"4"}>
						Attendance Log:
						<TableContainer>
							<Table variant="simple" colorScheme="blackAlpha">
								<TableCaption>records are rendered on server time</TableCaption>
								<Thead>
									<Tr justifyContent={"center"}>
										<Th>Date</Th>
										<Th>TIME LOG</Th>
										<Th>ACTIVITY</Th>
									</Tr>
								</Thead>
								<Tbody>
									<Tr>
										<Td>
											{moment(history[history.length - 1]?.createdAt).format(
												"L"
											)}
										</Td>
										<Td>{history[history.length - 1]?.clockIn}</Td>
										<Td>
											{history[history.length - 1]?.clockOut
												? history[history.length - 1]?.clockOut
												: "Not Yet"}
										</Td>
									</Tr>
								</Tbody>
							</Table>
						</TableContainer>
					</Flex>
					<Flex h={"10%"}>
						<Flex
							w={"100%"}
							h={"80%"}
							bgColor={"royalblue"}
							borderRadius={"md"}
							p={3}
						>
							<Flex className="nav-child">
								<Icon
									as={RxDashboard}
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
									onClick={() => nav("/rhistory")}
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

import { Fragment, useContext, useState } from 'react';
import {
	Link,
	Outlet,
	useLocation,
	useNavigate,
	useParams,
} from 'react-router-dom';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import logo from '../../assets/logo.png';
import AuthContext from '../../utils/auth-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const navigation = [
	{
		name: 'Doctor',
		href: '/doctor/register',
		icon: 'fa-solid fa-stethoscope',
		current: false,
	},
	{
		name: 'Patient',
		href: '/patient/register',
		icon: 'fa-solid fa-user',
		current: false,
	},
];

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function Navbar(props) {
	const navigate = useNavigate();
	const ctx = useContext(AuthContext);
	const { userID } = useParams();
	const routeLocation = useLocation();
	const [current, setCurrent] = useState({ Doctor: false, Patient: false });
	const loginStatus = localStorage.getItem('isLoggedIn');

	const changeCurrentHandler = (item) => {
		setCurrent((prevData) => {
			const newData = prevData;
			for (const key in newData) {
				if (key === item) {
					newData[key] = true;
				} else {
					newData[key] = false;
				}
			}
			return newData;
		});
	};

	const toHomePage = () => {
		// setCurrent((prevData) => {
		// 	const newData = prevData;
		// 	for (const key in newData) {
		// 		if (Object.hasOwnProperty.call(newData, key)) {
		// 			newData[key] = false;
		// 		}
		// 	}
		// 	return newData;
		// });
		navigate(`/`);
	};

	const backBtnHandler = () => {
		
		navigate(-1);
		// setCurrent((prevData) => {
		// 	const newData = prevData;
		// 	for (const key in newData) newData[key] = false;
		// 	return newData;
		// })
		if (loginStatus === '2') {
			localStorage.removeItem('userID');
			localStorage.removeItem('accID');
		}
	};

	let styleClass = 'bg-gray-800 top-0 left-0 right-0';
	if (userID && routeLocation.pathname === `/patient/${userID}`) {
		styleClass = 'w-full z-10 bg-gray-950 backdrop-filter backdrop-blur-sm';
	}

	const logoutBtnhandler = () => {
		props.onLogout();
		navigate(`/`);
	};

	const LoginConfigure = ({ isLogin }) => {
		if (isLogin !== '') {
			return (
				<Menu as="div" className="relative ml-3">
					<div>
						<Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
							<span className="absolute -inset-1.5" />
							<span className="sr-only">Open user menu</span>
							<img
								className="h-8 w-8 rounded-full"
								src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
								alt=""
							/>
						</Menu.Button>
					</div>
					<Transition
						as={Fragment}
						enter="transition ease-out duration-100"
						enterFrom="transform opacity-0 scale-95"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95"
					>
						<Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
							<Menu.Item>
								{({ active }) => (
									<button
										onClick={logoutBtnhandler}
										// href="?"
										className={classNames(
											active ? 'bg-gray-100' : '',
											'block w-full px-4 py-2 text-sm text-gray-700 text-left',
										)}
									>
										Sign out
									</button>
								)}
							</Menu.Item>
						</Menu.Items>
					</Transition>
				</Menu>
			);
		}
		return (
			<button
				type="button"
				className="text-white bg-gray-700 hover:bg-gray-950 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
			>
				Guest Login
			</button>
		);
	};

	return (
		<Fragment>
			<Disclosure as="nav" className={styleClass}>
				{({ open }) => (
					<>
						<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
							{/* div 1 */}
							<div className="relative flex h-16 items-center justify-between">
								{/* div 2 */}
								<div className="inset-y-0 left-0 flex items-center sm:hidden">
									{/* Mobile menu button*/}
									<Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
										<span className="absolute -inset-0.5" />
										<span className="sr-only">Open main menu</span>
										{open ? (
											<XMarkIcon className="block h-6 w-6" aria-hidden="true" />
										) : (
											<Bars3Icon className="block h-6 w-6" aria-hidden="true" />
										)}
									</Disclosure.Button>
								</div>

								<div className="flex items-center justify-start">
									<span
										className="mr-8 bg-gray-100 text-gray-900 rounded-full w-10 h-10 flex justify-center items-center hover:bg-gray-800 hover:text-white cursor-pointer transition duration-150"
										onClick={backBtnHandler}
									>
										<FontAwesomeIcon icon="fa-solid fa-arrow-left" />
									</span>
									{loginStatus !== '1' && loginStatus !== '2' && (
										<Fragment>
											<span className="pr-4 font-medium">Register</span>
											<div className="flex bg-gray-700 rounded-md">
												{navigation.map((item) => (
													<Link
														key={item.name}
														to={item.href}
														onClick={() => changeCurrentHandler(item.name)}
														className={classNames(
															current[item.name]
																? 'bg-gray-900 text-white'
																: 'text-gray-300 hover:bg-gray-900 hover:text-white',
															'rounded-md px-3 py-2 text-sm font-medium flex justify-between',
														)}
														aria-current={
															current[item.name] ? 'page' : undefined
														}
													>
														<FontAwesomeIcon
															icon={item.icon}
															size="xl"
															style={{ color: '#ffffff' }}
														/>
														<span className="px-1">{item.name}</span>
													</Link>
												))}
											</div>
										</Fragment>
									)}
								</div>

								<div className="flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
									<LoginConfigure isLogin={ctx.isLoggedIn} />
								</div>
								<div
									className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-shrink-0 items-center cursor-pointer"
									onClick={toHomePage}
								>
									<span className="self-center text-3xl px-2 font-semibold whitespace-nowrap text-white">
										Doc
									</span>
									<img className="h-16 w-auto" src={logo} alt="DocMap Logo" />
									<span className="self-center text-3xl px-2 font-semibold whitespace-nowrap text-white">
										Map
									</span>
								</div>
							</div>
						</div>

						<Disclosure.Panel className="sm:hidden">
							<div className="space-y-1 px-2 pb-3 pt-2">
								{navigation.map((item) => (
									<Disclosure.Button
										key={item.name}
										as="a"
										href={item.href}
										className={classNames(
											item.current
												? 'bg-gray-900 text-white'
												: 'text-gray-300 hover:bg-gray-700 hover:text-white',
											'block rounded-md px-3 py-2 text-base font-medium',
										)}
										aria-current={item.current ? 'page' : undefined}
									>
										{item.name}
									</Disclosure.Button>
								))}
							</div>
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>
			<main className="flex-grow">
				<Outlet />
			</main>
		</Fragment>
	);
}

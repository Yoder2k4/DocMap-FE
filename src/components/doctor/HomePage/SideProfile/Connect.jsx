import React, { useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin';
import { faSquareXTwitter } from '@fortawesome/free-brands-svg-icons/faSquareXTwitter';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'flowbite-react';
import DocDetailContext from '../../../../utils/DocDetailContext';

const Connect = () => {
	const { doctor } = useContext(DocDetailContext);
	return (
		<div className="bg-gray-800 w-full h-1/4 mb-10 rounded-xl">
			<div className="w-full h-1/2 text-3xl flex items-center justify-center">
				Connect
			</div>
			<div className="w-full h-[70px] flex items-center justify-evenly">
				<Tooltip
					content={doctor.social && doctor.social.contact}
					animation="duration-300"
				>
					<button
						onClick={() => {
							navigator.clipboard.writeText(
								doctor.social && doctor.social.contact,
							);
						}}
					>
						<FontAwesomeIcon icon={faPhone} />
					</button>
				</Tooltip>
				<Tooltip
					content={doctor.social && doctor.social.contactMail}
					animation="duration-300"
				>
					<button
						onClick={() => {
							navigator.clipboard.writeText(
								doctor.social && doctor.social.contactMail,
							);
						}}
					>
						<FontAwesomeIcon icon={faEnvelope} size="xl" />
					</button>
				</Tooltip>
				<Tooltip
					content={doctor.social && doctor.social.facebook}
					animation="duration-300"
				>
					<button>
						<FontAwesomeIcon icon={faFacebook} size="xl" />
					</button>
				</Tooltip>
				<Tooltip
					content={doctor.social && doctor.social.linkedin}
					animation="duration-300"
				>
					<button>
						<FontAwesomeIcon icon={faLinkedin} size="xl" />
					</button>
				</Tooltip>
				<Tooltip
					content={doctor.social && doctor.social.twitter}
					animation="duration-300"
				>
					<button>
						<FontAwesomeIcon icon={faSquareXTwitter} size="xl" />
					</button>
				</Tooltip>
			</div>
		</div>
	);
};

export default Connect;

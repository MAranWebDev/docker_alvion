import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
	href: string;
	name: string;
};

const ActiveLink = ({ href, name }: Props) => {
	const router = useRouter();

	return (
		<Link href={href}>
			<a className={`nav-link ${router.pathname == href && "active"}`}>
				{name}
			</a>
		</Link>
	);
};

export default ActiveLink;

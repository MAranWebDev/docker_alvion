import type { FC } from "react";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

type Props = {
	title?: string;
	description?: string;
	plain?: boolean;
};

const Layout: FC<Props> = ({ children, title, description, plain }) => (
	<>
		<Head>
			<title>{title}</title>
			<meta name="description" content={description} />
		</Head>
		<div className="min-vh-100 d-flex flex-column">
			{/* Optional header */}
			{!plain && <Header />}

			{/* Content */}
			<main className="container my-5">{children}</main>

			{/* Optional footer */}
			{!plain && <Footer />}
		</div>
	</>
);

Layout.defaultProps = {
	title: "Alvion",
	description: "An EssilorLuxottica website",
	plain: false,
};

export default Layout;

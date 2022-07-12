import NavLinks from "./NavLinks";

const Footer = () => (
	<footer className="mt-auto bg-dark text-light">
		<div className="container d-flex flex-column align-items-center">
			<nav className="navbar navbar-expand-lg navbar-dark">
				<div className="navbar-nav">
					<NavLinks />
				</div>
			</nav>
			<p>&copy; EssilorLuxottica 2022</p>
		</div>
	</footer>
);

export default Footer;

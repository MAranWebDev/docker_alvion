import NavLinks from "./NavLinks";

const Header = () => (
	<header>
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<div className="container">
				<span className="navbar-brand">Alvion</span>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNavAltMarkup"
					aria-controls="navbarNavAltMarkup"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
					<div className="navbar-nav ms-auto">
						<NavLinks />
					</div>
				</div>
			</div>
		</nav>
	</header>
);

export default Header;

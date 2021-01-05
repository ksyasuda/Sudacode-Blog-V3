import React from "react"
import classes from "./SideDrawer.module.css"
import SideNav from "../SideNav/SideNav"
import Backdrop from "../UI/Backdrop/Backdrop"

const sideDrawer = props => {
	return props.show ? (
		<div className={classes.SideDrawer}>
			<nav>
				<SideNav show={props.show} />
				<Backdrop clicked={props.clicked} />
			</nav>
		</div>
	) : null
}

export default sideDrawer

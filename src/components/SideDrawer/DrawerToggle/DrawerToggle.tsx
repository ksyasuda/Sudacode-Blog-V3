import React from "react"
import classes from "./DrawerToggle.module.css"
import Button from "@material-ui/core/Button"

const drawerToggle = props => {
	return (
		<Button
			id='toggle'
			variant={"contained"}
			onClick={props.clicked}
			color={"primary"}
			className={classes.Button}
			style={{ position: "relative", left: "21vw" }}
		>
			Menu
		</Button>
	)
}

export default drawerToggle

import { container, title } from "assets/jss/material-kit-react.js";
import headerLinksStyle from "assets/jss/material-kit-react/components/headerLinksStyle.js";
import modalStyle from "assets/jss/material-kit-react/modalStyle.js";
const navbarsStyle = theme => ({
  section: {
    padding: "70px 0",
    paddingTop: "0"
  },
  container,
  title: {
    ...title,
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none"
  },
  navbar: {
    marginBottom: "-20px",
    zIndex: "100",
    position: "relative",
    overflow: "hidden",
    "& header": {
      borderRadius: "0"
    }
  },
  navigation: {
    backgroundPosition: "center center",
    backgroundSize: "cover",
    marginTop: "0",
    minHeight: "740px"
  },
  formControl: {
    margin: "0 !important",
    paddingTop: "0"
  },
  inputRootCustomClasses: {
    margin: "0!important"
  },
  searchIcon: {
    width: "20px",
    height: "20px",
    color: "inherit"
  },
  ...headerLinksStyle(theme),
  img: {
    width: "40px",
    height: "40px",
    borderRadius: "50%"
  },
  imageDropdownButton: {
    padding: "0px",
    top: "4px",
    borderRadius: "50%",
    marginLeft: "5px"
  },
  space50: {
    height: "50px",
    display: "block"
  },
  space70: {
    height: "70px",
    display: "block"
  },
  space100: {
    height: "100px",
    display: "block"
  },
  space200: {
    height: "200px",
    display: "block"
  },
  space300: {
    height: "300px",
    display: "block"
  },
  space400: {
    height: "400px",
    display: "block"
  },
  ...modalStyle
});

export default navbarsStyle;

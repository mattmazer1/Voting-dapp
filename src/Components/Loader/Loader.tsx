import { useContext } from "react";
import { LoaderContext } from "../../App";

export default function Loader() {
	const { showLoader } = useContext(LoaderContext);

	return (
		<div className="loader">
			<span className="setLoader" id={showLoader ? "on" : "off"}></span>
		</div>
	);
}

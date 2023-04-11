
import { useContext } from "react";
import { FcGoogle } from "react-icons/fc"
import { AiOutlineGoogle } from "react-icons/ai"
import { auth } from "../firebase";
import {
    GoogleAuthProvider,
    signInWithRedirect

} from "firebase/auth";
import { appStore } from "../context/appContext";
import LoadingSpinner from "./LoadingSpinner";

const Login = () => {

    const updateIsLoading = appStore(state => state.updateIsLoading)
    const isLoading = appStore(state => state.isLoading)
    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        // console.log(provider)
        updateIsLoading(true)
        signInWithRedirect(auth, provider)
            .then(data => {
                console.log("data", data);

                updateIsLoading(false)
            })
            .catch(error => {

                console.log("error", error);
                updateIsLoading(false)
            });
    };
    return (
        <div>
            {isLoading && <LoadingSpinner />}
            <div className="bg-img"></div>
            <div className="login-box">
                {/* <h2>Login</h2> */}
                <h1 className="text-white dark:text-gray-300 md:text-lg">Welcome back</h1>


                {/* <button type="submit">Submit</button> */}
                <button className="m-5 p-2 rounded-xl bg-[#c9453a] text-white font-bold hover:bg-red-800"
                    onClick={googleSignIn}
                >
                    <AiOutlineGoogle className="inline text-xl m-2" /> Sign in with Google
                </button>
            </div>




        </div>

    )

}

export default Login
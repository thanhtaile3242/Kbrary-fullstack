import SignUp from "./components/SignUp/SignUp.js";
import SignIn from "./components/SignIn/SignIn.js";
import ManageBook from "./pages/ManageBook.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
function App() {
    return (
        <div className="App">
            {/* <SignUp /> */}
            <ManageBook />

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}

export default App;

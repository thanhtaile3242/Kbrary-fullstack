import Header from "../components/Header/Header.js";
import Filter from "../components/Filter/Filter.js";
import DisplayBooks from "../components/Display/DisplayBooks.js";
import "./ManageBook.scss";
const ManageBook = () => {
    return (
        <>
            <div className="manage-container">
                <Header />
                <Filter />
                <div className="manage-main">
                    <DisplayBooks />
                </div>
            </div>
        </>
    );
};
export default ManageBook;

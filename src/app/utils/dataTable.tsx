import ImageWithFallback from './FallbackImage';
import fallBackImage from '../../_metronic/assets/images/fallBackImage.png'
import deleteBtn from '../../_metronic/assets/images/deleteBtn.png'
import '../components/dataTable/SharedTable.css'

const userTable = [

    {
        label: 'name',
        selector: row => row.name || "N/A",
        name: "Customer name",
    },
    {
        label: 'phone',
        selector: row => row.phone || "N/A",
        name: "Phone No.",
    }, {
        label: 'email',
        selector: row => row.email || "N/A",
        name: "Email",

    },
    {
        label: 'profilePicture',
        selector: row => (
            <ImageWithFallback
                src={row.profilePicture}
                alt="Profile Picture"
                fallBackSrc={fallBackImage}
                styleClass="image-thumbnail"
            />
        ),
        name: "Photo",
    },
    // {
    //     label: 'appointment',
    //     name: "No. of Appointments"

    // },
    {
        name: "Action",
        cell: (row: any) => (
            <img
                src={deleteBtn}
                className="cursor-pointer deleteBtn"
                alt="deleteIcon"
                // onClick={() => deleteOpenModal(row._id)}  // Assuming you want to pass `row._id` for deletion
            />
        ),
    },

];



export default userTable
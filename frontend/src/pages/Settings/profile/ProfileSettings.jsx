import axios from "axios"
import ProfileExperience from "./components/ProfileExperience"
import ProfileGeneral from "./components/ProfileGeneral"
import ProfileImage from "./components/ProfileImage.jsx"
import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import ProfileSocial from "./components/ProfileSocial.jsx"
import UpdateModal from "./components/UpdateModal.jsx"
import SocialProfileModal from "./components/SocialProfileModal.jsx"
import ConfirmRemoveModal from "./components/ConfirmRemoveModal.jsx"

const ProfileSettings = () => {

    // profileData state that is used on profile-edit page display
    const [profileData, setProfileData] = useState(null)

    // individul input state for each modal
    const [name, setName] = useState("")
    const [bio, setBio] = useState("")
    const [gender, setGender] = useState("")
    const [location, setLocation] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [instituteName, setInstituteName] = useState("")
    const [skillSet, setSkillSet] = useState([]); // array of skills
    const [skillInput, setSkillInput] = useState("");
    const [workplace, setWorkPlace] = useState("")
    const [role, setRole] = useState("")
    const [links, setLinks] = useState([]) // array of links object {platform,url} 

    // states for formData to pass as props
    const formData =
    {
        name, setName,
        bio, setBio,
        gender,
        setGender,
        location,
        setLocation,
        username,
        setUsername,
        email,
        setEmail,
        instituteName,
        setInstituteName,
        skillSet,
        setSkillSet,
        skillInput,
        setSkillInput,
        workplace,
        setWorkPlace,
        role,
        setRole,
        links,
        setLinks
    };

    // fetches profile from backend
    const getProfileDetails = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/profile`,
                { withCredentials: true }
            )

            setProfileData(res.data);

        }
        catch (err) {
            console.log(err.response?.data || err.message);
        }
    }

    // states to open edit-modal with mode, if needed
    const [modal, setModal] = useState(false);
    const [mode, setMode] = useState("");

    // states for social profile modal handling
    const [socialModal, setSocialModal] = useState(false)

    // states for delete modal handling
    const [deleteModal, setDeleteModal] = useState(false)
    const [linkToDelete, setLinkToDelete] = useState({});

    // fetches profile data whenever modal is closed or opened or if mode changes
    useEffect(() => {
        getProfileDetails();
    }, [modal, mode, socialModal, deleteModal])

    // set individual state's values with the fetched profile data
    useEffect(() => {
        if (profileData) {
            setName(profileData?.name || "");
            setBio(profileData?.bio || "");
            setGender(profileData?.gender || "");
            setLocation(profileData?.location || "");
            setUsername(profileData?.username || "");
            setEmail(profileData?.email || "");
            setInstituteName(profileData?.others?.instituteName);
            setSkillSet(profileData?.others?.skills || []);
            setWorkPlace(profileData?.others?.workplace);
            setRole(profileData?.others?.role);
            setLinks(profileData?.links || []);
        }
    }, [profileData]);

    // holds title and description to show for each modal form
    const modalConfig = {
        name: {
            title: "Name",
            description: "Changing your display name won't change your username."
        },
        bio: {
            title: "Bio",
            description: "Tell something about you, that you think suits you."
        },
        gender: {
            title: "Gender",
            description: "Identify your gender."
        },
        location: {
            title: "Location",
            description: "Enter your City/Country name."
        },
        username: {
            title: "Username",
            description: "Update your unique username."
        },
        email: {
            title: "Email",
            description: "Update your email for identification."
        },
        instituteName: {
            title: "Institute Name",
            description: "Tell where did you study?"
        },
        skills: {
            title: "Skills",
            description: "Enter the skills you are better at. Press enter key to add more."
        },
        workplace: {
            title: "Workplace",
            description: "Tell where do you work?"
        },
        role: {
            title: "Role",
            description: "Tell what is your role at workplace?"
        }

    }


    return (
        <>
            {/* update each field seperately */}
            <UpdateModal
                mode={mode}
                modal={modal}
                setModal={setModal}
                profileData={profileData}
                modalConfig={modalConfig}
                formData={formData} />

            {/* add more social profiles */}
            <SocialProfileModal
                socialModal={socialModal}
                setSocialModal={setSocialModal}
                links={links}
                setLinks={setLinks} />

            <ConfirmRemoveModal
                deleteModal={deleteModal}
                setDeleteModal={setDeleteModal}
                mode={mode}
                linkToDelete={linkToDelete}
                links={links} />

            {/* navigate back to profile page */}
            <div className="flex items-center font-poppins">
                <NavLink className="flex items-center gap-1.5" to="/profile">
                    <i className="ri-arrow-left-long-line text-lg"></i>
                    <span>Go back</span>
                </NavLink>
            </div>

            {/* top part of edit profile page */}
            <ProfileImage
                profileData={profileData} />

            {/* general details in edit page */}
            <ProfileGeneral
                setModal={setModal}
                setMode={setMode}
                profileData={profileData} />

            {/* experience section in edit page */}
            <ProfileExperience
                setModal={setModal}
                setMode={setMode}
                profileData={profileData} />

            {/* social platforms section in edit page */}
            <ProfileSocial
                setModal={setModal}
                setMode={setMode}
                setDeleteModal={setDeleteModal}
                setLinkToDelete={setLinkToDelete}
                profileData={profileData}
                setSocialModal={setSocialModal}
                setLinks={setLinks}
                links={links}
                getProfileDetails={getProfileDetails} />

        </>
    )
}

export default ProfileSettings

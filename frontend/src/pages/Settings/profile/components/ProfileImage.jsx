const ProfileImage = ({ profileData }) => {
  return (
    <div className="w-full flex justify-center h-auto p-7 relative">
      <div className="relative w-40 h-40 rounded-full cursor-pointer group">

        <img
          src={profileData?.avatarURL}
          alt="profileImg"
          className="cursor-pointer w-full h-full rounded-full object-cover"
        />

        {/* overlay and upload */}
        <div className="absolute inset-0 w-full h-full rounded-full bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
          <label className="cursor-pointer text-white text-sm font-medium flex items-center gap-1 px-3 py-1 border border-white/20 rounded-md">
            <i className="ri-edit-box-fill"></i>Upload
            <input
              type="file"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  // handle file upload here; left to do on backend
                  console.log("Selected file:", file);
                }
              }}
            />
          </label>
        </div>

      </div>
    </div>
  );
};

export default ProfileImage;

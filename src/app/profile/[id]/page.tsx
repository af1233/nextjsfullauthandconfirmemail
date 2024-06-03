 
const UserProfilePage = ({params}:any) => {
    return (
      <div className="flex items-center justify-center gap-2 h-dvh bg-black text-white">
        <span> User Profile Page</span>
        <span className="text-black bg-orange-600 px-4 py-1 rounded-md"> {params.id}</span>
      </div>
    )
  }
  
  export default UserProfilePage;
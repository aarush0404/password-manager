import React, { useState,useRef,useEffect } from 'react'
import { ToastContainer, toast,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const Manages = () => {
  const [editId, setEditId] = useState(null);
  const [clicked, setClicked] = useState(false)
const ref = useRef()
const [passwordsArray, setpasswordsArray] = useState([])
const CopyText=(text)=>{
  toast('🦄 copied to clipboard!', {
position: "top-right",
autoClose: 500,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
transition: Bounce,
});

  navigator.clipboard.writeText(text)
}
useEffect(() => {
  const fetchPasswords = async () => {
    const res = await fetch("http://localhost:5000/passwords", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    });

    const data = await res.json();
    setpasswordsArray(data);
  };

  fetchPasswords();
}, []);

  const [form, setForm] = useState({
    site: "",
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const [show, setshow] = useState(false);
const showpassword=()=>{
 setshow(!show);
}
const savepassword = async () => {
  if (!form.site || !form.username || !form.password) {
    alert("Fill all fields bro");
    return;
  }

  try {
    // 🔥 UPDATE MODE
    if (editId) {
      const res = await fetch(`http://localhost:5000/passwords/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        setpasswordsArray(prev =>
          prev.map(item => item._id === editId ? data : item)
        );

        setEditId(null);

        toast('🦄 Password updated successfully!', {
          position: "top-right",
          autoClose: 2000,
          theme: "dark",
          transition: Bounce,
        });
      }

    } 
    // 🔥 CREATE MODE
    else {
      const res = await fetch("http://localhost:5000/passwords", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        setpasswordsArray(prev => [...prev, data]);

        toast('🦄 Password saved successfully!', {
          position: "top-right",
          autoClose: 2000,
          theme: "dark",
          transition: Bounce,
        });
      }
    }

    // ✅ clear form (common)
    setForm({
      site: "",
      username: "",
      password: ""
    });

  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  }
};
const deletepassword = async (id) => {
  let c = confirm("Do you really want to delete this password");

  if (c) {
    try {
      const res = await fetch(`http://localhost:5000/passwords/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      });

      if (res.ok) {
        // ✅ Update UI instantly (no reload)
        setpasswordsArray(prev => prev.filter(item => item._id !== id));

        toast('🦄 Password deleted!', {
          position: "top-right",
          autoClose: 2000,
          theme: "dark",
          transition: Bounce,
        });
      }

    } catch (error) {
      console.log(error);
      alert("Error deleting password");
    }
  }
};
const editpassword = (item) => {
  setForm({
    site: item.site,
    username: item.username,
    password: item.password
  });

  setEditId(item._id); // store id for update
};
  return (<>
  <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
style={{ zIndex: 9999 }}
transition={Bounce}
/>
    
    <div className="min-h-screen w-full relative flex justify-center">

      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(125% 125% at 50% 90%, #fff 40%, #475569 100%)"
        }}
      />

      {/* Content */}
      <div className="w-full max-w-7xl p-3 sm:p-5 relative top-10 flex flex-col lg:flex-row gap-10 items-start">

        <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg w-full max-w-sm lg:w-96 shrink-0">

          <h2 className="text-2xl font-bold mb-4 text-center">
            Add Password
          </h2>

          {/* Website */}
          <input
            type="text"
            name="site"
            value={form.site}
            onChange={handleChange}
            placeholder="Website"
            className="w-full mb-3 p-2 border rounded"
          />

          {/* Username */}
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full mb-3 p-2 border rounded"
          />

          {/* Password */}
          <div className='relative'>
          <input 
            type={show?"text":"password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            
            className="w-full mb-4 p-2 border rounded "
           
          />
          <img ref={ref}  src={show?"icons/eye.png":"icons/eyecut.png"} alt="toggle" className='absolute right-2 top-2.5 w-5 cursor-pointer'
           onClick={showpassword}/>
        </div>
          {/* Button */}
          <button   onClick={savepassword}  className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
            Save Password
          </button>

        </div>
        <div className="passwords flex-1 w-full min-w-0" >
          <h2 className='font-bold text-2xl'>YOUR PASSWORDS</h2>
         

<div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
  {passwordsArray.length===0 && <div className='font-mono'>NO PASSWORDS TO SHOW </div>}
  {passwordsArray.length!=0  &&
    <table className="   w-full text-sm text-left rtl:text-right text-body ">
        <thead class="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
            <tr>
                <th scope="col" className=" border-b px-6 py-3 font-medium w-1/2">
                   URL
                </th>
                
                <th scope="col" className="  px-6 py-3 font-medium w-1/4">
                    Username
                </th>
                <th scope="col" className="px-6 py-3 font-medium w-1/4 ">
                    Passwords  
                </th>
                <th scope="col" className="px-6 py-3 font-medium w-1/4 ">
                    Actions 
                </th>
               
            </tr>
        </thead>
        <tbody>
          {passwordsArray.map((item,index)=>{
            
            return <tr className="   bg-neutral-primary border-b border-default " key={index}>
                {/* <td scope="row" className="  px-4 py-2 break-all  " >
                  <a    className='flex' href={item.site} target='_blank'>  {item.site}   <img className={`h-4.5 cursor-pointer ${clicked?"opacity-50":""}`} onClick={(e)=>{e.preventDefault();e.stopPropagation();CopyText(item.site);}}     src="icons/copy.png" alt="copy" /></a>
                  
                </td> */}
                <td className="px-6 py-4 border-b">
  <div className="flex items-center gap-2">
    <span>{item.site}</span>

    <svg
      onClick={() => CopyText(item.username)}
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 cursor-pointer text-gray-500 hover:text-blue-500 transition"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={5}
        d="M8 16h8M8 12h8m-6-8h6a2 2 0 012 2v12a2 2 0 01-2 2h-6l-4-4V6a2 2 0 012-2z" />
    </svg>
  </div>
</td>
                <td className="px-6 py-4  border-b ">
                  <div className="flex">
                    <span>{item.username}</span>  
                      <svg
      onClick={() => CopyText(item.username)}
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 cursor-pointer text-gray-500 hover:text-blue-500 transition"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={5}
        d="M8 16h8M8 12h8m-6-8h6a2 2 0 012 2v12a2 2 0 01-2 2h-6l-4-4V6a2 2 0 012-2z" />
    </svg>
                    </div>
                </td>
                <td className="  px-6 py-4 ">
                  <div className="flex ">
                    <span>{item.password}</span> 
                      <svg
      onClick={() => CopyText(item.password)}
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 cursor-pointer text-gray-500 hover:text-blue-500 transition"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={5}
        d="M8 16h8M8 12h8m-6-8h6a2 2 0 012 2v12a2 2 0 01-2 2h-6l-4-4V6a2 2 0 012-2z" />
    </svg>
                    </div>
                </td>
                <td className=" justify-center px-6 py-4 flex">
                  <div className="flex gap-2 justify-center ">
                  <span><img  className='w-5 h-5 cursor-pointer'  onClick={()=>{editpassword(item)}}   src="https://cdn-icons-png.flaticon.com/512/1159/1159633.png" alt="Edit" srcset="" /> </span>
                  
                  <span><img className='w-7 h-5 cursor-pointer'  onClick={()=>{deletepassword(item._id)}}     src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png" alt="Delete" /></span>
                  </div>
                </td>
            </tr>

  }  )}
           
        </tbody>
    </table>}
</div>

        </div>
      </div>
    </div>
  
  </>
  )
}


export default Manages;
import React, { useState,useRef,useEffect } from 'react'
import { ToastContainer, toast,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Manages = () => {
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
let passwords=localStorage.getItem("passwords")
  
  if(passwords){
    setpasswordsArray(JSON.parse(passwords))
  
  }
}, [])

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
const savepassword=()=>{
   if (!form.site || !form.username || !form.password) {
    alert("Fill all fields bro")
    return
  }
  setpasswordsArray([...passwordsArray,form])
  localStorage.setItem("passwords",JSON.stringify([...passwordsArray,form]))
  console.log([...passwordsArray,form])

  setForm({
    site: "",
    username: "",
    password: ""
  })
}
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
                <td scope="row" className="  px-4 py-2 break-all  " >
                  <a    className='flex' href={item.site} target='_blank'>  {item.site}   <img className={`h-4.5 cursor-pointer ${clicked?"opacity-50":""}`} onClick={(e)=>{e.preventDefault();e.stopPropagation();CopyText(item.site);}}     src="icons/copy.png" alt="copy" /></a>
                  
                </td>
                <td className="px-6 py-4  border-b ">
                  <div className="flex">
                    <span>{item.username}</span>  <img className='h-4.5 ' onClick={()=>CopyText(item.username)}         src="icons/copy.png" alt="copy" />
                    </div>
                </td>
                <td className="  px-6 py-4 ">
                  <div className="flex ">
                    <span>{item.password}</span>  <img className='h-4.5' onClick={()=>CopyText(item.password)}     src="icons/copy.png" alt="copy" />
                    </div>
                </td>
                <td className=" justify-center px-6 py-4 flex">
                  <div className="flex gap-2 ">
                  <span><img        src="https://cdn-icons-png.flaticon.com/512/1159/1159633.png" alt="Edit" srcset="" /> </span>
                  
                  <span><img src="https://i.pinimg.com/564x/81/e3/17/81e31793e4266d231831a9c2548e7e33.jpg" alt="" /></span>
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
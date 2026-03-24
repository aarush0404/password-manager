import React, { useState,useRef,useEffect } from 'react'

const Manages = () => {
const ref = useRef()
const [passwordsArray, setpasswordsArray] = useState([])
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
  
  setpasswordsArray([...passwordsArray,form])
  localStorage.setItem("passwords",JSON.stringify([...passwordsArray,form]))
  console.log([...passwordsArray,form])

}
  return (
    <div className="min-h-screen w-full relative">

      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(125% 125% at 50% 90%, #fff 40%, #475569 100%)"
        }}
      />

      {/* Content */}
      <div className="<div className= p-5 relative top-30 flex gap-10">

        <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg w-96">

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
        <div className="passwords w-250" >
          <h2 className='font-bold text-2xl'>YOUR PASSWORDS</h2>
         

<div class="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
  {passwordsArray.length===0 && <div className='font-mono'>NO PASSWORDS TO SHOW </div>}
  {passwordsArray.length!=0  &&
    <table className="w-full text-sm text-left rtl:text-right text-body ">
        <thead class="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
            <tr>
                <th scope="col" className="px-6 py-3 font-medium">
                   URL
                </th>
                
                <th scope="col" className="px-6 py-3 font-medium">
                    Username
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                    Passwords
                </th>
               
            </tr>
        </thead>
        <tbody>
          {passwordsArray.map((item,index)=>{
            
            return <tr class="bg-neutral-primary border-b border-default" key={index}>
                <td scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap" >
                  <a href={item.site} target='_blank'>  {item.site}</a>
                  
                </td>
                <td className="px-6 py-4">
                    {item.username}
                </td>
                <td className="px-6 py-4">
                    {item.password}
                </td>
               
            </tr>

  }  )}
           
        </tbody>
    </table>}
</div>

        </div>
      </div>
    </div>
  )
}

export default Manages;
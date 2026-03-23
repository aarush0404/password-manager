import React, { useState,useRef } from 'react'

const Manages = () => {
const ref = useRef()
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
      <div className="relative z-10 flex justify-center items-center pb-40 min-h-screen">

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
          <button className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
            Save Password
          </button>

        </div>

      </div>
    </div>
  )
}

export default Manages
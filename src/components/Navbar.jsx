import React from 'react'

const Navbar = () => {
  return (
   <nav className='bg-gray-100 flex justify-between h-15 items-center '>
    <div className="logo  font-bold text-4xl  m-4">PASS SAVER</div>
  <div className='flex gap-7 m-5'>
<a href="https://github.com/YOUR_USERNAME" target="_blank">
  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="30" fill="black" viewBox="0 0 24 24">
    <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.38 7.86 10.9.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.32-1.28-1.67-1.28-1.67-1.05-.72.08-.71.08-.71 1.16.08 1.78 1.2 1.78 1.2 1.03 1.76 2.7 1.25 3.36.95.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.27-5.23-5.66 0-1.25.45-2.27 1.19-3.07-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.06 11.06 0 0 1 5.8 0c2.21-1.5 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.82 1.19 3.07 0 4.4-2.69 5.36-5.25 5.64.41.35.78 1.05.78 2.12 0 1.53-.01 2.76-.01 3.14 0 .31.21.67.8.56A10.99 10.99 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z"/>
  </svg>
</a>
<a href="https://www.linkedin.com/in/your-profile" target="_blank">
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#0A66C2" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.025-3.037-1.851-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.369-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.068-.926-2.068-2.065 0-1.14.924-2.065 2.068-2.065 1.143 0 2.065.925 2.065 2.065 0 1.139-.922 2.065-2.065 2.065zm1.777 13.019H3.56V9h3.554v11.452z"/>
  </svg>
</a>
<a href="https://www.linkedin.com/in/your-profile" target="_blank">
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" class="h-6 w-6 text-neutral-800 transition-colors hover:text-neutral-600 dark:text-neutral-200 dark:hover:text-neutral-400"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
</a>
</div>

   </nav>
  )
}

export default Navbar

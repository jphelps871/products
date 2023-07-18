import { useState } from "react"

export default function DropDown() {
    const [open, setOpen] = useState(false)

    return (
        <div className="relative inline-block text-left">
            <div>
                <button onClick={() => setOpen(!open)} type="button" className={`inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-md text-white font-semibold ${open && 'opacity-60'}`} id="menu-button" aria-expanded="true" aria-haspopup="true">
                    Most Upvotes
                    <svg className={`-mr-1 mt-1 h-5 w-5 text-white ${open && 'rotate-180 opacity-60'}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            <div className={`${open ? 'absolute' : 'hidden'} left-3 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-xl focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                <div role="none">
                    <a href="#" className="text-gray-700 block px-4 py-3 text-md border-b hover:text-dark-purple flex items-center justify-between" role="menuitem" tabIndex="-1" id="menu-item-0">
                        Most Upvotes
                        <svg className="w-4 h-4" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path className="text-dark-purple" d="M0.968262 4.85894L4.49995 8.39062L11.9999 0.890625" stroke="#AD1FEA" strokeWidth="2"/>
                        </svg>
                    </a>
                    <a href="#" className="text-gray-700 block px-4 py-3 text-md border-b hover:text-dark-purple" role="menuitem" tabIndex="-1" id="menu-item-1">Least Upvotes</a>
                    <a href="#" className="text-gray-700 block px-4 py-3 text-md border-b hover:text-dark-purple" role="menuitem" tabIndex="-1" id="menu-item-2">Most Comments</a>
                    <form method="POST" action="#" role="none">
                        <button type="submit" className="text-gray-700 block w-full px-4 py-3 text-left text-md hover:text-dark-purple" role="menuitem" tabIndex="-1" id="menu-item-3">Least Comments</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
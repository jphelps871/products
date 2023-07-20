import { useState } from "react"

export default function DropDown({items, buttonStyles, dropdownPositionStyles, containerStyles, labelFor, handleClick, selected}) {
    const [open, setOpen] = useState(false)

    return (
        <div id={labelFor} className={`relative text-left ${containerStyles}`}>
            <div>
                <button onClick={() => setOpen(!open)} type="button" className={open ? `opacity-60 ${buttonStyles}` : buttonStyles} id="menu-button" aria-expanded={open} aria-haspopup="true">
                    {selected ? selected : items[0]}
                    <svg className={`mt-1 h-5 ml-auto w-5 text-inherit ${open && 'rotate-180 opacity-60'}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
            <div className={`${open ? 'absolute' : 'hidden'} ${dropdownPositionStyles} w-56 origin-top-right rounded-md bg-white shadow-xl focus:outline-none z-50`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                <div role="none">
                    {items.map(item => (
                        <a key={item} href="#" onClick={(e) => handleClick(e)} className="text-gray-700 px-4 py-3 text-md border-b hover:text-dark-purple flex items-center justify-between" role="menuitem" tabIndex="-1" id="menu-item-0">
                            {item}
                            {selected == item && (
                                <svg className="w-4 h-4" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path className="text-dark-purple" d="M0.968262 4.85894L4.49995 8.39062L11.9999 0.890625" stroke="#AD1FEA" strokeWidth="2"/>
                            </svg>
                            )}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}
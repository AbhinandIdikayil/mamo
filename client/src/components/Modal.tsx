import React from "react";

const Modal = ({ children, onClose }: { children: React.ReactNode, onClose: any }) => (
    <div className="w-[330px] h-[300px] bg-zinc-100 shadow-lg rounded-lg" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '20px', zIndex: 1000 }}>
        {children}
        <button className="bg-red-500 px-3 py-1 font-bold rounded-md text-white" onClick={onClose} style={{ marginTop: '10px' }}>Close</button>
    </div>
);

export default Modal

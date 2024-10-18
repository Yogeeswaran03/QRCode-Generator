import './App.css';
import { useState } from 'react';

function App() {
   const [img,setImg]=useState("");
   const [loading,setLoading]=useState(false);
   const [qrdata,setQrdata]=useState("");
   const [qrsize,setQrsize]=useState("");

async function GenerateQR(){
  setLoading(true);
  try{
      const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}x${qrsize}&data=${encodeURIComponent(qrdata)}`;
      setImg(url);
  }catch(error){
        console.error("Error generating QR code",error);
  }finally{
    setLoading(false);
  }
}

function downloadQr(){
   fetch(img).then((Response)=>Response.blob()).then((blob)=>{
    const link=document.createElement("a");
    link.href=URL.createObjectURL(blob);
    link.download="qrcode.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
   }).catch((error)=>{
    console.error("Error downloading QR code",error);
   });
}

  return (
    <div className='flex w-full h-lvh flex-col justify-center items-center bg-black'>
      <h1 className='text-3xl text-blue-400 font-bold p-3'>QRCode Generator</h1>
     {loading && <p className='text-black'>Please wait...</p>}
     {img &&  <img src={img} alt='' className='p-5'/>}
      <div className='flexx flex-col'>
        <label htmlFor='dataInput' className=' block mb-2 text-blue-300 text-lg font-medium' >
          Data for QRCode:
        </label>
        <input type='text' id='dataInput'value={qrdata} placeholder='Enter data for QRCode' onChange={(e)=>setQrdata(e.target.value)} className='p-3 mb-5 w-full bg-black text-white text-base border border-solid border-blue-400 border-spacing-1'/>
        <label htmlFor='dataInput' className='block mb-2 text-blue-300 text-lg font-medium'>
          Image size (e.g. 150):
        </label>
        <input type='text' id='sizeInput' placeholder='Enter Image Size' value={qrsize} onChange={(e)=>setQrsize(e.target.value)} className='p-3 mb-5 w-full bg-black text-white text-base border border-solid border-blue-400 border-spacing-1'/>
       <div className='flex justify-between gap-3 w-full'> 
        <button onClick={GenerateQR} disabled={loading} className='bg-blue-400 px-3 py-3 text-white text-lg rounded-md cursor-pointer transition-colors'>Generate QRCode</button>
        <button onClick={downloadQr} className='bg-green-400 px-3 py-3 text-white text-lg rounded-md cursor-pointer transition-colors'>Download QRCode</button>
        </div>
        <h3 className='text-white text-lg p-4 text-center'>Designed by <a href='https://yogeeswaran-m.vercel.app/'>Yogeeswaran M</a></h3>
 
      </div>
    </div>
  ); 
}

export default App;

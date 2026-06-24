const CreateButton = ({innerText, setModal}) => {
  return (
    <button onClick={()=>setModal(true)} className='cursor-pointer max-w-50 sm:h-9 h-8 text-center rounded-lg px-3 sm:px-5 py-1 text-sm sm:text-md sm:font-semibold bg-violet-600 text-white border-0'>{innerText}<i className="ri-add-line"></i></button>
  )
}

export default CreateButton

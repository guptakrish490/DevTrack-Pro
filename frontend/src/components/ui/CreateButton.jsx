const CreateButton = ({ innerText, onClick }) => {
  return (
    <button onClick={onClick} className='cursor-pointer max-w-50 sm:h-9 h-6 text-center rounded-lg px-2 sm:px-5 py-1 text-[10px] sm:text-sm sm:font-semibold bg-violet-600 text-white border-0'>{innerText}<i className="ri-add-line"></i></button>
  )
}

export default CreateButton

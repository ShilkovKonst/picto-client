const AccordionHeaderButton = ({ entity, isOpen, setIsOpen }) => {
  return (
    <button
      className={`h-10 cursor-pointer rounded-t-3xl mb-0 mt-3 mx-0 md:mx-3 lg:mx-5 xl:mx-10 border-none flex justify-center items-center ${
        isOpen != entity.name
          ? "bg-primary hover:bg-secondary text-white hover:text-black"
          : "bg-secondary text-black"
      } font-bold text-xs tracking-[1.25px] text-[#f9f9f9] outline-none capitalize transition ease-in-out duration-300`}
      onClick={() => setIsOpen(entity.name)}
    >
      {entity.name == "categories" ? "subcategories" : entity.name} (
      {entity.list?.length ?? 0})
    </button>
  );
};

export default AccordionHeaderButton;

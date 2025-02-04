const FormQuestionBlockItem = ({ item, state, setState }) => {
  return (
    <div
      onClick={() => setState(item)}
      className={`cursor-pointer w-full ${state?.id == item.id && "bg-primary text-white"} hover:bg-secondary transition duration-100 ease-in-out px-1 my-[2px]`}
    >
      <p>{item.title}</p>
    </div>
  );
};

export default FormQuestionBlockItem;

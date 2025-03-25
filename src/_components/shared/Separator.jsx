const Separator = ({ border }) => {
  return (
    <div
      className={` ${
        border ? border : "border-gray-300"
      }  border-t border-b my-[1px] py-[1px] w-full`}
    ></div>
  );
};

export default Separator;

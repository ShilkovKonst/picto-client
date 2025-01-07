const Separator = ({ n, lgHidden }) => {
  return (
    <td
      className={`border-gray-300 border-t border-b my-[1px] py-[1px] col-span-${n} ${
        lgHidden ? "lg:hidden" : ""
      } `}
    ></td>
  );
};

export default Separator;

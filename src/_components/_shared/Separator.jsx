const Separator = ({ n, lgHidden, isSimple }) => {
  return (
    <>
      {!isSimple ? (
        <td
          className={`border-gray-300 border-t border-b my-[1px] py-[1px] col-span-${n} ${
            lgHidden ? "lg:hidden" : ""
          } `}
        ></td>
      ) : (
        <div
          className={`border-gray-300 border-t border-b my-[1px] py-[1px] col-span-${n} ${
            lgHidden ? "lg:hidden" : ""
          } `}
        ></div>
      )}
    </>
  );
};

export default Separator;

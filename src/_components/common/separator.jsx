const Separator = ({ n, lgHidden }) => {
  return <td className={`border col-span-${n} ${lgHidden ? "lg:hidden" : ""} bg-primary-trans-bb`}></td>;
};

export default Separator;

import ButtonSpinner from "./ButtonSpinner";

const ConfirmButton = ({ isLoading, title }) => {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="text-white bg-primary hover:bg-secondary transition ease-in-out duration-300 font-medium rounded-lg text-sm w-full mt-5 px-5 py-2.5 text-center flex justify-center items-center"
    >
      {isLoading ? (
        <ButtonSpinner text={"Veuillez patienter"} />
      ) : title ? (
        title
      ) : (
        "Confirmer"
      )}
    </button>
  );
};

export default ConfirmButton;

const ConfirmButton = ({ isLoading }) => {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="text-white bg-primary hover:bg-secondary transition ease-in-out duration-300 font-medium rounded-lg text-sm w-full mt-5 px-5 py-2.5 text-center flex justify-center items-center"
    >
      {isLoading ? (
        <>
          <Spinner className="" size="md" aria-label="Veuillez patienter" />
          <span className="pl-3">Veuillez patienter</span>
        </>
      ) : (
        "Confirmer"
      )}
    </button>
  );
};

export default ConfirmButton;

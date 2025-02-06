const DialogueQuestionSelector = ({
  questions,
  questionModal,
  setQuestionModal,
  selectedQuestion,
  setSelectedQuestion,
  handleClick,
}) => {
  return (
    <>
      <div className="z-20 relative mb-3">
        <button
          onClick={() => setQuestionModal((prev) => !prev)}
          className="text-lg font-bold bg-pform w-full h-12 py-2 px-4 rounded-full shadow-inset-5/5 border border-solid border-t-[#ffffff59] border-l-[#ffffff59] border-r-[#dedfe059] border-b-[#dedfe059]"
        >
          <p>
            {selectedQuestion
              ? selectedQuestion.title
              : "Choisir une question..."}
          </p>
        </button>
        <div
          id="questionList"
          className={`absolute bg-pform bg-opacity-75 w-[calc(100%-3rem)] h-80 p-1 overflow-y-scroll top-[calc(100%)] left-[1.5rem] ${
            questionModal
              ? "z-20 flex flex-col justify-start items-center"
              : "hidden"
          } shadow-inset-5/5 rounded-b-xl border border-solid border-t-[#ffffff59] border-l-[#ffffff59] border-r-[#dedfe059] border-b-[#dedfe059]`}
        >
          {questions.map((question, i) => (
            <button
              key={i}
              className="text-lg hover:font-bold bg-pform my-1 w-full shadow-inset-5/5 rounded-full border border-solid border-t-[#ffffff59] border-l-[#ffffff59] border-r-[#dedfe059] border-b-[#dedfe059]"
              onClick={() => handleClick(question)}
            >
              {question.title}
            </button>
          ))}
        </div>
      </div>
      {questionModal && (
        <div
          onClick={() => setQuestionModal(false)}
          className={`absolute -top-[0.75rem] -left-[0.75rem] bg-slate-600 opacity-50 w-screen h-screen z-10 ${
            questionModal ? "block" : "hidden"
          }`}
        ></div>
      )}
    </>
  );
};

export default DialogueQuestionSelector;

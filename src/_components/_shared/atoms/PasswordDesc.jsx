import { CheckedIcon, UnheckedIcon } from "@/_components/icons";

const digitRegex = /^(?=.*\d).+$/;
const uppercaseRegex = /^(?=.*[A-Z]).+$/;
const lowercaseRegex = /^(?=.*[a-z]).+$/;
const symbolRegex = /^(?=.*[&$*#!?@]).+$/;

const PasswordDesc = ({ defaultValue }) => {
  return (
    <div className="hidden peer-focus:block absolute bottom-0 top-12 bg-white text-xs text-left">
      <div className="bg-white z-10 rounded-xl border border-primary cursor-default p-1">
        <p>Password pattern:</p>
        <ul className="list-disc list-inside">
          <div className="flex gap-2 justify-start items-center">
            {defaultValue.length >= 8 ? <CheckedIcon /> : <UnheckedIcon />}
            <p>length - at least 8 characters</p>
          </div>
          <div className="flex gap-2 justify-start items-center">
            {digitRegex.test(defaultValue) &&
            uppercaseRegex.test(defaultValue) &&
            lowercaseRegex.test(defaultValue) &&
            symbolRegex.test(defaultValue) ? (
              <CheckedIcon />
            ) : (
              <UnheckedIcon />
            )}
            <p>content - at least one:</p>
          </div>
          <ul className="list-disc list-inside pl-4">
            <div className="flex gap-2 justify-start items-center">
              {digitRegex.test(defaultValue) ? (
                <CheckedIcon />
              ) : (
                <UnheckedIcon />
              )}
              <p>digit</p>
            </div>
            <div className="flex gap-2 justify-start items-center">
              {uppercaseRegex.test(defaultValue) ? (
                <CheckedIcon />
              ) : (
                <UnheckedIcon />
              )}
              <p>uppercase letter</p>
            </div>
            <div className="flex gap-2 justify-start items-center">
              {lowercaseRegex.test(defaultValue) ? (
                <CheckedIcon />
              ) : (
                <UnheckedIcon />
              )}
              <p>lowercase letter</p>
            </div>
            <div className="flex gap-2 justify-start items-center">
              {symbolRegex.test(defaultValue) ? (
                <CheckedIcon />
              ) : (
                <UnheckedIcon />
              )}
              <p>
                special symbol from: <b>&$*#!?@</b>
              </p>
            </div>
          </ul>
        </ul>
      </div>
    </div>
  );
};

export default PasswordDesc;

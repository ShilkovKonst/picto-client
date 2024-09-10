import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import EntityItem from "./_entityItem";

const Accordion = ({ state, setState, entityName, entity }) => {
  return (
    <>
      <motion.button
        animate={{ backgroundColor: state ? "#e58463" : "#1e646f", color: state ? "black" : "white"}}
        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
        onClick={() => setState((prev) => !prev)}
        className=" inline-flex justify-center w-full rounded-full border border-gray-300 shadow-sm my-1 px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
      >
        <span className="capitalize mr-1">{entityName}</span>
        ({entity?.length} au totale)
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </motion.button>
      <AnimatePresence initial={false}>
        {state && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: {
                opacity: 1,
                height: "auto",
                maxHeight: "295px",
                overflowY: "scroll",
              },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <motion.div
              variants={{ collapsed: { scale: 0.95 }, open: { scale: 1 } }}
              transition={{ duration: 0.3 }}
              className="content-placeholder"
            >
              <table className={`table w-full`}>
                <tbody className="flex flex-col gap-1 ">
                  {entity?.length > 0 &&
                    entity
                      ?.sort((a, b) =>
                        a.title.localeCompare(b.title, undefined, {
                          sensitivity: "base",
                        })
                      )
                      .map((pict, i) => (
                        <EntityItem
                          key={i}
                          entity={pict}
                          entityName={entityName}
                          isSublist={true}
                        />
                      ))}
                </tbody>
              </table>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};

export default Accordion;

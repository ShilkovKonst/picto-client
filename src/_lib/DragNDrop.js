export const handleDragStart = (
  e,
  sourceItem,
  setDraggedItem,
  phrase,
  setPhrase
) => {
  e.type === "mousedown" && e.preventDefault();
  setDraggedItem(sourceItem);
  console.log("initial sourceItem", sourceItem);

  const clone = e.target.cloneNode(true);
  clone.style.position = "absolute";
  clone.style.zIndex = 1000;
  clone.style.pointerEvents = "none";
  clone.style.opacity = "75%";
  clone.style.borderRadius = "0.75rem";
  document.body.appendChild(clone);
  clone.hidden = true;

  const sourceDropzone = defineDropzone(e, clone, "mousedown", "touchstart");
  let sourceIndex = -1;
  if (sourceDropzone) {
    sourceIndex = parseInt(sourceDropzone.id.split("-")[1], 10);
  }

  let offsetX;
  let offsetY;
  if (e.type === "mousedown") {
    offsetX = e.clientX - e.target.getBoundingClientRect().left;
    offsetY = e.clientY - e.target.getBoundingClientRect().top;
  }
  if (e.type === "touchstart") {
    offsetX =
      e.changedTouches[0].clientX - e.target.getBoundingClientRect().left;
    offsetY =
      e.changedTouches[0].clientY - e.target.getBoundingClientRect().top;
  }

  const moveAt = (pageX, pageY) => {
    clone.style.left = pageX - offsetX + "px";
    clone.style.top = pageY - offsetY + "px";
  };

  if (e.type === "mousedown") {
    moveAt(e.clientX, e.clientY);
  }
  if (e.type === "touchstart") {
    moveAt(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
  }

  const handleDragging = (e) => {
    clone.hidden = false;
    clone.style.pointerEvents = "auto";
    clone.style.cursor = "grabbing";

    if (e.type === "mousemove") {
      moveAt(e.clientX, e.clientY);
    }
    if (e.type === "touchmove") {
      moveAt(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
    }
  };

  const handleDragEnd = (e) => {
    clone.hidden = true;
    const dropzone = defineDropzone(e, clone, "mouseup", "touchend");

    if (dropzone) {
      const index = parseInt(dropzone.id.split("-")[1], 10);
      if (index != sourceIndex)
        setPhrase((prev) => {
          const newWords = [...prev.words];
          if (sourceIndex != -1) {
            const item = newWords.find((item) => item?.place == index);
            if (item) {
              newWords[sourceIndex] = {
                ...newWords[sourceIndex],
                pictogram: item?.pictogram,
              };
              newWords[index] = {
                ...newWords[index],
                pictogram: sourceItem.pictogram,
              };
            }
          } else {
            newWords[index] = { place: index, pictogram: sourceItem };
          }
          index == newWords.length - 1 && newWords.push(null);
          return {
            ...prev,
            words: newWords,
            text: newWords
              .filter((w) => w != null)
              .map((w) => w?.pictogram?.title ?? "")
              .join(" ")
              .trim(),
          };
        });
    }

    if (e.type === "mouseup") {
      document.removeEventListener("mousemove", handleDragging);
      document.removeEventListener("mouseup", handleDragEnd);
    }
    if (e.type === "touchend") {
      document.removeEventListener("touchmove", handleDragging);
      document.removeEventListener("touchend", handleDragEnd);
    }
    clone.remove();
    setDraggedItem(null);
  };

  if (e.type === "mousedown") {
    document.addEventListener("mousemove", handleDragging);
    document.addEventListener("mouseup", handleDragEnd);
  }
  if (e.type === "touchstart") {
    document.addEventListener("touchmove", handleDragging);
    document.addEventListener("touchend", handleDragEnd);
  }
};

const defineDropzone = (e, clone, mouseType, touchType) => {
  let dropzone;
  if (e.type === mouseType) {
    dropzone = document
      .elementFromPoint(e.clientX, e.clientY)
      ?.closest(".dropzone");
  }
  if (e.type === touchType) {
    dropzone = document
      .elementFromPoint(
        e.changedTouches[0].clientX,
        e.changedTouches[0].clientY
      )
      ?.closest(".dropzone");
  }
  clone.hidden = false;
  return dropzone;
};

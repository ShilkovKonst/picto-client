export const handleDragStart = (e, item, setDraggedItem, setDropZones) => {
    e.type === "mousedown" && e.preventDefault();
    setDraggedItem(item);

    const clone = e.target.cloneNode(true);
    clone.style.position = "absolute";
    clone.style.zIndex = 1000;
    clone.style.pointerEvents = "none";
    clone.style.opacity = "75%";
    document.body.appendChild(clone);
    clone.hidden = true;

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
      let dropzone;
      if (e.type === "mouseup") {
        dropzone = document
          .elementFromPoint(e.clientX, e.clientY)
          ?.closest(".dropzone");
      }
      if (e.type === "touchend") {
        dropzone = document
          .elementFromPoint(
            e.changedTouches[0].clientX,
            e.changedTouches[0].clientY
          )
          ?.closest(".dropzone");
      }
      clone.hidden = false;

      if (dropzone) {
        const index = parseInt(dropzone.id.split("-")[1], 10);
        setDropZones((prev) => {
          const newDropZones = [...prev];
          newDropZones[index] = item;
          return newDropZones;
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
import { useEffect, useRef } from "react";

function useClickOutside(handler, bool) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }

      document.addEventListener("click", handleClick, bool);

      return () => document.removeEventListener("click", handleClick, bool);
    },
    [handler, bool]
  );

  return { ref };
}

export default useClickOutside;

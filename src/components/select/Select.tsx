"use client";

import { useEffect, useRef, useState } from "react";
import classes from "./Select.module.css";
import { UseFormSetValue } from "react-hook-form";

interface Props {
  onChange: UseFormSetValue<any>;
}

const Select = ({ onChange }: Props) => {
  const [selectedMouse, setSelectedMouse] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [active, setActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseOver = (item: string) => {
    setSelectedMouse(item);
  };

  const handleActive = () => {
    setActive(!active);
  };

  const handleSelect = (value: string) => {
    if (value === selected) {
      setSelected(null);
      onChange("type", null);
    } else {
      setSelected(value);
      onChange("type", value);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={classes["container-select"]}
      onClick={handleActive}
      ref={containerRef}
    >
      <span
        className={
          selected ? classes["value-select"] : classes["value-no-select"]
        }
      >
        {selected}
      </span>
      <div className={active ? classes.list : classes["list-disabled"]}>
        <span
          className={selectedMouse === "Estudiante" ? classes.selected : ""}
          onMouseOver={() => handleMouseOver("Estudiante")}
          onClick={() => handleSelect("Estudiante")}
        >
          Estudiante
        </span>
        <span
          className={selectedMouse === "Moderador" ? classes.selected : ""}
          onMouseOver={() => handleMouseOver("Moderador")}
          onClick={() => handleSelect("Moderador")}
        >
          Moderador
        </span>
      </div>
    </div>
  );
};

export default Select;

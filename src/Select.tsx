import { useEffect, useState } from 'react';
import styles from './Select.module.css';

type SelectOption = {
  label: string;
  // value: any;
  // value: unknown;
  value: string | number;
};

type SelectProps = {
  options: SelectOption[];
  value?: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
};

export default function Select({ value, onChange, options }: SelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isHilight, setIsHilight] = useState(0);

  function clearOptions() {
    onChange(undefined);
  }

  function selectOption(option: SelectOption) {
    if (option !== value) onChange(option);
  }

  function isOptionSelected(option: SelectOption) {
    return option === value;
  }

  useEffect(() => {
    if (isOpen) setIsHilight(0);
  }, [isOpen]);

  return (
    <div
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen((prev) => !prev)}
      tabIndex={0}
      className={styles.container}
    >
      <span className={styles.value}>{value?.label}</span>
      <button
        onClick={(e) => {
          e.stopPropagation();

          clearOptions();
        }}
        className={styles['clear-btn']}
      >
        &times;
      </button>
      <div className={styles.divider}></div>
      <div className={styles.caret}></div>
      <ul className={`${styles.options} ${isOpen ? styles.show : ''}`}>
        {options.map((option, index) => (
          <li
            onClick={(e) => {
              e.stopPropagation();
              selectOption(option);
              setIsOpen(false);
            }}
            key={option.value}
            onMouseEnter={() => setIsHilight(index)}
            className={`${styles.option} ${
              isOptionSelected(option) ? styles.selected : ''
            } ${index === isHilight ? styles.highlighted : ''}`}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

import { useState } from 'react';
import styles from './Select.module.css';

type SelectOption = {
  label: string;
  // value: any;
  value: unknown;
};

type SelectProps = {
  options: SelectOption[];
  value?: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
};

export default function Select({ value, onChange, options }: SelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function clearOptions() {
    onChange(undefined);
  }

  function selectOption(option: SelectOption) {
    onChange(option);
  }

  function isOptionSelected(option: SelectOption) {
    return option === value;
  }

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
        {options.map((option) => (
          <li
            onClick={(e) => {
              e.stopPropagation();
              selectOption(option);
              setIsOpen(false);
            }}
            className={`${styles.option} ${
              isOptionSelected(option) ? styles.selected : ''
            }`}
            key={option.label}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

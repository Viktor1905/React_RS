import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCountries } from '../../../../store/slice/countriesSlice';
import styles from './styles/style.module.css';
type AutocompleteCountryProps = {
  label: string;
  id: string;
  name: string;
  defaultValue: string;
  error?: string;
};

export function AutocompleteCountry({
  label,
  id,
  name,
  defaultValue,
  error,
}: AutocompleteCountryProps) {
  const countries = useSelector(selectCountries);
  const [filtered, setFiltered] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelect = (country: string) => {
    if (inputRef.current) {
      inputRef.current.value = country;
    }
    setShowDropdown(false);
    setFiltered([]);
  };
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.length > 0) {
      const matches = countries.filter((str) =>
        str.toLowerCase().includes(value.toLowerCase())
      );
      setFiltered(matches.slice(0, 10));
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
      setFiltered([]);
    }
  };
  return (
    <div style={{ position: 'relative' }}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        defaultValue={defaultValue}
        name={name}
        onChange={onChange}
        autoComplete="off"
        onFocus={() => {
          if (inputRef.current?.value) {
            const value = inputRef.current.value;
            const matches = countries.filter((str) =>
              str.toLowerCase().includes(value.toLowerCase())
            );
            setFiltered(matches.slice(0, 10));
            setShowDropdown(true);
          }
        }}
        onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
        ref={inputRef}
      />
      {showDropdown && filtered.length > 0 && (
        <ul className={styles.dropdown}>
          {filtered.map((country) => (
            <li
              key={country}
              onMouseDown={() => handleSelect(country)}
              className={styles.liElem}
            >
              {country}
            </li>
          ))}
        </ul>
      )}
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}

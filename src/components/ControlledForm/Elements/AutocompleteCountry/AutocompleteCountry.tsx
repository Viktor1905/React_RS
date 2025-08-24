import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCountries } from '../../../..//store/slice/countriesSlice';
import styles from './styles/style.module.css';
type AutocompleteCountryProps = {
  value: string;
  onChange: (value: string) => void;
  label: string;
  id: string;
  error?: string;
};

export function AutocompleteCountry({
  value,
  onChange,
  label,
  id,
  error,
}: AutocompleteCountryProps) {
  const countries = useSelector(selectCountries);
  const [filtered, setFiltered] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    onChange(input);
    if (input.length > 0) {
      const matches = countries.filter((c) =>
        c.toLowerCase().includes(input.toLowerCase())
      );
      setFiltered(matches.slice(0, 10));
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleSelect = (country: string) => {
    onChange(country);
    setShowDropdown(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        onChange={handleInputChange}
        autoComplete="off"
        value={value || ''}
        onFocus={() => value && setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
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

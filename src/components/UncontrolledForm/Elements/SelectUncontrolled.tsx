export function SelectUncontrolled() {
  const countries = ['Russia', 'USA', 'Belarus'];

  return (
    <>
      <label htmlFor="city-select">Choose your country: </label>
      <select name="city" id="city-select">
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
    </>
  );
}

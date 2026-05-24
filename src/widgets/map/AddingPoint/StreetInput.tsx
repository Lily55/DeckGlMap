export const StreetInput = () => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <p>
        Название улицы: <input />
      </p>
      <p>
        Название города: <input />
      </p>
      <p>
        Координата x: <input />
      </p>
      <p>
        Координата y: <input />
      </p>
      <input type="submit" value="Добавить улицу" />
    </form>
  );
};

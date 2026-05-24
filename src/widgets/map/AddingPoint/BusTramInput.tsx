export const BusTramInput = () => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <p>
        Название остановки: <input />
      </p>
      <p>
        Название района: <input />
      </p>
      <p>
        Округ: <input />
      </p>
      <p>
        Адрес: <input />
      </p>
      <p>
        Координата x: <input />
      </p>
      <p>
        Координата y: <input />
      </p>
      <input type="submit" value="Добавить остановку" />
    </form>
  );
};

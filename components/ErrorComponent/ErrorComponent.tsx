export const ErrorComponent = () => {
  const onReload = () => {
    window.location.reload();
  };

  return (
    <div>
      <div>
        <div>
          <h2>Something went wrong. Refresh the page, please.</h2>
          <button type="button" onClick={onReload}>
            Reload
          </button>
        </div>
      </div>
    </div>
  );
};

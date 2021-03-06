import React from "react";
import { removePositions } from "../../actions/positions";

const RemoveCryptoQuery = ({
  user,
  currency,
  currencyNames,
  setUser,
  removeSavetyQuery,
  triggerAlert,
  makeBlankForm,
  setCurrencyNames,
}) => {
  const handleClick = async () => {
    const positions = await removePositions(currency);
    if (positions instanceof Error) {
      triggerAlert(positions.response.data.errors.msg, "danger");
    } else {
      triggerAlert(
        `The ${currency} cryptocurrency has been successfully removed from your portfolio.`,
        "success"
      );
    }

    makeBlankForm();

    removeSavetyQuery();

    // update user state
    setUser({ ...user, positions: positions.data });

    // update currencyNames state in App.js
    const newArr = currencyNames.filter(
      (currencyName) => currencyName !== currency
    );

    setCurrencyNames(newArr);
  };

  return (
    <div id="security_query_container">
      <div id="security_query">
        <div id="security_query_text">
          {" "}
          This will remove the {currency} cryptocurrency from your portfolio.
          Are you sure you want to proceed?
        </div>{" "}
        <div id="security_query_buttons">
          <button type="button" className="btn btn-dark" onClick={handleClick}>
            Yes
          </button>{" "}
          <button
            type="button"
            className="btn btn-dark"
            onClick={() => removeSavetyQuery()}
          >
            No{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveCryptoQuery;

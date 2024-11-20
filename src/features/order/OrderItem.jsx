import React from "react";
import PropTypes from "prop-types";
import { formatCurrency } from "../../utils/helpers";
function OrderItem({ item ,ingredients
}) {
  // isLoadingIngredients, ingredients
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-3">
      <div className="flex items-center justify-between gap-4ntext-sm">
        <p>
          <span>{quantity}&times;</span> {name}
        </p>
        <p>{formatCurrency(totalPrice)}</p>
      </div>
      <p>{ingredients.join(', ')}</p>
    </li>
  );
}
OrderItem.propTypes = {
  item: PropTypes.shape({
    quantity: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    totalPrice: PropTypes.number.isRequired,
  }).isRequired,
  isLoadingIngredients: PropTypes.bool,
  ingredients: PropTypes.arrayOf(PropTypes.string),
};

// Define default props (optional)
OrderItem.defaultProps = {
  isLoadingIngredients: false,
  ingredients: [],
};
export default OrderItem;

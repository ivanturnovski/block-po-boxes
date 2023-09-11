// @ts-check

/**
 * @typedef {import("../generated/api").InputQuery} InputQuery
 * @typedef {import("../generated/api").FunctionResult} FunctionResult
 */

export default /**
 * @param {InputQuery} input
 * @returns {FunctionResult}
 */
(input) => {
  const errors = [];
  var address;

  input.cart.deliveryGroups.forEach((group) => {
    // console.log(group.deliveryAddress?.address1);

    address = group.deliveryAddress?.address1;

    const poBoxPattern =
      /\b[Pp]\s*\.?\s*(?:[Oo0]\s*\.?\s*(?:[Ss]\s*\.?\s*T\s*\.?)?\s*(?:[Bb]\s*\.?\s*[Oo0]\s*\.?\s*[Xx]|ffices?|oxes?)|O\s*Box(?:es)?)\b/;
    if (address) {
      if (poBoxPattern.test(address)) {
        console.log("PO Boxes are not allowed. Please update your address.");
        errors.push({
          localizedMessage:
            "PO Boxes are not allowed. Please update your address.",
          target: "cart",
        });
      }
    }
  });

  console.log(address);

  return {
    errors,
  };
};

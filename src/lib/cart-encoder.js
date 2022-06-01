// {
//   "recipient": "mohammad",
//   "shippingMethod": {
//     "id": 2,
//     "title": "توصيل",
//     "turnaround": "",
//     "price": "رسوم التوصيل حسب المنطقة"
//   },
//   "deliveryAddress": "205 N 9th St, Apt 4S",
//   "paymentMethod": {
//     "id": "online",
//     "title": "اولاين (عن طريق Link)"
//   }
// }

// [
//   {
//     "id": "gid://shopify/CartLine/c3d5549cd194af8f3a7d45d1654698ea?cart=99ed07e9ce8e2af35f40f3a3a8608a86",
//     "quantity": 2,
//     "attributes": [],
//     "merchandise": {
//       "id": "gid://shopify/ProductVariant/41421395361976",
//       "availableForSale": true,
//       "compareAtPriceV2": null,
//       "priceV2": {
//         "currencyCode": "KWD",
//         "amount": "1.5"
//       },
//       "requiresShipping": true,
//       "title": "علبه ريع كيلو",
//       "image": {
//         "id": "gid://shopify/ProductImage/36236127207608",
//         "url": "https://cdn.shopify.com/s/files/1/0620/5544/8760/products/zatar-2_6b934293-9914-4b30-b32c-3478a34d2330.jpg?v=1650629968",
//         "altText": null,
//         "width": 1600,
//         "height": 1600
//       },
//       "product": {
//         "handle": "palestinian-zatar-momtaz",
//         "title": "زعتر ممتاز فلسطيني"
//       },
//       "selectedOptions": [
//         {
//           "name": "Size",
//           "value": "علبه ريع كيلو"
//         }
//       ]
//     }
//   },
//   {
//     "id": "gid://shopify/CartLine/cbc4a57b894e99a81e3de4d4b9e7dc1d?cart=99ed07e9ce8e2af35f40f3a3a8608a86",
//     "quantity": 2,
//     "attributes": [],
//     "merchandise": {
//       "id": "gid://shopify/ProductVariant/41421425180856",
//       "availableForSale": true,
//       "compareAtPriceV2": null,
//       "priceV2": {
//         "currencyCode": "KWD",
//         "amount": "1.5"
//       },
//       "requiresShipping": true,
//       "title": "علبه ريع كيلو",
//       "image": {
//         "id": "gid://shopify/ProductImage/36236237373624",
//         "url": "https://cdn.shopify.com/s/files/1/0620/5544/8760/products/do2a-2.jpg?v=1650630475",
//         "altText": null,
//         "width": 1600,
//         "height": 1600
//       },
//       "product": {
//         "handle": "zatar-ahmar-palestinian-do2a",
//         "title": "دقه فلسطينيه زعتر احمر"
//       },
//       "selectedOptions": [
//         {
//           "name": "Size",
//           "value": "علبه ريع كيلو"
//         }
//       ]
//     }
//   }
// ]

export function encodeCart(
  orderDetails,
  lines,
  getLocalizedAmount,
  totalAmount,
) {
  let result = '*السلة*\n';
  result += 'ـــــــــــــــــــــــ\n\n';

  for (const line of lines) {
    const productName = line.merchandise.product.title;
    const price = line.merchandise.priceV2;
    const totalLinePrice = getLocalizedAmount(
      parseFloat(price.amount) * line.quantity,
    );
    const options = line.merchandise.selectedOptions
      .map((o) => o.value)
      .join(' | ');

    result += `*${productName}*\n`;
    result += options;
    result += `\nالكمية: ${line.quantity}\n`;
    result += totalLinePrice + '\n\n';
  }

  result += '\n*طريقة التوصيل*\n';
  result += 'ـــــــــــــــــــــــ\n';
  result += orderDetails.shippingMethod.title + '\n\n';

  if (orderDetails.shippingMethod.id === 2) {
    result += '\n*العنوان*\n';
    result += 'ـــــــــــــــــــــــ\n';
    result += orderDetails.deliveryAddress + '\n\n';
  }

  result += '\n*طريقة الدفع*\n';
  result += 'ـــــــــــــــــــــــ\n';
  result += orderDetails.paymentMethod + '\n\n';

  result += '\n*الاجمالي قبل رسوم التوصيل*\n';
  result += 'ـــــــــــــــــــــــ\n';
  result += getLocalizedAmount(totalAmount);

  result += '\n\n*الفاتورة باسم*\n';
  result += 'ـــــــــــــــــــــــ\n';
  result += orderDetails.recipient;

  return customEncodeUri(result);
}

function customEncodeUri(str) {
  let strArr = Array.from(str);
  const result = strArr
    .map((letter) => {
      if (/[* \n:]/.test(letter)) {
        return encodeURI(letter);
      }
      return letter;
    })
    .join('');

  return result;
}

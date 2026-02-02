interface OrderPlacedProps {
  username: string;
  orderId: string;
  total: number;
  deliveryDate: string;
  address: {
    name: string;
    line1: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
  };
  product: {
    title: string;
    image: string;
    qty: number;
    size?: string;
    color?: string;
  }[];
}

export const orderPlacedTemplate = ({
  username,
  orderId,
  total,
  deliveryDate,
  address,
  product,
}: OrderPlacedProps) => {
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Order Placed</title>
</head>

<body style="margin:0;background:#f5f7fa;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center" style="padding:20px 0">

<table width="600" style="background:#fff;border-radius:8px;overflow:hidden">

<!-- HEADER -->
<tr>
<td style="background:#2874f0;padding:14px">
<h2 style="color:#fff;margin:0">🛒 Order Placed</h2>
</td>
</tr>

<!-- BODY -->
<tr>
<td style="padding:20px">

<p style="font-size:14px;color:#333">
Hi <strong>${username}</strong>,
</p>

<p style="font-size:14px;color:#555">
Your order has been <strong style="color:#2e7d32">successfully placed</strong>.
</p>

<!-- ORDER INFO -->
<table width="100%" style="background:#f1f5f9;padding:12px;border-radius:6px;margin:16px 0">
<tr>
<td style="font-size:13px;color:#555">
<strong>Order ID:</strong> ${orderId}<br/>
<strong>Order Date:</strong> ${new Date().toDateString()}
</td>
</tr>
</table>

<!-- STATUS -->
<p style="font-size:13px;color:#777;text-align:center;margin:14px 0">
<strong style="color:#2e7d32">Placed</strong> → Packed → Shipped → Delivered
</p>

<!-- DELIVERY + PAYMENT -->
<table width="100%" style="border:1px solid #e5e7eb;border-radius:6px">
<tr>
<td style="padding:12px;font-size:13px;color:#555" width="50%">
<strong>Delivery by</strong><br/>
<span style="color:#2e7d32">${deliveryDate}</span><br/><br/>
<strong>Amount Paid</strong><br/>
₹${total}
</td>

<td style="padding:12px;font-size:13px;color:#555" width="50%">
<strong>Delivery Address</strong><br/>
${address.name}<br/>
${address.line1}<br/>
${address.city}, ${address.state} - ${address.pincode}<br/>
📞 ${address.phone}
</td>
</tr>
</table>



<!-- PRODUCT -->
<table width="100%" style="border-top:1px solid #eee;padding-top:16px">
${product
  .map(
    (p, i) => `
<tr>
  <td style="padding:10px; border-bottom:1px solid #eee;">
    <img src="${p.image}" width="60" style="border-radius:6px" />
  </td>
  <td style="padding:10px; border-bottom:1px solid #eee;">
    <strong>${p.title}</strong><br/>
    Size: ${p.size ?? "-"} | Color: ${p.color ?? "-"}<br/>
    Qty: ${p.qty}
  </td>
</tr>
`
  )
  .join("")}

</table>

<!-- CTA -->
<div style="text-align:center;margin:22px 0">
<a href="https://yourwebsite.com/orders"
style="background:#2874f0;color:#fff;text-decoration:none;
padding:12px 22px;border-radius:6px;font-size:14px">
Manage Your Order
</a>
</div>

<p style="font-size:13px;color:#777;margin-top:20px">
Thank you for shopping with <strong>Sam Store.</strong>
</p>

</td>
</tr>

<!-- FOOTER -->
<tr>
<td style="background:#f1f5f9;text-align:center;padding:12px">
<p style="font-size:12px;color:#888;margin:0">
Need help? Contact 24×7 Support
</p>
</td>
</tr>

</table>

</td>
</tr>
</table>
</body>
</html>
`;
};
